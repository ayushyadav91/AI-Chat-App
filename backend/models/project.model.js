import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
     name:{
          type:String,
          lowercase:true,
          required:true,
          unique:[true,"Project name must be unique"],
          trim:true,
     },
     users:[
          {
               type:mongoose.Schema.Types.ObjectId,
               ref:"user"
          }
     ],
});

const Project = mongoose.model("Project", projectSchema);
export default Project;
     