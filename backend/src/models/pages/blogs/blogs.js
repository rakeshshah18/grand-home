import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
    image: {
        type: String,
        required: [true, 'Blog image URL is required'],
        trim: true
    },
    title: {
        type: String,
        required: [true, 'Blog title is required'],
        trim: true
    },
    shortDescription: {
        type: String,
        required: [true, 'Short description is required'],
        trim: true
    },
    fullContent: {
        type: String,
        required: [true, 'Full content is required'],
        trim: true
    },
    slug: {
        type: String,
        required: [true, 'Slug is required'],
        unique: true,
        lowercase: true,
        trim: true
    }
}, { timestamps: true });

// Auto-generate slug from title if not provided or before saving
// Auto-generate slug from title if not provided or before saving
blogSchema.pre('validate', function () {
    if (this.title && !this.slug) {
        this.slug = this.title
            .toLowerCase()
            .replace(/[^\w ]+/g, '')
            .replace(/ +/g, '-');
    }
});

export default mongoose.model('Blog', blogSchema);
