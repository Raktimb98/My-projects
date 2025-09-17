import multer from 'multer';
import path from 'path';
import fs from 'fs';

const uploadDir = path.join(process.cwd(), 'Backend', 'Public', 'temp');
fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, uploadDir); // absolute, valid, exists
  },
  filename(req, file, cb) {
    cb(null, file.originalname); // or a unique name
  },
});

export const upload = multer({ storage });
