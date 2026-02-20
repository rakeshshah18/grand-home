import Blog from "../../../models/pages/blogs/blogs.js";

/* ----------------------------- CREATE ----------------------------- */
const createBlog = async (req, res) => {
    try {
        const { image, title, shortDescription, fullContent, slug } = req.body;

        const blog = await Blog.create({
            image,
            title,
            shortDescription,
            fullContent,
            slug
        });

        res.status(201).json({
            success: true,
            message: "Blog created successfully",
            data: blog
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "Slug must be unique"
            });
        }
        res.status(500).json({
            success: false,
            message: "Error creating blog",
            error: error.message
        });
    }
};

/* ----------------------------- GET ALL ----------------------------- */
const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: blogs.length,
            data: blogs
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching blogs",
            error: error.message
        });
    }
};

/* ----------------------------- GET BY SLUG ----------------------------- */
const getBlogBySlug = async (req, res) => {
    try {
        const { slug } = req.params;
        const blog = await Blog.findOne({ slug });

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found"
            });
        }

        res.status(200).json({
            success: true,
            data: blog
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching blog",
            error: error.message
        });
    }
};

/* ----------------------------- UPDATE ----------------------------- */
const updateBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const blog = await Blog.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true
        });

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Blog updated successfully",
            data: blog
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating blog",
            error: error.message
        });
    }
};

/* ----------------------------- DELETE ----------------------------- */
const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findByIdAndDelete(id);

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Blog deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting blog",
            error: error.message
        });
    }
};

export default {
    createBlog,
    getAllBlogs,
    getBlogBySlug,
    updateBlog,
    deleteBlog
};
