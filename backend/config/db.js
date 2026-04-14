const mongoose = require("mongoose");
require("dotenv").config();


const MONGO_URL = process.env.MONGO_URL   ;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL); 
    console.log("Successfully connected to MongoDB Atlas");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

module.exports = connectDB;