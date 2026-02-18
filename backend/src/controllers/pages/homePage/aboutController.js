import About from "../../../models/pages/homePage/about.js";

export const createAbout = async (req, res) => {
  try {
    const {
      heading,
      description,
      imageOne,
      imageTwo,
      buttonText,
      buttonLink
    } = req.body;

    const about = new About({
      heading,
      description,
      imageOne,
      imageTwo,
      buttonText,
      buttonLink
    });

    const savedAbout = await about.save();

    res.status(201).json({
      success: true,
      message: "About created successfully",
      data: savedAbout
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating About",
      error: error.message
    });
  }
};

/**
 * GET ALL About entries
 */
export const getAllAbout = async (req, res) => {
  try {
    const aboutList = await About.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: aboutList.length,
      data: aboutList
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching About entries",
      error: error.message
    });
  }
};

/**
 * GET SINGLE About by ID
 */
export const getAboutById = async (req, res) => {
  try {
    const about = await About.findById(req.params.id);

    if (!about) {
      return res.status(404).json({
        success: false,
        message: "About not found"
      });
    }

    res.status(200).json({
      success: true,
      data: about
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching About",
      error: error.message
    });
  }
};

/**
 * UPDATE About
 */
export const updateAbout = async (req, res) => {
  try {
    const updatedAbout = await About.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedAbout) {
      return res.status(404).json({
        success: false,
        message: "About not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "About updated successfully",
      data: updatedAbout
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating About",
      error: error.message
    });
  }
};

/**
 * DELETE About
 */
export const deleteAbout = async (req, res) => {
  try {
    const deletedAbout = await About.findByIdAndDelete(req.params.id);

    if (!deletedAbout) {
      return res.status(404).json({
        success: false,
        message: "About not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "About deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting About",
      error: error.message
    });
  }
};
