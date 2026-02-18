
import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema({
    heading: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageOne: {
        type: String,
        required: true
    },
    imageTwo: {
        type: String,
        required: true
    },
    buttonText: {
        type: String,
        required: true
    },
    buttonLink: {
        type: String,
        required: true
    }
}, { timestamps: true });

const About = mongoose.model('About', aboutSchema);
export default About;