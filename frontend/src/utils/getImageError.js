import { ALLOWED_IMAGE_TYPES, MAX_IMAGE_SIZE } from '../constants/upload';

export const getImageError = (file) => {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return 'Only JPEG, PNG or WebP images are allowed';
  }
  if (file.size > MAX_IMAGE_SIZE) {
    return 'The image must be 2 MB or smaller';
  }
  return null;
};