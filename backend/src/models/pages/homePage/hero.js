import mongoose from "mongoose";

const heroSchema = new mongoose.Schema({
    heading: {
        type: String,
        required: [true, "Heading is required"],
        trim: true
    },
    subheading: {
        type: String,
        required: [true, "Subheading is required"],
        trim: true
    },
    buttonText: {
        type: String,
        required: [true, "Button text is required"],
        trim: true
    },
    buttonLink: {
        type: String,
        required: [true, "Button link is required"],
        trim: true
    },
    videoUrl: {
        type: String,
        required: [true, "Video URL is required"],
        trim: true
    }
}, {
    timestamps: true
});

const Hero = mongoose.model("Hero", heroSchema);

export default Hero;
