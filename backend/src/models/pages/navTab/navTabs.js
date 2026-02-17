import mongoose from "mongoose";

// Schema for child items (nested subdocuments)
const navItemSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Item name is required"],
            trim: true,
            maxlength: [100, "Item name cannot exceed 100 characters"]
        },
        url: {
            type: String,
            trim: true,
            default: null
        },
        order: {
            type: Number,
            default: 0
        },
        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        _id: true,
        timestamps: false
    }
);

// Add self-referencing children after schema is defined
navItemSchema.add({
    children: [navItemSchema]
});

// Main navigation tab schema
const navTabSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Tab name is required"],
            trim: true,
            maxlength: [100, "Tab name cannot exceed 100 characters"]
        },
        url: {
            type: String,
            trim: true,
            default: null
        },
        order: {
            type: Number,
            default: 0
        },
        isActive: {
            type: Boolean,
            default: true
        },
        pageRef: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Page",
            default: null
        },
        // Array of child items (embedded documents)
        children: [navItemSchema]
    },
    {
        timestamps: true
    }
);

// Index for faster queries
navTabSchema.index({ order: 1 });

const NavTabPage = mongoose.model("NavTabPage", navTabSchema);

export default NavTabPage;
