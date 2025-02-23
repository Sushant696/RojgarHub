import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import config from "../config/index.js";
import path from "path";

cloudinary.config({
  cloud_name: config.cloudinary.cloud_name,
  api_key: config.cloudinary.api_key,
  api_secret: config.cloudinary.api_secret,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    const fileExtension = path.extname(localFilePath).toLowerCase();
    const isPDF = fileExtension === ".pdf";

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: isPDF ? "raw" : "auto",
    });

    fs.unlinkSync(localFilePath);

    return response;
  } catch (error) {
    console.error(`Error uploading file to Cloudinary: ${error.message}`);

    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }
    return null;
  }
};

export { uploadOnCloudinary };
