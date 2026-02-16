import NavTabPage from "../../../models/pages/navTab/navTabs.js";

const createTabItem = async (req, res) => {
    console.log('[DEBUG] createTabItem called');
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Page name is required"
            });
        }
        const page = await NavTabPage.create({ name });

        res.status(201).json({
            success: true,
            message: "Page created successfully",
            data: page
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "Page with this name already exists"
            });
        }
        if (error.name === "ValidationError") {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }
        res.status(500).json({
            success: false,
            message: "Error creating page",
            error: error.message
        });
    }
};

const getAllTabItems = async (req, res) => {
    console.log('[DEBUG] getAllTabItems called');
    try {
        const pages = await NavTabPage.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: pages.length,
            data: pages
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching pages",
            error: error.message
        });
    }
};

const getTabItemById = async (req, res) => {
    console.log('[DEBUG] getTabItemById called with id:', req.params.id);
    try {
        const { id } = req.params;

        const page = await NavTabPage.findById(id);

        if (!page) {
            return res.status(404).json({
                success: false,
                message: "Page not found"
            });
        }

        res.status(200).json({
            success: true,
            data: page
        });
    } catch (error) {
        if (error.kind === "ObjectId") {
            return res.status(400).json({
                success: false,
                message: "Invalid page ID"
            });
        }

        res.status(500).json({
            success: false,
            message: "Error fetching page",
            error: error.message
        });
    }
};

const updateTabItem = async (req, res) => {
    console.log('[DEBUG] updateTabItem called with id:', req.params.id);
    try {
        const { id } = req.params;
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Page name is required"
            });
        }

        const page = await NavTabPage.findByIdAndUpdate(
            id,
            { name },
            { new: true, runValidators: true }
        );

        if (!page) {
            return res.status(404).json({
                success: false,
                message: "Page not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Page updated successfully",
            data: page
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "Page with this name already exists"
            });
        }

        if (error.name === "ValidationError") {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }

        if (error.kind === "ObjectId") {
            return res.status(400).json({
                success: false,
                message: "Invalid page ID"
            });
        }

        res.status(500).json({
            success: false,
            message: "Error updating page",
            error: error.message
        });
    }
};

const deleteTabItem = async (req, res) => {
    console.log('[DEBUG] deleteTabItem called with id:', req.params.id);
    try {
        const { id } = req.params;

        const page = await NavTabPage.findByIdAndDelete(id);

        if (!page) {
            return res.status(404).json({
                success: false,
                message: "Page not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Page deleted successfully",
            data: page
        });
    } catch (error) {
        if (error.kind === "ObjectId") {
            return res.status(400).json({
                success: false,
                message: "Invalid page ID"
            });
        }

        res.status(500).json({
            success: false,
            message: "Error deleting page",
            error: error.message
        });
    }
};

export default {
    createTabItem,
    getAllTabItems,
    getTabItemById,
    updateTabItem,
    deleteTabItem
};
