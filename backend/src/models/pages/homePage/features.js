import mongoose from 'mongoose';

const propertyOverviewSchema = new mongoose.Schema({
    bedrooms: { type: Number, required: true, min: 0 },
    livingRoom: { type: Number, default: 0, min: 0 },
    familyRoom: { type: Number, default: 0, min: 0 },
    nook: { type: Number, default: 0, min: 0 },
    flex: { type: Number, default: 0, min: 0 },
    bonusArea: { type: Number, default: 0, min: 0 },
    balcony: { type: Number, default: 0, min: 0 },

    // Flexible
    bathrooms: { type: mongoose.Schema.Types.Mixed },
    area: { type: mongoose.Schema.Types.Mixed },
    type: { type: String, trim: true },
    basement: { type: mongoose.Schema.Types.Mixed },
    parking: { type: mongoose.Schema.Types.Mixed }
}, { _id: false });

const propertyCardSchema = new mongoose.Schema({
    image: { type: String, required: true },
    title: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    propertyOverview: { type: propertyOverviewSchema, required: true }
}, { _id: true });

const featuresSchema = new mongoose.Schema({
    heading: { type: String, required: true, trim: true },
    propertyCards: {
        type: [propertyCardSchema],
        validate: v => v.length > 0
    }
}, { timestamps: true });

export default mongoose.model('Features', featuresSchema);
