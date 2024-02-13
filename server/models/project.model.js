const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  owners: [
    {
      type: String,
      required: true,
    },
  ],
  contributors: [
    {
      type: String,
      required: true,
    },
  ],
  moderators: [
    {
      type: String,
      required: true,
    },
  ],
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  assets: {
    type: [String],
    default: [],
  },
  resources: {
    type: [String],
    default: [],
  },
  impact: {
    type: String,
    required: true,
  },
  versions: {
    type: [String],
    default: [],
  },
  required_skills: {
    type: [String],
    default: [],
  },
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
