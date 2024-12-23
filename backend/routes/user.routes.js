import {Router} from "express";
import * as userController from "../controllers/user.controller.js";
import {body} from "express-validator";
import * as authMiddleware from "../middleware/auth.middleware.js";

const userRouter = Router();

userRouter.post("/register",
     body("email").isEmail().withMessage("Please enter a valid email"),
     body("password").isLength({min:3}).withMessage("Password must be at least 3 characters long"),
     userController.createUserController);
userRouter.post("/login",
     body("email").isEmail().withMessage("Please enter a valid email"),
     body("password").isLength({min:3}).withMessage("Password must be at least 3 characters long"),
     userController.loginUserController);

userRouter.get("/profile",
     authMiddleware.authUser,
     userController.profileUserController);

userRouter.get("/logout", authMiddleware.authUser, userController.logoutUserController);

export default userRouter;
