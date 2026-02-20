import mongoose from "mongoose";

const getInTouchSchema = new mongoose.Schema({
    heading: {
        type: String,
    },
    sections: [{
        title: {
            type: String,
        },
        description: {
            type: String,
        },
        icon: {
            type: String,
        }
    }]
});

const GetInTouch = mongoose.model("GetInTouch", getInTouchSchema);

export default GetInTouch;