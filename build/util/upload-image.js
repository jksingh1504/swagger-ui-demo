"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
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
const uploadImage = async (imagePath) => {
    try {
        const result = await cloudinary_1.v2.uploader.upload(imagePath, options);
        return result;
    }
    catch (error) {
        throw error;
    }
};
exports.default = uploadImage;
