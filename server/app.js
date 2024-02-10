const express = require("express");
const app = express();
const mongoose = require("mongoose");
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

module.exports = app;
