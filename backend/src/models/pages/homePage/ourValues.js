import mongoose from 'mongoose';

const ourValuesSchema = new mongoose.Schema({
    cards: [
        {
            title: { type: String, required: true, trim: true },
            description: { type: String, required: true, trim: true },
            icon: { type: String, required: true }
        }
    ],
}, { timestamps: true });

export default mongoose.model('OurValues', ourValuesSchema);