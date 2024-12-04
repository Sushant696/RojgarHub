import dotenv from "dotenv"
import connection from "./db/connection.js";
import { app } from "./server.js";

dotenv.config();

(async () => {
  try {
    await connection();
    app.listen(process.env.PORT || 5500, () => {
      console.log("RojgarHub server running at port: 5500")
    })
    // handle errors
    app.on('error', () => {
      console.log("Failed to start the server")
      throw new Error;
    })
  } catch (error) {
    console.error("Failed to start the server:", (error).message);
    process.exit(1);
  }
})()
