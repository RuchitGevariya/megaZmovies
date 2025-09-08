import express from "express";
const pictureRouter = express.Router();
import { addPicture, listAllPicture,listLatestPictures} from "../controllers/picture.js";
// Apply upload middleware to this route
pictureRouter.post("/addPicture", addPicture);
pictureRouter.get("/listAllPicture", listAllPicture);
pictureRouter.get("/latestPicture",listLatestPictures);
export default pictureRouter;
