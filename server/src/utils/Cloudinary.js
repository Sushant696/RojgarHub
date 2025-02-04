import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import config from "../config/index.js";

cloudinary.config({
  cloud_name: config.cloudinary.cloud_name,
  api_key: config.cloudinary.api_key,
  api_secret: config.cloudinary.api_secret,
});

// Upload file to Cloudinary
const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    console.log(`File uploaded successfully: ${response.url}`);

    // Delete the local file after upload
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    console.error(`Error uploading file to Cloudinary: ${error.message}`);

    // Delete the local file if upload fails
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }
    return null;
  }
};

export { uploadOnCloudinary };
