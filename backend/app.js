// console.log("jay shree ram");
import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import { connect } from "./config/db.js";
import cors from "cors";
import bodyParser from "body-parser";
import cookies from "cookie-parser"
import pictureRouter from "./router/picturRouter.js";
import bannerRouter from "./router/bannerRouter.js"
import adminRouter from "./router/admin.js"
import {CheckAdmin} from "./middleware/auth.js"

app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3002'],  
  credentials: true                // allow cookies
}));

app.use(express.json()); 
app.use(cookies());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));

// session message

app.get("/", async (req, res) => {
  res.send("API Working");
});

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
