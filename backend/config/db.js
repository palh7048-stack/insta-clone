const mongoose = require("mongoose")
const MONGO_URL = "mongodb+srv://harsh123:254030@cluster0.kiy8vcw.mongodb.net/?appName=Cluster0&retryWrites=true&w=majority"

const connectDB = async()=>{
    try {
        await mongoose.connect(MONGO_URL)
        console.log(" successfully connected to MongoDB")
    } catch (error) {
        console.error("Error connecting to MongoDB:", error)
    }
}

module.exports = connectDB