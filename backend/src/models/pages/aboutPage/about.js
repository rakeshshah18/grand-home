// models/aboutModel.js
import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema({
    heading: {
        type: [String],
        default: []
    },
    description: {
        type: [String],
        default: []
    },
    image: {
        type: [String],
        default: []
    }
}, { timestamps: true });

const About = mongoose.model('AboutPage', aboutSchema);
export default About;