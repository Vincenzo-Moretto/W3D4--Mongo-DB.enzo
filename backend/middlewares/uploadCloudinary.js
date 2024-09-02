import "dotenv/config";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary, //utilizza la libreria importata a riga 3
  params: {
    folder: "epicode",
  },
});

const uploadCloudinary = multer({ storage: storage }); //storage key è da documentazione, il secondo storage è la variabile

export default uploadCloudinary;
