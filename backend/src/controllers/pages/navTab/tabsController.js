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
// Helper function to find a node by ID recursively in the tree
const findNodeById = (nodes, id) => {
    for (const node of nodes) {
        if (node._id.toString() === id) return node;
        if (node.children && node.children.length > 0) {
            const result = findNodeById(node.children, id);
            if (result) return result;
        }
    }
    return null;
};

// Helper function to delete a node by ID recursively
const deleteNodeById = (nodes, id) => {
    for (let i = 0; i < nodes.length; i++) {
        if (nodes[i]._id.toString() === id) {
            nodes.splice(i, 1);
            return true;
        }
        if (nodes[i].children && nodes[i].children.length > 0) {
            if (deleteNodeById(nodes[i].children, id)) return true;
        }
    }
    return false;
};

// Add a child item to any parent node (supports infinite/5-level nesting)
const addChildToTab = async (req, res) => {
    console.log('[DEBUG] addChildToTab called with parentId:', req.params.parentId);
    try {
        const { parentId } = req.params;
        const { name, url, order, children } = req.body;

        if (!name) {
            return res.status(400).json({ success: false, message: "Name is required" });
        }

        // 1. Search all root documents to find where this parentId exists
        const allRoots = await NavTabPage.find();
        let targetParent = null;
        let rootDoc = null;

        for (const root of allRoots) {
            if (root._id.toString() === parentId) {
                targetParent = root;
                rootDoc = root;
                break;
            }
            const foundNode = findNodeById(root.children, parentId);
            if (foundNode) {
                targetParent = foundNode;
                rootDoc = root;
                break;
            }
        }

        if (!targetParent || !rootDoc) {
            console.log('[ERROR] Parent node not found for ID:', parentId);
            return res.status(404).json({
                success: false,
                message: "Parent tab not found in the hierarchy"
            });
        }

        const newChild = {
            name,
            url: url || null,
            order: order || (targetParent.children ? targetParent.children.length : 0),
            isActive: true,
            children: children || []
        };

        if (!targetParent.children) targetParent.children = [];
        targetParent.children.push(newChild);

        await rootDoc.save();

        res.status(201).json({
            success: true,
            message: "Node added successfully",
            data: rootDoc // Return the root doc to sync the whole tree
        });
    } catch (error) {
        console.error('[ERROR] addChildToTab:', error);
        res.status(500).json({
            success: false,
            message: "Error adding child item",
            error: error.message
        });
    }
};

// Update an item at any level
const updateChildItem = async (req, res) => {
    console.log('[DEBUG] updateChildItem called. Parent(Root)ID:', req.params.parentId, 'ChildID:', req.params.childId);
    try {
        const { parentId, childId } = req.params; // parentId here is the Root ID passed from frontend
        const { name, url, order, isActive } = req.body;

        const rootDoc = await NavTabPage.findById(parentId);
        if (!rootDoc) {
            return res.status(404).json({ success: false, message: "Root document not found" });
        }

        let targetNode = null;
        if (parentId === childId) {
            targetNode = rootDoc;
        } else {
            targetNode = findNodeById(rootDoc.children, childId);
        }

        if (!targetNode) {
            return res.status(404).json({ success: false, message: "Item not found in tree" });
        }

        if (name !== undefined) targetNode.name = name;
        if (url !== undefined) targetNode.url = url;
        if (order !== undefined) targetNode.order = order;
        if (isActive !== undefined) targetNode.isActive = isActive;

        await rootDoc.save();

        res.status(200).json({
            success: true,
            message: "Item updated successfully",
            data: rootDoc
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating item",
            error: error.message
        });
    }
};

// Delete an item at any level
const deleteChildItem = async (req, res) => {
    console.log('[DEBUG] deleteChildItem called. RootID:', req.params.parentId, 'ChildID:', req.params.childId);
    try {
        const { parentId, childId } = req.params; // parentId is the root document ID

        const rootDoc = await NavTabPage.findById(parentId);
        if (!rootDoc) {
            return res.status(404).json({ success: false, message: "Root document not found" });
        }

        // If childId is the root itself, use standard delete
        if (parentId === childId) {
            await NavTabPage.findByIdAndDelete(parentId);
            return res.status(200).json({ success: true, message: "Root tab deleted" });
        }

        const deleted = deleteNodeById(rootDoc.children, childId);
        if (!deleted) {
            return res.status(404).json({ success: false, message: "Item not found in hierarchy" });
        }

        await rootDoc.save();

        res.status(200).json({
            success: true,
            message: "Node deleted successfully",
            data: rootDoc
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting item",
            error: error.message
        });
    }
};

// --- Standard wrappers/stubs to keep existing routes happy ---
const getChildrenOfTab = async (req, res) => {
    try {
        const root = await NavTabPage.findById(req.params.parentId);
        res.status(200).json({ success: true, data: root ? root.children : [] });
    } catch (e) { res.status(500).json({ success: false, message: e.message }); }
};

const updateTabItem = async (req, res) => {
    req.params.parentId = req.params.id;
    req.params.childId = req.params.id;
    return updateChildItem(req, res);
};

const deleteTabItem = async (req, res) => {
    req.params.parentId = req.params.id;
    req.params.childId = req.params.id;
    return deleteChildItem(req, res);
};

const addNestedChild = async (req, res) => {
    // Current logic uses addChildToTab which is already recursive
    req.params.parentId = req.params.childId;
    return addChildToTab(req, res);
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
