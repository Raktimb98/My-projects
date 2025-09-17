import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadWithRetry = async (localPath, opts = {}, attempts = 3) => {
  let lastErr;
  for (let i = 0; i < attempts; i++) {
    try {
      return await cloudinary.uploader.upload(localPath, { resource_type: 'auto', ...opts });
    } catch (e) {
      if (e?.http_code >= 500 && e?.http_code < 600) {
        lastErr = e;
        await new Promise(r => setTimeout(r, 500 * (i + 1)));
        continue;
      }
      throw e;
    }
  }
  throw lastErr;
};

export const uploadToCloudinary = async (localFilePath) => {
  if (!localFilePath || !fs.existsSync(localFilePath)) return null;
  try {
    const result = await uploadWithRetry(localFilePath);
    console.log('Cloudinary upload result:', result?.secure_url);
    return result.secure_url;
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw error;
  } finally {
    try { fs.unlinkSync(localFilePath); } catch {}
  }
};

