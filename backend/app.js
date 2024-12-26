
import express from "express";
import morgan from "morgan";
import connectDB from "./db/database.js";
import userRouter from "./routes/user.routes.js";
import projectRouter from "./routes/project.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

connectDB();
// App Config
const app = express();



// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());





app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Routes
app.use("/users",userRouter);
app.use("/projects",projectRouter);

export default app;

