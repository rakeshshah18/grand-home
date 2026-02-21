import mongoose from "mongoose";

const footerElementSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      trim: true,
    },
    route: {
      type: String,
      trim: true,
    },
    icon: {
      type: String, // store icon name or image URL
      trim: true,
    },
  },
  { _id: false }
);

const footerColumnSchema = new mongoose.Schema(
  {
    logo: {
      type: String, // logo URL
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    title: {
      type: String,
      trim: true,
    },
    elements: [footerElementSchema], // array of elements (optional)
  },
  { _id: false }
);

const footerSchema = new mongoose.Schema(
  {
    columns: {
      type: [footerColumnSchema],
      default: [],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Footer = mongoose.model("Footer", footerSchema);
export default Footer;