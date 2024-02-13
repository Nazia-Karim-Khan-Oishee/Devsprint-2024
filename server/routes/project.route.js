const express = require("express");
const projectController = require("../controllers/project.controller");
const router = express.Router();

router.get("/", projectController.getProjects);
router.get("/:id", projectController.getProjectById);
router.get("/category", projectController.getProjectsByCategory);
router.get("/skill", projectController.getProjectsBySkill);
router.get("/owned/:id", projectController.getProjectsOwnedByUser);
router.get("/contributed", projectController.getProjectsContributedByUser);
router.get("/moderated", projectController.getProjectsModeratedByUser);
router.get("/skills", projectController.getProjectsBySkills);
router.get("/suitable/:id", projectController.getSuitableProjectsForUser);
router.post("/addProject", projectController.createProject);
router.put("/:id", projectController.updateProject);
router.delete("/:id", projectController.deleteProject);
router.post("/:id/owners", projectController.addOwners);
router.post("/:id/contributors", projectController.addContributors);
router.post("/:id/moderators", projectController.addModerators);
router.delete("/:id/moderators", projectController.removeModerators);
router.delete("/:id/contributors", projectController.removeContributor);
router.delete("/:id/leave", projectController.leaveProject);

module.exports = router;
