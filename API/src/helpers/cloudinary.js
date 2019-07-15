import { config } from "dotenv";
import cloudinary from "cloudinary";
import cloudinaryStorage from "multer-storage-cloudinary";

config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// configure cloud storage
const store = cloudinaryStorage({
  cloudinary,
  allowedFormats: ["jpg", "png"],
  format: "png",
  folder: "properties/images"
});

export default store;
