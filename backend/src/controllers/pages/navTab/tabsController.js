import NavTabPage from "../../../models/pages/navTab/navTabs.js";

// Create a new top-level navigation tab
const createTabItem = async (req, res) => {
    console.log('[DEBUG] createTabItem called');
    try {
        const { name, url, order, pageRef, children } = req.body;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Tab name is required"
            });
        }

        const navItem = await NavTabPage.create({
            name,
            url,
            order: order || 0,
            pageRef: pageRef || null,
            children: children || []
        });

        res.status(201).json({
            success: true,
            message: "Navigation tab created successfully",
            data: navItem
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
            message: "Error creating navigation tab",
            error: error.message
        });
    }
};

// Get all navigation tabs
const getAllTabItems = async (req, res) => {
    console.log('[DEBUG] getAllTabItems called');
    try {
        const items = await NavTabPage.find().sort({ order: 1, createdAt: -1 });

        res.status(200).json({
            success: true,
            count: items.length,
            data: items
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching navigation tabs",
            error: error.message
        });
    }
};

// Get a single navigation tab by ID
const getTabItemById = async (req, res) => {
    console.log('[DEBUG] getTabItemById called with id:', req.params.id);
    try {
        const { id } = req.params;

        const item = await NavTabPage.findById(id);

        if (!item) {
            return res.status(404).json({
                success: false,
                message: "Navigation tab not found"
            });
        }

        res.status(200).json({
            success: true,
            data: item
        });
    } catch (error) {
        if (error.kind === "ObjectId") {
            return res.status(400).json({
                success: false,
                message: "Invalid tab ID"
            });
        }

        res.status(500).json({
            success: false,
            message: "Error fetching navigation tab",
            error: error.message
        });
    }
};

// Add a child item to a parent tab
const addChildToTab = async (req, res) => {
    console.log('[DEBUG] addChildToTab called');
    try {
        const { parentId } = req.params;
        const { name, url, order, children } = req.body;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Child item name is required"
            });
        }

        const parent = await NavTabPage.findById(parentId);
        if (!parent) {
            return res.status(404).json({
                success: false,
                message: "Parent tab not found"
            });
        }

        const newChild = {
            name,
            url: url || null,
            order: order || parent.children.length,
            isActive: true,
            children: children || []
        };

        parent.children.push(newChild);
        await parent.save();

        res.status(201).json({
            success: true,
            message: "Child item added successfully",
            data: parent
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
            message: "Error adding child item",
            error: error.message
        });
    }
};

// Add a nested child to a specific child (supports deep nesting)
const addNestedChild = async (req, res) => {
    console.log('[DEBUG] addNestedChild called');
    try {
        const { parentId, childId } = req.params;
        const { name, url, order, children } = req.body;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Item name is required"
            });
        }

        const parent = await NavTabPage.findById(parentId);
        if (!parent) {
            return res.status(404).json({
                success: false,
                message: "Parent tab not found"
            });
        }

        // Find the child using Mongoose subdocument id method
        const targetChild = parent.children.id(childId);
        if (!targetChild) {
            return res.status(404).json({
                success: false,
                message: "Child item not found"
            });
        }

        const newNestedChild = {
            name,
            url: url || null,
            order: order || targetChild.children.length,
            isActive: true,
            children: children || []
        };

        targetChild.children.push(newNestedChild);
        await parent.save();

        res.status(201).json({
            success: true,
            message: "Nested child added successfully",
            data: parent
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
            message: "Error adding nested child",
            error: error.message
        });
    }
};

// Get all children of a specific tab
const getChildrenOfTab = async (req, res) => {
    console.log('[DEBUG] getChildrenOfTab called');
    try {
        const { parentId } = req.params;

        const parent = await NavTabPage.findById(parentId);
        if (!parent) {
            return res.status(404).json({
                success: false,
                message: "Parent tab not found"
            });
        }

        res.status(200).json({
            success: true,
            count: parent.children.length,
            data: parent.children
        });
    } catch (error) {
        if (error.kind === "ObjectId") {
            return res.status(400).json({
                success: false,
                message: "Invalid parent ID"
            });
        }

        res.status(500).json({
            success: false,
            message: "Error fetching children",
            error: error.message
        });
    }
};

