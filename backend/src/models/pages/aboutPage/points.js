import mongoose from "mongoose";

const pointsCallSchema = new mongoose.Schema({
    features: [{
        text: { type: String, required: false },
        icon: { type: String, required: false }
    }],
    callIcon: {
        type: String,
        required: false
    },
    callNumber: {
        type: String,
        required: false
    }
}, { timestamps: true });

const PointsCall = mongoose.model('PointsCall', pointsCallSchema);
export default PointsCall;
