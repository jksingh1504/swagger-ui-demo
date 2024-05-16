import { v2 as cloudinary } from "cloudinary";
import { CustomError } from "../middlewares/error";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

// Use the uploaded file's name as the asset's public ID and
// allow overwriting the asset with new versions
const options = {
  use_filename: true,
  unique_filename: false,
  overwrite: true,
  folder: "ecommerce",
};

const uploadImage = async (imagePath: any) => {
  try {
    const result = await cloudinary.uploader.upload(imagePath, options);
    return result;
  } catch (error) {
    throw error;
  }
};

export default uploadImage;
