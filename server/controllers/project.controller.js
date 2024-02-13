// const SECRET = process.env.SECRET;
const Project = require("../models/project.model.js");
const User = require("../models/user.model.js");
// const Task = require("../models/Task.model.js");
// const Comment = require("../models/Comment.model.js");
// const jwt = require("jsonwebtoken");

// const getCurrentUser = (req) => {
//   const token = req.cookies.jwt;
//   if (token) {
//     const id = jwt.verify(req.cookies.jwt, SECRET).id;
//     return id;
//   } else {
//     return null;
//   }
// };

const getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    res.status(200).json(project);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getProjectsByCategory = async (req, res) => {
  try {
    const category = req.query.category;
    const projects = await Project.find({ category: category });
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getProjectsBySkill = async (req, res) => {
  try {
    const skill = req.query.skill;
    const projects = await Project.find({ required_skills: skill });
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getProjectsOwnedByUser = async (req, res) => {
  try {
    const user = req.query.user;
    const projects = await Project.find({ owners: user });
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getProjectsContributedByUser = async (req, res) => {
  try {
    const user = req.query.user;
    const projects = await Project.find({ contributors: user });
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getProjectsModeratedByUser = async (req, res) => {
  try {
    const user = req.query.user;
    const projects = await Project.find({ moderators: user });
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getProjectsBySkills = async (req, res) => {
  try {
    const skills = req.query.skills.split(",");
    const projects = await Project.find({ required_skills: { $in: skills } })
      .sort({ $meta: "textScore" })
      .exec((err, projects) => {
        if (err) {
          res.status(500).json(err);
        } else {
          const sortedProjects = projects.sort((a, b) => {
            const aMatches = a.required_skills.filter((skill) =>
              skills.includes(skill)
            ).length;
            const bMatches = b.required_skills.filter((skill) =>
              skills.includes(skill)
            ).length;
            return bMatches - aMatches;
          });
          res.status(200).json(sortedProjects);
        }
      });
  } catch (err) {
    res.status(500).json(err);
  }
};

const getSuitableProjectsForUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    const userSkills = user.skills;
    const projects = await Project.find({
      required_skills: { $in: userSkills },
    })
      .sort({ $meta: "textScore" })
      .exec((err, projects) => {
        if (err) {
          res.status(500).json(err);
        } else {
          const sortedProjects = projects.sort((a, b) => {
            const aMatches = a.required_skills.filter((skill) =>
              userSkills.includes(skill)
            ).length;
            const bMatches = b.required_skills.filter((skill) =>
              userSkills.includes(skill)
            ).length;
            return bMatches - aMatches;
          });
          res.status(200).json(sortedProjects);
        }
      });
  } catch (err) {
    res.status(500).json(err);
  }
};

const createProject = async (req, res) => {
  try {
    const newProject = new Project(req.body);
    const savedProject = await newProject.save();
    res.status(200).json(savedProject);
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateProject = async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProject);
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteProject = async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.status(200).json("Project has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
};

const addOwners = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    const user = await User.findById(req.body.userId);
    if (!project.owners.includes(req.body.userId)) {
      project.owners.push(req.body.userId);
      user.projects.push(req.params.id);
      await project.save();
      await user.save();
      res.status(200).json("The user has been added to the project...");
    } else {
      res.status(400).json("The user is already in the project...");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const addContributors = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    const user = await User.findById(req.body.userId);
    if (!project.contributors.includes(req.body.userId)) {
      project.contributors.push(req.body.userId);
      user.projects.push(req.params.id);
      await project.save();
      await user.save();
      res.status(200).json("The user has been added to the project...");
    } else {
      res.status(400).json("The user is already in the project...");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const addModerators = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    const user = await User.findById(req.body.userId);
    if (!project.moderators.includes(req.body.userId)) {
      project.moderators.push(req.body.userId);
      user.projects.push(req.params.id);
      await project.save();
      await user.save();
      res.status(200).json("The user has been added to the project...");
    } else {
      res.status(400).json("The user is already in the project...");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const removeModerators = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    const user = await User.findById(req.body.userId);
    if (project.moderators.includes(req.body.userId)) {
      project.moderators = project.moderators.filter(
        (moderator) => moderator !== req.body.userId
      );
      user.projects = user.projects.filter(
        (projectId) => projectId !== req.params.id
      );
      await project.save();
      await user.save();
      res.status(200).json("The user has been removed from the moderators...");
    } else {
      res.status(400).json("The user is not a moderator in the project...");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const removeContributor = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    const user = await User.findById(req.body.userId);
    if (project.contributors.includes(req.body.userId)) {
      project.contributors = project.contributors.filter(
        (contributor) => contributor !== req.body.userId
      );
      user.projects = user.projects.filter(
        (projectId) => projectId !== req.params.id
      );
      await project.save();
      await user.save();
      res
        .status(200)
        .json("The user has been removed from the contributors...");
    } else {
      res.status(400).json("The user is not a contributor in the project...");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const leaveProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    const user = await User.findById(req.body.userId);
    if (project.owners.includes(req.body.userId)) {
      project.owners = project.owners.filter(
        (owner) => owner !== req.body.userId
      );
      user.projects = user.projects.filter(
        (projectId) => projectId !== req.params.id
      );
      await project.save();
      await user.save();
      res.status(200).json("The user has left the project...");
    } else if (project.contributors.includes(req.body.userId)) {
      project.contributors = project.contributors.filter(
        (contributor) => contributor !== req.body.userId
      );
      user.projects = user.projects.filter(
        (projectId) => projectId !== req.params.id
      );
      await project.save();
      await user.save();
      res.status(200).json("The user has left the project...");
    } else if (project.moderators.includes(req.body.userId)) {
      project.moderators = project.moderators.filter(
        (moderator) => moderator !== req.body.userId
      );
      user.projects = user.projects.filter(
        (projectId) => projectId !== req.params.id
      );
      await project.save();
      await user.save();
      res.status(200).json("The user has left the project...");
    } else {
      res.status(400).json("The user is not in the project...");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getProjects,
  getProjectById,
  getProjectsByCategory,
  getProjectsBySkill,
  getProjectsOwnedByUser,
  getProjectsContributedByUser,
  getProjectsModeratedByUser,
  getProjectsBySkills,
  getSuitableProjectsForUser,
  createProject,
  updateProject,
  deleteProject,
  addOwners,
  addContributors,
  addModerators,
  removeModerators,
  removeContributor,
  leaveProject,
};
