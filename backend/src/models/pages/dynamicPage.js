import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ["heading", "paragraph", "image", "gallery", "list", "divider"],
        required: [true, "Section type is required"]
    },
    data: {
        text: { type: String },           // For heading and paragraph
        level: { type: Number, default: 1 }, // For heading (h1, h2, etc.)
        url: { type: String },            // For single image
        items: [{ type: String }],        // For list points
        images: [{                        // For gallery
            url: { type: String },
            caption: { type: String }
        }]
    },
    order: {
        type: Number,
        default: 0
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { _id: true });

const dynamicPageSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Page title is required"],
        trim: true
    },
    path: {
        type: String,
        required: [true, "Page path (full URL) is required"],
        unique: true,
        index: true,
        trim: true
    },
    sections: [sectionSchema],
    navTabId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "NavTabPage",
        default: null
    }
}, {
    timestamps: true
});

const DynamicPage = mongoose.model("DynamicPage", dynamicPageSchema);

export default DynamicPage;
