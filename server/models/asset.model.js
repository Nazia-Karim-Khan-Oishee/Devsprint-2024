const mongoose = require("mongoose");

const assetSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  project_id: {
    type: String,
    required: true,
  },
  owner_id: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});

const Asset = mongoose.model("Asset", assetSchema);

module.exports = Asset;
