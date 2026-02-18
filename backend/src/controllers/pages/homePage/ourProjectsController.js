import OurProject from "../../../models/pages/homePage/ourProject.js";


/* ----------------------------- CREATE ----------------------------- */
const createProject = async (req, res) => {
    try {
        const { heading, cards } = req.body;

        const project = await OurProject.create({
            heading,
            cards
        });

        res.status(201).json({
            success: true,
            message: "Project section created successfully",
            data: project
        });
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }

        res.status(500).json({
            success: false,
            message: "Error creating project section",
            error: error.message
        });
    }
};

/* ----------------------------- GET ALL ----------------------------- */
const getAllProjects = async (req, res) => {
    try {
        const projects = await OurProject.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: projects.length,
            data: projects
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching projects",
            error: error.message
        });
    }
};

/* ----------------------------- GET BY ID ----------------------------- */
const getProjectById = async (req, res) => {
    try {
        const { id } = req.params;

        const project = await OurProject.findById(id);

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project section not found"
            });
        }

        res.status(200).json({
            success: true,
            data: project
        });
    } catch (error) {
        if (error.kind === "ObjectId") {
            return res.status(400).json({
                success: false,
                message: "Invalid project ID"
            });
        }

        res.status(500).json({
            success: false,
            message: "Error fetching project section",
            error: error.message
        });
    }
};

/* ----------------------------- UPDATE ----------------------------- */
const updateProject = async (req, res) => {
    try {
        const { id } = req.params;
        const { heading, cards } = req.body;

        const updateData = {};
        if (heading !== undefined) updateData.heading = heading;
        if (cards !== undefined) updateData.cards = cards;

        const project = await OurProject.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project section not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Project section updated successfully",
            data: project
        });
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }

        if (error.kind === "ObjectId") {
            return res.status(400).json({
                success: false,
                message: "Invalid project ID"
            });
        }

        res.status(500).json({
            success: false,
            message: "Error updating project section",
            error: error.message
        });
    }
};

/* ----------------------------- DELETE ----------------------------- */
const deleteProject = async (req, res) => {
    try {
        const { id } = req.params;

        const project = await OurProject.findByIdAndDelete(id);

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project section not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Project section deleted successfully",
            data: project
        });
    } catch (error) {
        if (error.kind === "ObjectId") {
            return res.status(400).json({
                success: false,
                message: "Invalid project ID"
            });
        }

        res.status(500).json({
            success: false,
            message: "Error deleting project section",
            error: error.message
        });
    }
};

export default {
    createProject,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject
};
