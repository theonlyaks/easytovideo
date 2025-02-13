import { UploadConfig } from '@/types/interfaces/upload';
import { UPLOAD_ERROR_MESSAGES } from '@/constants/types/upload';

export const validateFile = (file: File, config: UploadConfig): string | null => {
  // console.log('Validating file:', {
  //   type: file.type,
  //   size: file.size,
  //   allowedTypes: config.allowedTypes,
  //   maxSize: config.maxSizeInMB * 1024 * 1024
  // });

  if (!config.allowedTypes.includes(file.type)) {
    // console.log('File type validation failed');
    return UPLOAD_ERROR_MESSAGES.INVALID_TYPE;
  }

  if (file.size > config.maxSizeInMB * 1024 * 1024) {
    // console.log('File size validation failed');
    return UPLOAD_ERROR_MESSAGES.FILE_TOO_LARGE;
  }

  // console.log('File validation passed');
  return null;
};

export const generateFileName = (file: File): string => {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 8);
  const nameWithoutExtension = file.name.split('.').slice(0, -1).join('.');
  const extension = file.name.split('.').pop();
  return `${nameWithoutExtension}-${timestamp}-${randomString}.${extension}`;
};
