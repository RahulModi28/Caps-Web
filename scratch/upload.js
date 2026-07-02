const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
const path = require("path");

// Load .env.local from the workspace
dotenv.config({ path: path.resolve(__dirname, "../.env.local") });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const filePath = "/Users/rahulmodi/Downloads/DSC_3324.JPG";

console.log("Uploading file to Cloudinary...");
console.log("File path:", filePath);

cloudinary.uploader.upload(
  filePath,
  {
    public_id: "haran-rp",
    folder: "caps-website",
    overwrite: true,
    invalidate: true,
  },
  (error, result) => {
    if (error) {
      console.error("Upload failed:", error);
      process.exit(1);
    } else {
      console.log("Upload successful!");
      console.log("Public ID:", result.public_id);
      console.log("Secure URL:", result.secure_url);
      process.exit(0);
    }
  }
);
