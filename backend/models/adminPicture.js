import mongoose from "mongoose";

const pictureSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    year:{ type:Number,required:true},
    image: { type: String, required: true },
    bannerImage:{type:String,required:true},
    description: { type: String, required: true },
    genres: { type: String, required: true },
    duration: { type: String, required: true },
    driveId: { type: String, required: true },
    thrillerId: { type: String, required: true },
    category: { type: String ,required: true }
  },
  {
    timestamps: true,
  }
);

export const Movies= mongoose.model("Picture", pictureSchema);
