import { Schema, model } from 'mongoose';

const roomSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
    },
    description: {
        type: String,
        minLength: 10,
    },
    capacity: {
        type: Number,
        required: true,
        min: 1,
    },
    priceHighSeason: {
        type: Number,
        required: true,
        min: 0,
    },
    priceLowSeason: {
        type: Number,
        required: true,
        min: 0,
    },
    priceMidSeason: {
        type: Number,
        required: true,
        min: 0,
    },
    priceCarnivalSeason: {
        type: Number,
        required: true,
        min: 0,
    },
    descuento: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    }
})

export default model('Room', roomSchema, 'rooms');