import mongoose from "mongoose"

async function connection() {
  const uri = process.env.URI
  try {
    await mongoose.connect(uri);
    console.log("Mongodb connected successfully");
  } catch (error) {
    console.log("Mongodb connection failed.")
    throw error;
  }

}

export default connection;
