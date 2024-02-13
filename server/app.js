const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth.routes");
require("dotenv").config();

const corsOptions = {
  origin: "http://localhost:3000", // frontend URI (ReactJS)
};

app.use(express.json());
app.use(cors(corsOptions));

mongoose
  .connect(process.env.ATLAS_URI)
  .then(() => {
    console.log("Connected to Database!");
  })
  .catch((error) => {
    console.log(error);
  });

app.get("/", (req, res) => {
  res.status(201).json({ message: "Connected to Backend!" });
});
app.use("/auth", authRoutes);

module.exports = app;
