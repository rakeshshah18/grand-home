import mongoose from 'mongoose';

const projectCardSchema = new mongoose.Schema({
    image: {
        type: [String],
        required: [true, 'Project image is required'],
        validate: {
            validator: function (v) {
                return v && v.length > 0;
            },
            message: 'At least one project image is required'
        },
        default: []
    },
    thumbnail: {
        type: String,
        trim: true,
        default: ''
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
    cards: {
        type: [projectCardSchema],
        default: []
    }
}, { timestamps: true });

export default mongoose.model('OurProject', ourProjectSchema);
