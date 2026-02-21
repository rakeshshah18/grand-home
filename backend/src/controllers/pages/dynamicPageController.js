import DynamicPage from "../../models/pages/dynamicPage.js";

// Add or Update a dynamic page's content
const upsertPageContent = async (req, res) => {
    console.log("[DEBUG] upsertPageContent called for path:", req.body.path);
    try {
        const { title, path, sections, navTabId } = req.body;

        if (!path) {
            return res.status(400).json({
                success: false,
                message: "Path is required to save page content"
            });
        }

        // Search for existing page by path
        let page = await DynamicPage.findOne({ path });

        if (page) {
            // Update existing
            page.title = title || page.title;
            page.sections = sections || page.sections;
            page.navTabId = navTabId || page.navTabId;
            await page.save();
        } else {
            // Create new
            page = await DynamicPage.create({
                title,
                path,
                sections: sections || [],
                navTabId: navTabId || null
            });
        }

        res.status(200).json({
            success: true,
            message: "Page content saved successfully",
            data: page
        });
    } catch (error) {
        console.error("[ERROR] upsertPageContent:", error);
        res.status(500).json({
            success: false,
            message: "Error saving page content",
            error: error.message
        });
    }
};

// Get page content by its full path
const getPageByPath = async (req, res) => {
    console.log("[DEBUG] getPageByPath called for:", req.query.path);
    try {
        const { path } = req.query;

        if (!path) {
            return res.status(400).json({
                success: false,
                message: "Path query parameter is required"
            });
        }

        const page = await DynamicPage.findOne({ path });

        if (!page) {
            return res.status(404).json({
                success: false,
                message: "No content found for this path"
            });
        }

        res.status(200).json({
            success: true,
            data: page
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching page content",
            error: error.message
        });
    }
};

// Delete page content
const deletePage = async (req, res) => {
    try {
        const { id } = req.params;
        const page = await DynamicPage.findByIdAndDelete(id);

        if (!page) {
            return res.status(404).json({
                success: false,
                message: "Page content not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Page content deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting page content",
            error: error.message
        });
    }
};

export default {
    upsertPageContent,
    getPageByPath,
    deletePage
};
