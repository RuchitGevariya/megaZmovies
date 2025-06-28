import mongoose from "mongoose";

const adminSchema =await mongoose.Schema({
   name:{type:String,required:true},
   email:{type:String, unique:true,required:true},
    password:{type:String,required:true} 
})
export const Admin=mongoose.model("admin",adminSchema)