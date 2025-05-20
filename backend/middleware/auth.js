import { getuser } from "../service/auth.js";

export function CheckAdmin(req, res, next) {
  const uid = req.cookies?.uid;
  if (!uid) {
    console.log("No UID cookie found");
    return res.status(401).json({ message: "Please login first" });
  }
  try {
    const admin = getuser(uid);
    if (!admin) {
      console.log("Invalid admin");
      return res.status(401).json({ message: "Invalid admin credentials" });
    }
    req.admin = { id: admin.id };
    next();
  } catch (errr) {
    console.log("JWT verify failed:", err.message);
    return res.status(401).json({ message: "Token invalid or expired" });
  }
}
