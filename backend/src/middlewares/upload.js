import multer from 'multer';
import createHttpError from 'http-errors';

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!ALLOWED_TYPES.includes(file.mimetype)) {
      return cb(createHttpError(400, 'Only JPEG, PNG or WebP images are allowed'));
    }
    cb(null, true);
  },
});