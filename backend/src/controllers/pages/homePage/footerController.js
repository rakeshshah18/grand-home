import Footer from "../../../models/pages/homePage/footer.js";

// Get footer data
export const getFooter = async (req, res) => {
    try {
        let footer = await Footer.findOne();
        if (!footer) {
            // Create default footer if none exists
            footer = await Footer.create({ columns: [] });
        }
        res.status(200).json({ success: true, data: footer });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update footer data
export const updateFooter = async (req, res) => {
    try {
        const { columns, isActive } = req.body;
        const footer = await Footer.findOneAndUpdate(
            {},
            { columns, isActive },
            { new: true, upsert: true }
        );
        res.status(200).json({ success: true, data: footer });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
