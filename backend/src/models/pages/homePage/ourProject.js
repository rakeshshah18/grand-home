import mongoose from 'mongoose';

const projectCardSchema = new mongoose.Schema({
    image: {
        type: String,
        required: [true, 'Project image is required'],
        trim: true
    },
    status: {
        type: String,
        enum: ['completed sold', 'under construction', 'ready to move'],
        trim: true
    },
    type: {
        type: String,
        enum: [
            'single family',
            'multi family',
            'duplex homes',
            'custom homes',
            'renovation'
        ],
        trim: true
    },
    location: {
        type: String,
        enum: [
            'skyview',
            'thorncliffe',
            'braeside',
            'killarney',
            'bowness',
            'waterford estate',
            'highland park'
        ],
        trim: true
    },
    community: {
        type: String,
        enum: ['calgary', 'chestermere'],
        trim: true
    }
}, { _id: true });

const ourProjectSchema = new mongoose.Schema({
    heading: {
        type: String,
        required: [true, 'Heading is required'],
        trim: true
    },
    cards: {
        type: [projectCardSchema],
        validate: {
            validator: v => v.length > 0,
            message: 'At least one project card is required'
        }
    }
}, { timestamps: true });

export default mongoose.model('OurProject', ourProjectSchema);
