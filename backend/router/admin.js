import express from "express"
import { handleLogin,handleCheck ,handleLogout,handleSignup} from "../controllers/admin.js";
const router=express.Router();



router.post("/signup",handleSignup)
router.post("/login",handleLogin)
router.get("/check",handleCheck)
router.get("/logout",handleLogout)
export default router;