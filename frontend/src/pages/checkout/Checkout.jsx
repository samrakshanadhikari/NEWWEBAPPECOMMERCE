import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import Footer from '../../globals/components/footer/Footer';
import Navbar from '../../globals/components/navbar/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartItem } from '../../store/cartSlice';
import { useNavigate } from 'react-router-dom';
import { APIAuthenticated } from '../../http';
import { toast } from 'react-toastify';

// Initialize Stripe
const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
const stripePromise = stripePublishableKey ? loadStripe(stripePublishableKey) : null;

// Log for debugging (remove in production)
if (!stripePublishableKey) {
  console.warn('⚠️ Stripe publishable key is missing. Add VITE_STRIPE_PUBLISHABLE_KEY to .env file');
}

// Stripe Checkout Form Component
const StripeCheckoutForm = ({ 
  total, 
  shippingAddress, 
  phoneNumber, 
  products, 
  onSuccess 
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState('');
  const [orderId, setOrderId] = useState(''); // Store orderId from payment intent creation

  // Create payment intent when component mounts
  useEffect(() => {
    const createPaymentIntent = async () => {
      // Check if shipping info is provided
      if (!shippingAddress || !phoneNumber) {
        toast.info('Please fill in shipping address and phone number first');
        return;
      }

      try {
        const response = await APIAuthenticated.post('/api/stripe/create-payment-intent', {
          products,
          shippingAddress,
          phoneNumber,
          totalAmount: total,
          paymentMethod: 'stripe'
        });

        if (response.data.clientSecret) {
          setClientSecret(response.data.clientSecret);
          // Store orderId from the response (in case metadata doesn't work)
          if (response.data.orderId) {
            setOrderId(response.data.orderId);
            console.log('Order ID stored from response:', response.data.orderId);
          }
        } else {
          toast.error('Failed to get payment details. Please try again.');
        }
      } catch (error) {
        const errorMessage = error.response?.data?.message || error.response?.data?.error || 'Failed to initialize payment. Please try again.';
        toast.error(errorMessage);
        console.error('Payment intent error:', error);
      }
    };

    if (stripe && total > 0 && products && products.length > 0) {
      createPaymentIntent();
    }
  }, [stripe, total, products, shippingAddress, phoneNumber]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      return;
    }

    setIsProcessing(true);

    const cardElement = elements.getElement(CardElement);

    try {
      // Confirm payment with Stripe
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            phone: phoneNumber,
            address: {
              line1: shippingAddress
            }
          }
        }
      });

      if (error) {
        toast.error(error.message || 'Payment failed. Please try again.');
        setIsProcessing(false);
      } else if (paymentIntent.status === 'succeeded') {
        // Confirm payment on backend
        try {
          // Try to get orderId from multiple sources
          let orderIdToUse = paymentIntent.metadata?.orderId || orderId;
          
          console.log('Payment succeeded. Looking for orderId:', {
            fromMetadata: paymentIntent.metadata?.orderId,
            fromState: orderId,
            fullMetadata: paymentIntent.metadata,
            fullPaymentIntent: paymentIntent
          });
          
          if (!orderIdToUse) {
            console.error('Order ID not found in payment intent metadata or state:', {
              metadata: paymentIntent.metadata,
              storedOrderId: orderId,
              paymentIntentId: paymentIntent.id
            });
            toast.error('Payment succeeded but order ID is missing. Please contact support with payment ID: ' + paymentIntent.id);
            setIsProcessing(false);
            return;
          }

          const response = await APIAuthenticated.post('/api/stripe/confirm-payment', {
            paymentIntentId: paymentIntent.id,
            orderId: orderIdToUse
          });
          
          if (response.status === 200) {
            toast.success('Payment successful!');
            onSuccess();
          }
        } catch (error) {
          const errorMessage = error.response?.data?.errorMessage || error.response?.data?.message || error.message || 'Order update failed';
          console.error('Payment confirmation error:', error);
          console.error('Error response:', error.response?.data);
          
          // Payment succeeded but order update failed - show more details
          toast.error(`Payment succeeded but ${errorMessage}. Your payment was processed.`);
          // Still navigate to success since payment went through
          setTimeout(() => {
            onSuccess();
          }, 2000);
        }
      }
    } catch (error) {
      const errorMessage = error.message || error.response?.data?.errorMessage || error.response?.data?.message || 'An error occurred. Please try again.';
      toast.error(`Payment error: ${errorMessage}`);
      console.error('Payment error details:', {
        error: error,
        response: error.response?.data,
        message: error.message
      });
      setIsProcessing(false);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#9e2146',
      },
    },
  };

  // Show loading/instructions if clientSecret not ready
  if (!clientSecret) {
    return (
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-blue-800 text-sm font-medium mb-2">
          {!shippingAddress || !phoneNumber 
            ? '⚠️ Please fill in shipping address and phone number above to continue'
            : '⏳ Initializing payment...'}
        </p>
        {shippingAddress && phoneNumber && (
          <p className="text-blue-700 text-xs mt-1">
            Setting up secure payment form...
          </p>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="p-4 border border-gray-300 rounded-lg bg-white">
        <CardElement options={cardElementOptions} />
      </div>
      <button
        type="submit"
        disabled={!stripe || isProcessing || !clientSecret}
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
      >
        {isProcessing ? 'Processing...' : `Pay $${total.toFixed(2)}`}
      </button>
      <p className="text-xs text-gray-500 text-center">
        Secure payment powered by Stripe. Supports credit/debit cards, Apple Pay, and Google Pay.
      </p>
    </form>
  );
};

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [shippingAddress, setShippingAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCartItem());
  }, [dispatch]);

  const totalItem = cart?.data?.length || 0;
  const totalQuantity = cart?.data?.reduce((sum, item) => sum + item.quantity, 0);
  const subTotal = cart?.data?.reduce(
    (sum, item) => sum + item.quantity * (item.productId?.productPrice || 0),
    0
  );
  const discount = subTotal * 0.05;
  const total = subTotal - discount;

  const handlePlaceOrderCOD = async () => {
    if (!phoneNumber || !shippingAddress) {
      return toast.error('Please enter phone number and shipping address.');
    }

    const orderPayload = {
      products: cart?.data?.map((item) => ({
        productId: item.productId._id,
        quantity: item.quantity,
      })),
      shippingAddress,
      phoneNumber,
      totalAmount: total,
      paymentMethod: 'cod',
      orderStatus: 'pending',
    };

    try {
      const response = await APIAuthenticated.post('/api/order', orderPayload);
      if (response.status === 200) {
        toast.success('Order placed successfully!');
        navigate('/success');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to place order. Please try again.');
    }
  };

  const handlePaymentSuccess = () => {
    navigate('/success');
  };

  // Check if cart is empty
  if (!cart?.data || cart.data.length === 0) {
    return (
      <>
        <Navbar />
        <div className="pt-16 px-4 md:px-8 max-w-screen-xl mx-auto">
          <div className="min-h-screen text-gray-900 py-10 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-3xl font-extrabold mb-4">Your cart is empty</h1>
              <p className="text-gray-600 mb-6">Add some items to your cart before checking out.</p>
              <button
                onClick={() => navigate('/fetchProduct')}
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="pt-16 px-4 md:px-8 max-w-screen-xl mx-auto">
        <div className="min-h-screen text-gray-900 py-10">
          <h1 className="text-3xl font-extrabold text-center mb-10 tracking-wide">Checkout</h1>

          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 px-6">
            {/* Order Summary */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-xl font-semibold text-gray-800">Order Summary</h2>
              <p className="text-gray-500">Review your order before placing it.</p>

              <div className="mt-5 space-y-4">
                {cart?.data?.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center bg-gray-50 border border-gray-200 p-4 rounded-lg"
                  >
                    <img
                      src={`${import.meta.env.VITE_API_URL || 'http://localhost:3000/'}${item?.productId?.productImageUrl}`}
                      alt={item?.productId?.productName}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="ml-4 flex-1">
                      <h3 className="text-lg font-bold">{item?.productId?.productName}</h3>
                      <p className="text-sm text-gray-500">{item?.productId?.productDescription}</p>
                      <p className="text-sm text-gray-500">{item?.productId?.category}</p>
                      <p className="mt-2 text-sm">
                        Quantity: <span className="font-semibold">{item?.quantity}</span>
                      </p>
                      <p className="text-md font-semibold text-gray-700">
                        ${item?.productId?.productPrice}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment and Shipping */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-xl font-semibold text-gray-800">Payment & Shipping</h2>

              {/* Payment Method Selection */}
              <p className="mt-4 text-lg font-medium">Payment Method</p>
              <div className="mt-3 space-y-3">
                {/* COD Option */}
                <label
                  className={`flex items-center space-x-2 bg-gray-100 border p-4 rounded-lg cursor-pointer ${
                    paymentMethod === 'COD' ? 'border-blue-500' : 'border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'COD'}
                    onChange={() => setPaymentMethod('COD')}
                    className="hidden"
                  />
                  <span className="w-5 h-5 border-2 border-gray-500 rounded-full flex items-center justify-center">
                    {paymentMethod === 'COD' && (
                      <span className="w-3 h-3 bg-gray-800 rounded-full"></span>
                    )}
                  </span>
                  <p className="font-medium">Cash on Delivery</p>
                </label>

                {/* Stripe Payment Option */}
                <label
                  className={`flex items-center space-x-2 bg-gray-100 border p-4 rounded-lg cursor-pointer ${
                    paymentMethod === 'STRIPE' ? 'border-blue-500' : 'border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'STRIPE'}
                    onChange={() => setPaymentMethod('STRIPE')}
                    className="hidden"
                  />
                  <span className="w-5 h-5 border-2 border-gray-500 rounded-full flex items-center justify-center">
                    {paymentMethod === 'STRIPE' && (
                      <span className="w-3 h-3 bg-gray-800 rounded-full"></span>
                    )}
                  </span>
                  <div className="flex-1">
                    <p className="font-medium">Credit/Debit Card</p>
                    <p className="text-xs text-gray-500">Visa, Mastercard, Amex, Apple Pay, Google Pay</p>
                  </div>
                </label>
              </div>

              {/* Shipping Info */}
              <div className="mt-6">
                <label className="block font-medium text-gray-700">Phone Number</label>
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Enter phone number"
                  className="w-full mt-2 p-3 border border-gray-300 rounded-lg shadow-sm"
                />

                <label className="block font-medium text-gray-700 mt-4">Shipping Address</label>
                <textarea
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  placeholder="Enter delivery address"
                  className="w-full mt-2 p-3 border border-gray-300 rounded-lg shadow-sm"
                  rows="3"
                />
              </div>

              {/* Price Summary */}
              <div className="mt-6 border-t pt-4">
                <div className="flex justify-between">
                  <p className="text-gray-700">Total Items</p>
                  <p className="text-gray-700">{totalItem}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-700">Total Quantity</p>
                  <p className="text-gray-700">{totalQuantity}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-700">Subtotal</p>
                  <p className="text-gray-700">${subTotal.toFixed(2)}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-700">Discount</p>
                  <p className="text-gray-700">${discount.toFixed(2)} (5%)</p>
                </div>
                <div className="flex justify-between font-semibold">
                  <p className="text-lg">Total</p>
                  <p className="text-lg">${total.toFixed(2)}</p>
                </div>
              </div>

              {/* Payment Form or COD Button */}
              <div className="mt-6">
                {paymentMethod === 'COD' ? (
                  <button
                    onClick={handlePlaceOrderCOD}
                    className="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
                  >
                    Place Order
                  </button>
                ) : (
                  <Elements stripe={stripePromise}>
                    <StripeCheckoutForm
                      total={total}
                      shippingAddress={shippingAddress}
                      phoneNumber={phoneNumber}
                      products={cart?.data?.map((item) => ({
                        productId: item.productId._id,
                        quantity: item.quantity,
                      }))}
                      onSuccess={handlePaymentSuccess}
                    />
                  </Elements>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
