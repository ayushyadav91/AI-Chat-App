import mongoose, { mongo } from 'mongoose';
import projectModel from '../models/project.model.js'


export const createProject = async ({
     name,userId
})=>{
     if(!name){
          throw new Error("Name is required")
     }
     if(!userId){
          throw new Error("UserId is required")
     }
 
    

     let project;
     try {
         project = await projectModel.create({
             name,
             users: [ userId ]
         });
     } catch (error) {
         if (error.code === 11000) {
             throw new Error("Project name already exists");
         }
         throw error;
     }
 
return project;
}

export const getAllProjectByUserId = async ({userId}) => {
     if(!userId){
          throw new Error("UserId is required")
     }
    const allUserProjects = await projectModel.find({
        users:userId
        });
    return allUserProjects;
}

export const addUserToProject = async ({projectId,users,userId}) => {
     if(!projectId){
          throw new Error("ProjectId is required")
     }
     if(!mongoose.Types.ObjectId.isValid(projectId)){
          throw new Error("ProjectId is not a valid id")
     }
     if(!users){
          throw new Error("Users is required")
     }
     if(!Array.isArray(users) || users.some(user => !mongoose.Types.ObjectId.isValid(user))){
          throw new Error("Users must be an array of valid ids")
     }
        if(!userId){
            throw new Error("UserId is required")
        }
        if(!mongoose.Types.ObjectId.isValid(userId)){
            throw new Error("UserId is not a valid id")
        }
     const project = await projectModel.findOne({
         _id:projectId,
         users:userId.toString()
     })
     if(!project){
         throw new Error("User not belong to this project")
     }
    
     const updatedProject = await projectModel.findByIdAndUpdate({
         _id:projectId
         },{
             $push:{
                 users:{
                     $each:users
                 }
             }
         },
         {
             new:true
         }
     )
    return updatedProject;

    
}
    
