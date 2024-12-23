import jwt from "jsonwebtoken";
import redisClient from "../services/redis.service.js";

export const authUser = async (req, res, next) => {
     // const token = req.headers.authorization;
     // if (!token) {
     //      return res.status(401).json({message:"No token provided"});
     // }
     // try {
     //      const decoded = jwt.verify(token, process.env.JWT_SECRET);
     //      req.user = decoded;
     //      next();
     // } catch (error) {
     //      res.status(401).json({message:"Invalid token"});
     // }
     try{
          // const token = req.header("Authorization").replace("Bearer ","");
          const token = req.cookies.token || req.headers.authorization.split(" ")[1];
          if (!token) {
               return res.status(401).json({message:"No token provided"});
          }
          const isBlackListed = await redisClient.get(token);
          if (isBlackListed) {
               res.cookie("token","");
               return res.status(401).json({message:"Unauthorized Token"});
          }

          const decoded = jwt.verify(token,process.env.JWT_SECRET);
          req.user = decoded;
          next();
     }catch(error){
          res.status(401).json({message:"Unauthorized Token"});
     }
};