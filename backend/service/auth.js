import jwt from "jsonwebtoken"
const secretkey=process.env.JWT_SECRET_KEY


export function setuser(admin){
  
  const payload={
    id:admin._id,
    email:admin.email

  }
  
  return jwt.sign(payload,secretkey)
}

export function getuser(token){

  return jwt.verify(token,secretkey)
}