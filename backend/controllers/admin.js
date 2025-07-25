import { Admin } from "../models/admin.js";
import { setuser } from "../service/auth.js";

export async function handleSignup(req, res) {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ message: "all filed are requried" });
  const signup = await Admin.create({
    name,
    email,
    password,
  });
  if (!signup) {
    res.status(404).json({ message: "admin not signup" });
  }
  return res.status(201).json({ message: "admin signup" });
}

export async function handleLogin(req, res) {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "invaild email or password" });
  const admin = await Admin.findOne({ email, password });
  if(!admin){
    return res.status(401).json({ message: "Admin not found or password incorrect" });
  }
  const token = setuser(admin);
  res.cookie("uid",token,{
    httpOnly:true,
    secure:true,
    sameSite:'None',
     path: '/',
  maxAge:30*60*1000
  });
  return res.status(200).json({ message: "login successfully", success: true });
}

export async function handleCheck(req, res) {
 const token=req.cookies?.uid;
 if(!token) return res.status(401).json({message:"anauthorized",success:false})
 return res.status(200).json({success:true,})
}

export async function handleLogout(req, res) {
console.log("calling")
res.clearCookie("uid", {
  httpOnly: true,
  secure: true,
  sameSite: 'None',
  path: '/'
});
console.log("cookie after logout",req.cookies);

return res.status(200).json({ message: "user logout", success: true });
 }
