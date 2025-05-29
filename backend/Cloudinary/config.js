import dotenv from "dotenv";
const result = dotenv.config();
import {v2 as cloudinary} from "cloudinary"

// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.API_KEY,
//   api_secret: process.env.API_SECRET,
// });

cloudinary.config({
  secure:true,
})

export default cloudinary