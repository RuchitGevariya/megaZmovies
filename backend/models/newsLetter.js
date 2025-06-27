import mongoose from "mongoose";

const newsLetterSchema = mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
);
 export const NewsLetter=mongoose.model("newsletter",newsLetterSchema)