import experss from "express"
const router=experss.Router();
import { Banner} from "../models/banner.js";
import cloudinary from "../Cloudinary/config.js";


router.post("/upload",async(req,res)=>{
 
  try {
 const {title}=req.body;
 if(!title||!req.files||!req.files.image){
   return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
 }
 const file=req.files.image;
 const result=await cloudinary.uploader.upload(file.tempFilePath,{
   folder:"megaZmoviesbanner",
   resource_type:"image"
 })
 await Banner.create({
  image:result.secure_url,
  title,
 })
    return res.status(201).json({
      success: true,
      message: "Picture added successfully",
    });
  } catch (err) {
   return res.status(500).json({ error: 'Failed to upload banner' });
  }
})

router.get("/allbanner",async(req,res)=>{
 const banner= await Banner.find().sort({createdAt:-1}).limit(3)
 
 if(!banner|| banner.length ===0){
  return res.status(404).json({message:"data not found"})
 }
 res.status(200).json({message:"sucess",banner})
})

export default router;