import {Movies} from "../models/adminPicture.js"



export const addPicture = async (req, res) => {
  try {
    const { title, year, description, genres, duration, category, driveId } = req.body;
    const image = req.file ? req.file.originalname : null;

    if (!title || !image || !description || !genres || !duration || !driveId || !year||!category) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check if the image already exists in the database
    const existsImage = await Movies.findOne({ image });
    if (existsImage) {
      return res.status(400).json({
        success: false,
        message: "Picture already exists",
      });
    }

    // Convert year to number if needed
    const numericYear = Number(year);

    // Save the new picture
    const newPicture = new Movies({
      title,
      year: numericYear,
      description,
      image,
      genres,
      category,
      duration,
      driveId,
    });

    await newPicture.save();

    return res.status(200).json({
      success: true,
      message: "Picture added successfully",
      redirectUrl: "/list",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const listAllPicture = async (req, res) => {
  try {
    const allData = await Movies.find();
    if (allData.length <= 0) {
      return res.status(400).json({
        success: false,
        message: "No Picture available",
      });
    }
    return res.status(200).json({ success: true, data: allData });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, message: error.message });
  }
};

// category api

// export const listByCategory = async (req, res) => {
//   try {
//     const { category } = req.params;

//     if (!category) {
//       return res.status(400).json({
//         success: false,
//         message: "Category is required",
//       });
//     }

//     const categoryData = await Movies.find({ category: { $regex: new RegExp(category, "i") } });

//     if (categoryData.length === 0) {
//       return res.status(404).json({
//         success: false,
//         message: "No movies found for this category",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       data: categoryData,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//       error: error.message,
//     });
//   }
// };

// Get Latest Movies
export const listLatestPictures = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 4; // default to 4 movies
    const latestData = await Movies.find()
      .sort({ createdAt: -1 }) // newest first
      .limit(limit);

    if (latestData.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No latest pictures found",
      });
    }

    return res.status(200).json({
      success: true,
      data: latestData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
