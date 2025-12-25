import Stripe from 'stripe';
import Order from '../models/orderModel.js';
import Payment from '../models/paymentModel.js';
import Cart from '../models/cartModel.js';

// Initialize Stripe lazily (only when needed, after dotenv has loaded)
let stripeInstance = null;

const getStripe = () => {
  if (!stripeInstance && process.env.STRIPE_SECRET_KEY) {
    stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);
  }
  return stripeInstance;
};

/**
 * Create a Stripe Payment Intent
 * This is called when user wants to pay with Stripe
 */
export const createPaymentIntent = async (req, res) => {
  try {
    // Get Stripe instance (lazy initialization)
    const stripe = getStripe();
    
    // Check if Stripe is configured
    if (!stripe) {
      return res.status(500).json({
        error: "Stripe is not configured. Please add STRIPE_SECRET_KEY to environment variables."
      });
    }

    const userId = req.user.id;
    const {
      products,
      shippingAddress,
      phoneNumber,
      totalAmount,
      paymentMethod
    } = req.body;

    // Validate required fields
    if (!products || products.length === 0 || !totalAmount) {
      return res.status(400).json({ 
        message: "Products and total amount are required" 
      });
    }

    // Create order first (with pending status)
    const orderData = await Order.create({
      userId,
      products,
      phoneNumber: phoneNumber || '',
      totalAmount,
      paymentMethod: paymentMethod || 'stripe',
      shippingAddress: shippingAddress || '',
      orderStatus: 'pending'
    });

    // Create payment record
    const paymentData = await Payment.create({
      userId,
      paymentMethod: paymentMethod || 'stripe',
      totalAmount,
      orderId: orderData._id,
      paymentStatus: 'pending'
    });

    // Create Stripe Payment Intent
    // Amount must be in cents (multiply by 100)
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(totalAmount * 100), // Convert to cents
      currency: 'usd',
      metadata: {
        orderId: orderData._id.toString(),
        userId: userId.toString(),
        paymentId: paymentData._id.toString()
      },
      automatic_payment_methods: {
        enabled: true, // Enables Apple Pay, Google Pay, etc.
      },
    });

    // Save Stripe Payment Intent ID
    paymentData.stripePaymentIntentId = paymentIntent.id;
    await paymentData.save();

    // Return client secret for frontend
    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      orderId: orderData._id.toString(),
      paymentIntentId: paymentIntent.id,
      metadata: paymentIntent.metadata // Also return metadata for debugging
    });

  } catch (error) {
    console.error("Stripe Payment Intent creation error:", error);
    console.error("Error details:", {
      message: error.message,
      type: error.type,
      code: error.code,
      statusCode: error.statusCode
    });
    res.status(500).json({
      error: "Internal server error",
      errorMessage: error.message || "Failed to create payment intent",
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

/**
 * Confirm payment and update order
 * Called after successful payment on frontend
 */
export const confirmPayment = async (req, res) => {
  try {
    // Get Stripe instance (lazy initialization)
    const stripe = getStripe();
    
    // Check if Stripe is configured
    if (!stripe) {
      return res.status(500).json({
        error: "Stripe is not configured. Please add STRIPE_SECRET_KEY to environment variables."
      });
    }

    const { paymentIntentId, orderId } = req.body;

    if (!paymentIntentId || !orderId) {
      return res.status(400).json({ 
        message: "Payment Intent ID and Order ID are required" 
      });
    }

    // Retrieve payment intent from Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    // Find order and payment records
    const order = await Order.findById(orderId);
    const payment = await Payment.findOne({ orderId });

    if (!order || !payment) {
      return res.status(404).json({ message: "Order or payment not found" });
    }

    // Check payment status
    if (paymentIntent.status === 'succeeded') {
      // Update payment status
      payment.paymentStatus = 'completed';
      payment.stripeChargeId = paymentIntent.latest_charge;
      await payment.save();

      // Clear cart
      const orderedProductIds = order.products.map(p => p.productId);
      await Cart.deleteMany({
        userId: order.userId,
        productId: { $in: orderedProductIds }
      });

      // Update order status
      order.orderStatus = 'pending'; // Will be processed
      await order.save();

      res.status(200).json({
        message: "Payment confirmed successfully",
        order: order,
        payment: payment
      });
    } else {
      // Payment failed
      payment.paymentStatus = 'failed';
      await payment.save();

      res.status(400).json({
        message: "Payment was not successful",
        status: paymentIntent.status
      });
    }

  } catch (error) {
    console.error("Payment confirmation error:", error);
    console.error("Error details:", {
      message: error.message,
      stack: error.stack,
      paymentIntentId: req.body.paymentIntentId,
      orderId: req.body.orderId
    });
    res.status(500).json({
      error: "Internal server error",
      errorMessage: error.message || "Failed to confirm payment",
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

/**
 * Webhook handler for Stripe events
 * This handles payment confirmations from Stripe
 * Set this up in production for better reliability
 */
export const stripeWebhook = async (req, res) => {
  // Get Stripe instance (lazy initialization)
  const stripe = getStripe();
  
  if (!stripe) {
    return res.status(500).send("Stripe is not configured");
  }

  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      // Update order and payment status
      const orderId = paymentIntent.metadata.orderId;
      if (orderId) {
        await Order.findByIdAndUpdate(orderId, { orderStatus: 'pending' });
        await Payment.findOneAndUpdate(
          { orderId },
          { 
            paymentStatus: 'completed',
            stripeChargeId: paymentIntent.latest_charge
          }
        );
      }
      break;
    case 'payment_intent.payment_failed':
      const failedPayment = event.data.object;
      const failedOrderId = failedPayment.metadata.orderId;
      if (failedOrderId) {
        await Payment.findOneAndUpdate(
          { orderId: failedOrderId },
          { paymentStatus: 'failed' }
        );
      }
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
};

