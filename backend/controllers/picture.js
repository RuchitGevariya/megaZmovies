import { log } from "console";
import { Movies } from "../models/adminPicture.js";
import cloudinary from "../Cloudinary/config.js";

export const addPicture = async (req, res) => {
  try {
    const {
      title,
      year,
      description,
      genres,
      duration,
      category,
      driveId,
      trailerId,
    } = req.body;
    if (
      !title ||
      !description ||
      !genres ||
      !duration ||
      !trailerId ||
      !driveId ||
      !year ||
      !category ||
      !req.files ||
      !req.files.image ||
      !req.files.banner
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    // cloudinary images upload

    const file = req.files.image;
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: "megaZmoviesposter",
      resource_type: "image",
    });
    console.log("that movie image", result);
    const file2 = req.files.banner;
    const result2 = await cloudinary.uploader.upload(file2.tempFilePath, {
      folder: "megaZmoviesbanner",
      resource_type: "image",
    });
    console.log("that banner image", result2);
    // Convert year to number if needed
    const numericYear = Number(year);
    // Save the new picture
    const newPicture = new Movies({
      title,
      year: numericYear,
      description,
      image: result.secure_url,
      bannerImage: result2.secure_url,
      genres,
      category,
      duration,
      driveId,
      trailerId,
    });

    await newPicture.save();
    return res.status(201).json({
      success: true,
      message: "Picture added successfully",
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
    const pageNumber = Number(req.query.page) || 1;
    const pageLimt = Number(req.query.limit) || 12;
    const Search = req.query.search || "";

    const skip = (pageNumber - 1) * pageLimt;

    //bulid filter
    const filter = Search ? {title:{ $regex:Search,$options:"i"} } : {};
        const totalcount = await Movies.countDocuments(filter);

    const allData = await Movies.find(filter)
      .skip(skip)
      .limit(pageLimt)
      .sort({ year: -1, createdAt: -1 })
      
    if (allData.length === 0) {
      return res.status(200).json({
        success: true,
        data: [],
        total: 0,
        message: "No Picture available",
      });
    }
    return res
      .status(200)
      .json({ success: true, data: allData, total: totalcount });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, message: error.message });
  }
};

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
