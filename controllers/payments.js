import { Schema, model } from 'mongoose';

const paymentSchema = new Schema({
    reservation_id: {
        type: Schema.Types.ObjectId,
        ref: 'Reserva',
        required: true
    },
    provider: {
        type: String,
        enum: ['paypal', 'stripe', 'mercadopago'],
        required: true
    },
    external_payment_id: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true,
        min: 0
    },
    currency: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending'
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now
    }
})

export default model('Payment', paymentSchema, 'payments');