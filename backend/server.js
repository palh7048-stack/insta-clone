const express = require("express");
const app = express();
const PORT = 5000;
const cors = require("cors");
const connectDB = require("./config/db.js");

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ---------------- Routes ----------------

app.use("/", require("./Routes/authRoutes"));
app.use("/", require("./Routes/createPost.js"));

// ---------------- Root route ----------------
app.get("/", (req, res) => {
  res.send("API is running");
});

// // ---------------- Safety fix (prevents crash issues) ----------------
// process.on("uncaughtException", (err) => {
//   console.log("Uncaught Exception:", err);
// });

// process.on("unhandledRejection", (err) => {
//   console.log("Unhandled Rejection:", err);
// });

// ---------------- Server ----------------
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});