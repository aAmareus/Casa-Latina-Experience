import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
    },
    lastname : {
        type: String,
        required: true,
        minlength: 2,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        minlength: 10,
    },
    rol: {
        type: String,
        required: true,
        default: 'user'
    },
    active: {
        type: Boolean,
        default: true
    },
    created: {
        type: Date,
        required: true,
        default: Date.now
    }
});
export default model('User', userSchema, 'users');