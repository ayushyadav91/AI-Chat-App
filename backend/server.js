import "dotenv/config";

import http from "http";
import app from "./app.js";


const server = http.createServer(app);

server.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT || 5000}`);
});