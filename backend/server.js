const express = require("express");
const app = express();
const PORT =  5000;
const cors = require("cors");
const connectDB = require("./config/db.js");

connectDB();
// ---------------- Middleware ----------------
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ---------------- Routes ----------------

app.use("/", require("./Routes/authRoutes"));
app.use("/createPost", require("./Routes/createPost.js"));

// ---------------- Root route ----------------
app.get("/", (req, res) => {
  res.send("API is running");
});

// ---------------- Start server ----------------
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});