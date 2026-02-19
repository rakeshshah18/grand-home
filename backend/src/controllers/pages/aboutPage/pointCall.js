import PointsCall from "../../../models/pages/aboutPage/points.js";

// CREATE new PointsCall
export const createPointsCall = async (req, res) => {
    try {
        const { features, callIcon, callNumber } = req.body;

        const newPointsCall = new PointsCall({
            features,
            callIcon,
            callNumber,
        });

        const savedData = await newPointsCall.save();

        res.status(201).json({
            success: true,
            message: "Points & Call section created successfully",
            data: savedData,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error creating section",
            error: error.message,
        });
    }
};

// GET all PointsCall
export const getAllPointsCall = async (req, res) => {
    try {
        const data = await PointsCall.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: data.length,
            data,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching PointsCall",
            error: error.message,
        });
    }
};

// GET single PointsCall by ID
export const getPointsCallById = async (req, res) => {
    try {
        const data = await PointsCall.findById(req.params.id);

        if (!data) {
            return res.status(404).json({
                success: false,
                message: "PointsCall not found",
            });
        }

        res.status(200).json({
            success: true,
            data,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching PointsCall",
            error: error.message,
        });
    }
};

// UPDATE PointsCall
export const updatePointsCall = async (req, res) => {
    try {
        const updatedData = await PointsCall.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedData) {
            return res.status(404).json({
                success: false,
                message: "PointsCall not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "PointsCall updated successfully",
            data: updatedData,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating PointsCall",
            error: error.message,
        });
    }
};

// DELETE PointsCall
export const deletePointsCall = async (req, res) => {
    try {
        const deletedData = await PointsCall.findByIdAndDelete(req.params.id);

        if (!deletedData) {
            return res.status(404).json({
                success: false,
                message: "PointsCall not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "PointsCall deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting PointsCall",
            error: error.message,
        });
    }
};