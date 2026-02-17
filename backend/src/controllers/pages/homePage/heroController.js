import Hero from "../../../models/pages/homePage/hero.js";

// Create a new hero
const createHero = async (req, res) => {
    console.log('[DEBUG] createHero called');
    try {
        const { heading, subheading, buttonText, buttonLink, videoUrl } = req.body;

        const hero = await Hero.create({
            heading,
            subheading,
            buttonText,
            buttonLink,
            videoUrl
        });

        res.status(201).json({
            success: true,
            message: "Hero created successfully",
            data: hero
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
            message: "Error creating hero",
            error: error.message
        });
    }
};

// Get all heroes
const getAllHeroes = async (req, res) => {
    console.log('[DEBUG] getAllHeroes called');
    try {
        const heroes = await Hero.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: heroes.length,
            data: heroes
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching heroes",
            error: error.message
        });
    }
};

// Get a single hero by ID
const getHeroById = async (req, res) => {
    console.log('[DEBUG] getHeroById called with id:', req.params.id);
    try {
        const { id } = req.params;

        const hero = await Hero.findById(id);

        if (!hero) {
            return res.status(404).json({
                success: false,
                message: "Hero not found"
            });
        }

        res.status(200).json({
            success: true,
            data: hero
        });
    } catch (error) {
        if (error.kind === "ObjectId") {
            return res.status(400).json({
                success: false,
                message: "Invalid hero ID"
            });
        }

        res.status(500).json({
            success: false,
            message: "Error fetching hero",
            error: error.message
        });
    }
};

// Update a hero
const updateHero = async (req, res) => {
    console.log('[DEBUG] updateHero called with id:', req.params.id);
    try {
        const { id } = req.params;
        const { heading, subheading, buttonText, buttonLink, videoUrl } = req.body;

        const updateData = {};
        if (heading !== undefined) updateData.heading = heading;
        if (subheading !== undefined) updateData.subheading = subheading;
        if (buttonText !== undefined) updateData.buttonText = buttonText;
        if (buttonLink !== undefined) updateData.buttonLink = buttonLink;
        if (videoUrl !== undefined) updateData.videoUrl = videoUrl;

        const hero = await Hero.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!hero) {
            return res.status(404).json({
                success: false,
                message: "Hero not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Hero updated successfully",
            data: hero
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
                message: "Invalid hero ID"
            });
        }

        res.status(500).json({
            success: false,
            message: "Error updating hero",
            error: error.message
        });
    }
};

// Delete a hero
const deleteHero = async (req, res) => {
    console.log('[DEBUG] deleteHero called with id:', req.params.id);
    try {
        const { id } = req.params;

        const hero = await Hero.findByIdAndDelete(id);

        if (!hero) {
            return res.status(404).json({
                success: false,
                message: "Hero not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Hero deleted successfully",
            data: hero
        });
    } catch (error) {
        if (error.kind === "ObjectId") {
            return res.status(400).json({
                success: false,
                message: "Invalid hero ID"
            });
        }

        res.status(500).json({
            success: false,
            message: "Error deleting hero",
            error: error.message
        });
    }
};

export default {
    createHero,
    getAllHeroes,
    getHeroById,
    updateHero,
    deleteHero
};
