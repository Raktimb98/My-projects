// src/Utils/deletePreviousImage.js
import { v2 as cloudinary } from 'cloudinary';

export async function deletePreviousImage(publicId) {
  if (!publicId) return { skipped: true };
  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      invalidate: true,
      resource_type: 'image',
      type: 'upload',
    });

    return result;
  } catch (err) {
    console.error('Cloudinary destroy failed:', err);
    return { error: err.message };
  }
}

export function extractPublicIdFromUrl(url) {
  try {
    const u = new URL(url);
    const parts = u.pathname.split('/');
    const lastUploadIdx = parts.lastIndexOf('upload');
    const after = parts.slice(lastUploadIdx + 1);
    const withoutVersion = after[0]?.startsWith('v') ? after.slice(1) : after;
    const pathNoExt = withoutVersion.join('/').replace(/\.[^/.]+$/, '');
    return decodeURIComponent(pathNoExt);
  } catch {
    return null;
  }
}
