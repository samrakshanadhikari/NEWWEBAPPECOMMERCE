import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
    paymentMethod: { type: String, enum: ['cod', 'stripe', 'card', 'apple_pay', 'google_pay', 'ach'], default: 'cod' },
    totalAmount :{type:Number, required:true},
    paymentStatus : {type :String, enum: ['pending', 'completed', 'failed', 'refunded'], default: 'pending'},
    stripePaymentIntentId: {type: String, default: null},
    stripeChargeId: {type: String, default: null}
},{timestamps:true})

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment

