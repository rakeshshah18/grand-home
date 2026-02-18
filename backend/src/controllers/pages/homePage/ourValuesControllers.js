import OurValues from "../../../models/pages/homePage/ourValues.js";

export const createOurValues = async (req, res) => {
    try {
        const { cards } = req.body;

        if (!cards || !Array.isArray(cards) || cards.length === 0) {
            return res.status(400).json({ success: false, message: "cards array is required and must not be empty" });
        }

        const ourValues = await OurValues.create({ cards });
        res.status(200).json({ success: true, data: ourValues });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getOurValues = async (req, res) => {
    try {
        const ourValues = await OurValues.findOne();
        res.status(200).json({ success: true, data: ourValues });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updateOurValues = async (req, res) => {
    try {
        const ourValues = await OurValues.findOneAndUpdate(
            {},
            req.body,
            { new: true, upsert: true }
        );
        res.status(200).json({ success: true, data: ourValues });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const deleteOurValues = async (req, res) => {
    try {
        const ourValues = await OurValues.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, data: ourValues });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

