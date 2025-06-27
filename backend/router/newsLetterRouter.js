import express from "express";
const router = express.Router();
import { handleNewsLetter } from "../controllers/newsLetter.js";



router.post("/news-letter",handleNewsLetter);

export default router;
