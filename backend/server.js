const express = require("express");
const app = express();
const PORT = 5000;
const cors = require("cors");
const connectDB = require("./config/db.js");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(require("./Routes/authRoutes"));

connectDB();

app.listen(PORT, () => {
  console.log("server is running on PORT " + PORT);
});