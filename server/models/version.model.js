const mongoose = require("mongoose");

const versionSchema = new mongoose.Schema({
  project_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  created_by: {
    type: String,
    required: true,
  },
  changes: {
    type: String,
    required: true,
  },
  details: {
    type: String,
  },
});

const Version = mongoose.model("Version", versionSchema);

module.exports = Version;
