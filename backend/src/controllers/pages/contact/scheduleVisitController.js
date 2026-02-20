import ScheduleVisit from "../../../models/pages/contact/scheduleVisit.js";

// Get all scheduled visits
export const getScheduledVisits = async (req, res) => {
    try {
        const visits = await ScheduleVisit.find().sort({ timeStamp: -1 });
        res.status(200).json({ success: true, data: visits });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Create a new scheduled visit (usually called from frontend website)
export const createScheduledVisit = async (req, res) => {
    try {
        const newVisit = new ScheduleVisit(req.body);
        await newVisit.save();
        res.status(201).json({ success: true, data: newVisit });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Delete a scheduled visit
export const deleteScheduledVisit = async (req, res) => {
    try {
        const { id } = req.params;
        await ScheduleVisit.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Scheduled visit deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
