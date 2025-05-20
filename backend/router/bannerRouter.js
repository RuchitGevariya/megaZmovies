import experss from "express"
import { Banner} from "../models/banner.js";
import multer from "multer";
import path from "path"
const router=experss.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve('uploads/banners/'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

router.post("/upload",upload.single("image"),async(req,res)=>{
  console.log(req.body);
  console.log(req.file);
  
  
  try {
    const banner = new Banner({ image: req.file.filename, title: req.body.title });
    await banner.save();
    res.json({ success: true, banner });
  } catch (err) {
    res.status(500).json({ error: 'Failed to upload banner' });
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