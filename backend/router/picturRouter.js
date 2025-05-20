import express from "express";
const pictureRouter = express.Router();
import { addPicture, listAllPicture,listLatestPictures} from "../controllers/picture.js";

// Multer storage configuration
import multer from "multer";
import path from "path";
import fs from "fs";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = "uploads/";
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => { 
    cb(null, file.originalname);
  },
});
const upload = multer({ storage }).single("image");
// Apply upload middleware to this route
pictureRouter.post("/addPicture", upload, addPicture);
pictureRouter.get("/listAllPicture", listAllPicture);
pictureRouter.get("/latestPicture",listLatestPictures)
// pictureRouter.get("/category/:category", listByCategory);

export default pictureRouter;
