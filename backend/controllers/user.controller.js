import * as userService from "../services/user.service.js";
import userModel from "../models/user.model.js";
import {validationResult} from "express-validator";
import redisClient from "../services/redis.service.js";

export const createUserController = async (req, res) => {
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array(), message: "Invalid input" });
     }
     try {
          const user = await userService.createUser(req.body);
          // {
          //      email:req.body.email,
          //      password:req.body.password,
          // });
        
          const token = user.generateJWT();
     
           delete user._doc.password;

          res.status(201).json({user,token});
     } catch (error) {
          res.status(400).json(error.message);
     }
};

export const loginUserController = async (req, res) => {
     
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
             return res.status(400).json(errors.array());
        }
        try { 
          const {email,password} = req.body;
          
             const user = await userModel.findOne({email}).select("+password");
             if (!user) {
                  return res.status(400).json("User not found");
             }
          //    if (!await user.isValidPassword(req.body.password)) {
          //         return res.status(400).json("Invalid password");
          //    }
          const isMatch = await user.isValidPassword(password);
          if (!isMatch) {
               return res.status(400).json("Invalid password");
          }

             const token = await user.generateJWT();

             res.status(200).json({user,token});
        } catch (error) {
             res.status(400).json(error.message);
        }
     };

export const profileUserController = async (req, res) => {
     res.status(200).json({user:req.user});
}

export const logoutUserController = async (req, res) => {
     try {
          const token = req.cookies.token || req.headers.authorization.split(" ")[1]; 
          
          redisClient.set(token, "logout", "EX", 60 * 60 * 24);
          res.status(200).json({message:"Logged out successfully"});
          
     } catch (error) {
          res.status(400).json(error.message);
     }
};
