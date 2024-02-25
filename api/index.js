import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB is connected");
    app.listen(process.env.PORT || 5000, () => {
      console.log(`server is running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => console.log(error));
