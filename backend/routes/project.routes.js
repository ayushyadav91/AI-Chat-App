import {Router} from "express";
import { body } from "express-validator";
import * as projectController from "../controllers/project.controller.js";
import * as authMiddleware from "../middleware/auth.middleware.js";


const projectRouter = Router();


projectRouter.post("/create",
     authMiddleware.authUser,
     body("name").isString().withMessage("Name must be required"),
     projectController.createProject);

projectRouter.get("/all", authMiddleware.authUser, projectController.getAllProject);

projectRouter.put("/add-user",
     authMiddleware.authUser,
     body("projectId").isString().withMessage("Project ID must be a string").bail(),
     body("users").isArray({ min: 1 }).withMessage("Users must be an array of strings").bail()
          .custom((users) => users.every(user => typeof user === 'string')).withMessage("Each user must be a string"),
     projectController.addUserToProject);
    

projectRouter.get("/get-project/:projectId", authMiddleware.authUser, projectController.getProjectById);


export default projectRouter;