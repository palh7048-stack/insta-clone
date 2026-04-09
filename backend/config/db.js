const mongoose = require("mongoose");

const MONGO_URL = "mongodb+srv://harsh123:Harsh144@cluster0.kiy8vcw.mongodb.net/insta?appName=Cluster0";

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