import dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import { connect } from "./config/db.js";
import cors from "cors";
import bodyParser from "body-parser";
import cookies from "cookie-parser"
import pictureRouter from "./router/picturRouter.js";
import bannerRouter from "./router/bannerRouter.js"
import adminRouter from "./router/admin.js"
import {CheckAdmin} from "./middleware/auth.js"
import fileupload from "express-fileupload"
import {fileURLToPath} from "url"
import path from "path"
import { log } from "console";
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3002','https://mega-zmovies.vercel.app','https://mega-zmovies-zols-maqvf87tl-ruchit302s-projects.vercel.app/'],  
  credentials: true                
}));

//path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(express.json()); 
app.use(cookies());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
//no need but stille to be used
app.use("/uploads", express.static("uploads"));
app.use(fileupload({
  useTempFiles:true,
  tempFileDir:path.join(__dirname,'tmp'),
  createParentPath:true
}))

//routing for user
// Public routes
app.use("/api/public", pictureRouter);  
app.use("/api/banner", bannerRouter);
//login router
app.use("/api/auth",adminRouter)
//secure routes
app.use("/api/admin",CheckAdmin, pictureRouter);
app.use("/api/admin",CheckAdmin,bannerRouter)


const PORT = process.env.PORT;
app.listen(PORT,'0.0.0.0', () => {
  console.log(`server running on the http://localhost:${PORT}`);
  connect();
});
