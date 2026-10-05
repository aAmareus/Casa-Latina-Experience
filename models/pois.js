import mongoose from "mongoose"

const poiSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        enum: [
            "beach",
            "lakes",
            "rives",
            "restaurant",
            "pharmacy",
            "hospital",
            "tourism",
            "shopping",
            "other"
        ]
    },
    description: {
        type: String,
        trim: true
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    image: {
        type: String
    },
    active: {
        type: Boolean,
        default: true
    }
    },
    {
        timestamps: true
    }
)

const Poi = mongoose.model("PointsOfInterest", poiSchema)
export default Poi