// Update a navigation tab
const updateTabItem = async (req, res) => {
    console.log('[DEBUG] updateTabItem called with id:', req.params.id);
    try {
        const { id } = req.params;
        const { name, url, order, isActive, pageRef } = req.body;

        const updateData = {};
        if (name !== undefined) updateData.name = name;
        if (url !== undefined) updateData.url = url;
        if (order !== undefined) updateData.order = order;
        if (isActive !== undefined) updateData.isActive = isActive;
        if (pageRef !== undefined) updateData.pageRef = pageRef;

        const item = await NavTabPage.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!item) {
            return res.status(404).json({
                success: false,
                message: "Navigation tab not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Navigation tab updated successfully",
            data: item
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
                message: "Invalid tab ID"
            });
        }

        res.status(500).json({
            success: false,
            message: "Error updating navigation tab",
            error: error.message
        });
    }
};

// Update a child item
const updateChildItem = async (req, res) => {
    console.log('[DEBUG] updateChildItem called');
    try {
        const { parentId, childId } = req.params;
        const { name, url, order, isActive } = req.body;

        const parent = await NavTabPage.findById(parentId);
        if (!parent) {
            return res.status(404).json({
                success: false,
                message: "Parent tab not found"
            });
        }

        const child = parent.children.id(childId);
        if (!child) {
            return res.status(404).json({
                success: false,
                message: "Child item not found"
            });
        }

        if (name !== undefined) child.name = name;
        if (url !== undefined) child.url = url;
        if (order !== undefined) child.order = order;
        if (isActive !== undefined) child.isActive = isActive;

        await parent.save();

        res.status(200).json({
            success: true,
            message: "Child item updated successfully",
            data: parent
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
            message: "Error updating child item",
            error: error.message
        });
    }
};

// Delete a navigation tab
const deleteTabItem = async (req, res) => {
    console.log('[DEBUG] deleteTabItem called with id:', req.params.id);
    try {
        const { id } = req.params;

        const item = await NavTabPage.findByIdAndDelete(id);

        if (!item) {
            return res.status(404).json({
                success: false,
                message: "Navigation tab not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Navigation tab deleted successfully",
            data: item
        });
    } catch (error) {
        if (error.kind === "ObjectId") {
            return res.status(400).json({
                success: false,
                message: "Invalid tab ID"
            });
        }

        res.status(500).json({
            success: false,
            message: "Error deleting navigation tab",
            error: error.message
        });
    }
};

// Delete a child item from a parent tab
const deleteChildItem = async (req, res) => {
    console.log('[DEBUG] deleteChildItem called');
    try {
        const { parentId, childId } = req.params;

        const parent = await NavTabPage.findById(parentId);
        if (!parent) {
            return res.status(404).json({
                success: false,
                message: "Parent tab not found"
            });
        }

        const child = parent.children.id(childId);
        if (!child) {
            return res.status(404).json({
                success: false,
                message: "Child item not found"
            });
        }

        child.remove();
        await parent.save();

        res.status(200).json({
            success: true,
            message: "Child item deleted successfully",
            data: parent
        });
    } catch (error) {
        if (error.kind === "ObjectId") {
            return res.status(400).json({
                success: false,
                message: "Invalid ID"
            });
        }

        res.status(500).json({
            success: false,
            message: "Error deleting child item",
            error: error.message
        });
    }
};

export default {
    createTabItem,
    getAllTabItems,
    getTabItemById,
    addChildToTab,
    addNestedChild,
    getChildrenOfTab,
    updateTabItem,
    updateChildItem,
    deleteTabItem,
    deleteChildItem
};
