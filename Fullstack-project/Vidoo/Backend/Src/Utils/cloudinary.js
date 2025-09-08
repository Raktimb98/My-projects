import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    //Upload the file on cloudinary
    const result = await cloudinary.uploader.upload(localFilePath, {
      resource_type: 'auto',
      // folder: 'your_folder_name',
    });
    console.log('Cloudinary upload result:', result.url);
    return result.secure_url;
  } catch (error) {
    fs.unlinkSync(localFilePath);
    console.error('Error uploading to Cloudinary:', error);
    throw error;
  }
};

export { uploadToCloudinary };
