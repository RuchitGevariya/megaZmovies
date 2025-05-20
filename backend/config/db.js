import mongoose from "mongoose";

export const connect = async () => {
  mongoose
    .connect(process.env.MongoDbUrl)
    .then(() => {
      console.log("connected");
    })
    .catch((error) => {
      console.log(error);
    });
};
