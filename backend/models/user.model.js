import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const userSchema = new mongoose.Schema({
     email:{
          type:String,
          required:true,
          unique:true,
          trim:true,
          lowercase:true,
          minLength:[6,"Email must be at least 6 characters long"],
          maxLength:[50,"Email must be less than 50characters long"],
     },
     password:{
          type:String,
          select:false, //this will not return password when we get user data on frontend
     },
});

userSchema.statics.hashPassword = async function (password) {
     console.log(password);
     return await bcrypt.hash(password, 10);
}
userSchema.methods.isValidPassword = async function (password) {
     console.log(this.password);
     return await bcrypt.compare(password, this.password);
}
userSchema.methods.generateJWT = function () {
     console.log(this.email);
     return jwt.sign({email:this.email},process.env.JWT_SECRET,{expiresIn:'24h'});
}


const User = mongoose.model("User",userSchema);
export default User;



// userSchema.methods.generateJWT = function () {
//      return jwt.sign(
//           {
//                _id:this._id,
//                email:this.email,
//                name:this.name,
//                role:this.role,
//           },
//           process.env.JWT_SECRET,
//           {
//                expiresIn:3600,
//           }
//      );
// }
