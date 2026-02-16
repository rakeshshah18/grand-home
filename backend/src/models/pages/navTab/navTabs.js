import mongoose from "mongoose";

const navTabSchema = new mongoose.Schema(
    {
        tab: {
            name: {
                type: String,
                required: [true, "Tab name is required"],
                trim: true,
                unique: true,
                maxlength: [100, "Tab name cannot exceed 100 characters"]
            },
            type: mongoose.Schema.Types.ObjectId,
            ref: "Page",
            required: [true, "Tab is required"],
        }
    },
    {
        timestamps: true
    }
);

const NavTabPage = mongoose.model("NavTabPage", navTabSchema);

export default NavTabPage;
