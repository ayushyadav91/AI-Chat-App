import projectModel from "../models/project.model.js"
import userModel from "../models/user.model.js"
import * as projectService from '../services/project.service.js'
import { validationResult } from "express-validator"



export const createProject = async(req ,res)=>{
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    try{
    const {name} = req.body;
    const loggedUser = await userModel.findOne({email:req.user.email});
    const userId = loggedUser._id;

    const newProject = await projectService.createProject({name,userId});

    return res.status(201).json(newProject);
    }catch(error){
        console.log(error);
        return res.status(400).json(error.message);
    }
}

export const getAllProject = async (req, res) => {
    try {
        const loggedInUser =  await userModel.findOne({email:req.user.email});

        const allUserProjects = await projectService.getAllProjectByUserId({userId:loggedInUser._id});
        return res.status(200).json({projects:allUserProjects});
    } catch (error) {
        console.log(error);
        return res.status(400).json({error:error.message});
    }
}

export const addUserToProject = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    try {
        const {projectId,users} = req.body;
        const loggedInUser = await userModel.findOne({email:req.user.email});
        const project = await projectService.addUserToProject({projectId,users,userId:loggedInUser._id});
        return res.status(200).json({project});
    } catch (error) {
        console.log(error);
        return res.status(400).json({error:error.message});
    }
}