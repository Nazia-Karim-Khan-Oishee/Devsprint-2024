const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  suitable_project_categories: [
    {
      type: String,
      required: true,
    },
  ],
});

const Skill = mongoose.model("Skill", skillSchema);

module.exports = Skill;
