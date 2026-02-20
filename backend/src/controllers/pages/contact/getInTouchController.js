import GetInTouch from '../../../models/pages/contact/getInTouch.js';

// Get Get In Touch content
export const getGetInTouch = async (req, res) => {
    try {
        let getInTouch = await GetInTouch.findOne();

        if (!getInTouch) {
            // Create default data if none exists
            getInTouch = await GetInTouch.create({
                heading: 'Get In Touch',
                sections: [
                    { title: 'Phone', description: '+123 456 7890', icon: 'fa fa-phone' },
                    { title: 'Email', description: 'info@example.com', icon: 'fa fa-envelope' },
                    { title: 'Address', description: 'Street Name, City, Country', icon: 'fa fa-map-marker' }
                ]
            });
        }

        res.status(200).json({
            success: true,
            data: getInTouch
        });
    } catch (error) {
        console.error("Error in getGetInTouch:", error);
        res.status(500).json({
            success: false,
            message: 'Error fetching Get In Touch content',
            error: error.message
        });
    }
};

// Update Get In Touch content
export const updateGetInTouch = async (req, res) => {
    try {
        const { heading, sections } = req.body;

        // Use findOneAndUpdate with upsert option to handle both update and create cases cleanly
        const getInTouch = await GetInTouch.findOneAndUpdate(
            {}, // find the first document (singleton pattern)
            { heading, sections }, // update these fields
            { new: true, upsert: true, runValidators: true } // return updated doc, create if not found, validate
        );

        res.status(200).json({
            success: true,
            message: 'Get In Touch content updated successfully',
            data: getInTouch
        });
    } catch (error) {
        console.error("Error in updateGetInTouch:", error);
        res.status(500).json({
            success: false,
            message: 'Error updating Get In Touch content',
            error: error.message
        });
    }
};
