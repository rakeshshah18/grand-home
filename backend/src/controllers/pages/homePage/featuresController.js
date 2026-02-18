import Features from "../../../models/pages/homePage/features.js";

/* ------------------------- helper: normalize cards ------------------------ */
const normalizePropertyCards = (cards = []) => {
    return cards.map(card => ({
        image: card.image,
        title: card.title,
        location: card.location,
        propertyOverview: {
            bedrooms: Number(card?.propertyOverview?.bedrooms) || 0,
            bathrooms: card?.propertyOverview?.bathrooms, // Mixed
            area: card?.propertyOverview?.area, // Mixed
            type: card?.propertyOverview?.type || '',
            livingRoom: Number(card?.propertyOverview?.livingRoom) || 0,
            familyRoom: Number(card?.propertyOverview?.familyRoom) || 0,
            nook: Number(card?.propertyOverview?.nook) || 0,
            flex: Number(card?.propertyOverview?.flex) || 0,
            bonusArea: Number(card?.propertyOverview?.bonusArea) || 0,
            balcony: Number(card?.propertyOverview?.balcony) || 0,
            basement: card?.propertyOverview?.basement, // Mixed
            parking: card?.propertyOverview?.parking // Mixed
        }
    }));
};

/* ------------------------------ CREATE ----------------------------------- */
const createFeatures = async (req, res) => {
    console.log('[DEBUG] createFeatures called');
    try {
        const { heading, propertyCards } = req.body;

        const features = await Features.create({
            heading,
            propertyCards: normalizePropertyCards(propertyCards)
        });

        res.status(201).json({
            success: true,
            message: "Features section created successfully",
            data: features
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
            message: "Error creating features section",
            error: error.message
        });
    }
};

/* ------------------------------ READ ALL --------------------------------- */
const getAllFeatures = async (req, res) => {
    console.log('[DEBUG] getAllFeatures called');
    try {
        const features = await Features.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: features.length,
            data: features
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching features",
            error: error.message
        });
    }
};

/* ------------------------------ READ ONE --------------------------------- */
const getFeaturesById = async (req, res) => {
    console.log('[DEBUG] getFeaturesById called with id:', req.params.id);
    try {
        const { id } = req.params;

        const features = await Features.findById(id);

        if (!features) {
            return res.status(404).json({
                success: false,
                message: "Features section not found"
            });
        }

        res.status(200).json({
            success: true,
            data: features
        });
    } catch (error) {
        if (error.kind === "ObjectId") {
            return res.status(400).json({
                success: false,
                message: "Invalid features ID"
            });
        }

        res.status(500).json({
            success: false,
            message: "Error fetching features section",
            error: error.message
        });
    }
};

/* ------------------------------ UPDATE ----------------------------------- */
const updateFeatures = async (req, res) => {
    console.log('[DEBUG] updateFeatures called with id:', req.params.id);
    try {
        const { id } = req.params;
        const { heading, propertyCards } = req.body;

        const updateData = {};

        if (heading !== undefined) {
            updateData.heading = heading;
        }

        if (propertyCards !== undefined) {
            updateData.propertyCards = normalizePropertyCards(propertyCards);
        }

        const features = await Features.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!features) {
            return res.status(404).json({
                success: false,
                message: "Features section not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Features section updated successfully",
            data: features
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
                message: "Invalid features ID"
            });
        }

        res.status(500).json({
            success: false,
            message: "Error updating features section",
            error: error.message
        });
    }
};

/* ------------------------------ DELETE ----------------------------------- */
const deleteFeatures = async (req, res) => {
    console.log('[DEBUG] deleteFeatures called with id:', req.params.id);
    try {
        const { id } = req.params;

        const features = await Features.findByIdAndDelete(id);

        if (!features) {
            return res.status(404).json({
                success: false,
                message: "Features section not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Features section deleted successfully",
            data: features
        });
    } catch (error) {
        if (error.kind === "ObjectId") {
            return res.status(400).json({
                success: false,
                message: "Invalid features ID"
            });
        }

        res.status(500).json({
            success: false,
            message: "Error deleting features section",
            error: error.message
        });
    }
};

export default {
    createFeatures,
    getAllFeatures,
    getFeaturesById,
    updateFeatures,
    deleteFeatures
};
