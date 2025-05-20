import mongoose from 'mongoose';

const bannerSchema=new mongoose.Schema({
  image:{type:String, required:true},
  title:{type:String }
},{timestamps:true});

export const Banner=mongoose.model("Banner",bannerSchema)