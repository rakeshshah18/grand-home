// controllers/aboutController.js
import AboutPage from '../../../models/pages/aboutPage/about.js';

export const createAbout = async (req, res) => {
    try {
        const aboutPage = new AboutPage(req.body);
        const saved = await aboutPage.save();
        res.status(201).json({
            success: true,
            message: "Section created successfully",
            data: saved
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getAbout = async (req, res) => {
    try {
        const aboutList = await AboutPage.find().sort({ createdAt: -1 });
        res.json({
            success: true,
            count: aboutList.length,
            data: aboutList
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updateAbout = async (req, res) => {
    try {
        const updatedAbout = await AboutPage.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!updatedAbout) {
            return res.status(404).json({ success: false, message: 'Section not found' });
        }
        res.json({
            success: true,
            message: "Section updated successfully",
            data: updatedAbout
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const upsertAbout = async (req, res) => {
    try {
        const aboutPage = await AboutPage.findOneAndUpdate({}, req.body, {
            new: true,
            upsert: true,
            runValidators: true
        });
        res.json({
            success: true,
            message: "Section upserted successfully",
            data: aboutPage
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const deleteAbout = async (req, res) => {
    try {
        const deletedAbout = await AboutPage.findByIdAndDelete(req.params.id);

        if (!deletedAbout) {
            return res.status(404).json({ success: false, message: 'Section not found' });
        }
        res.json({ success: true, message: 'Section deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
