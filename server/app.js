const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth.routes");
require("dotenv").config();
const ProjectRoutes = require("./routes/project.route");

const corsOptions = {
  origin: "http://localhost:3000",
};

app.use(express.json());
app.use(cors(corsOptions));
app.use("/projects", ProjectRoutes);

mongoose
  .connect(process.env.ATLAS_URI)
  .then(() => {
    console.log("Connected to Database!");
  })
  .catch((error) => {
    console.log(error);
  });

<<<<<<< HEAD
=======
app.get("/", (req, res) => {
  res.status(201).json({ message: "Connected to Backend!" });
});
app.use("/auth", authRoutes);

>>>>>>> 930fb203e625e8ded8a477e82d3bff4af590bee9
module.exports = app;
