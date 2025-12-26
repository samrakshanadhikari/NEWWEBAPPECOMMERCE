import { Router } from "express";
import { createPaymentIntent, confirmPayment, stripeWebhook } from "../controllers/stripeController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";
import errorHandle from "../services/errorHandler.js";
import express from "express";

const router = Router();

// Webhook route must be before express.json() middleware
// This route doesn't use JSON parsing because Stripe sends raw body
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  stripeWebhook
);

// Create payment intent (requires authentication)
router.post(
  "/create-payment-intent",
  isAuthenticated,
  errorHandle(createPaymentIntent)
);

// Confirm payment (requires authentication)
router.post(
  "/confirm-payment",
  isAuthenticated,
  errorHandle(confirmPayment)
);

export default router;

