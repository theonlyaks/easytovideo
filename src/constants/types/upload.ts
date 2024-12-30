import { UploadConfig } from '@/types/interfaces/upload';

export const getUploadConfig = (userId: string): UploadConfig => ({
  allowedTypes: ['video/mp4', 'video/quicktime', 'video/x-msvideo'],
  maxSizeInMB: 100,
  path: `uploads/${userId}`
});

export const UPLOAD_ERROR_MESSAGES = {
  INVALID_TYPE: 'Invalid file type. Please upload a valid video file.',
  FILE_TOO_LARGE: 'File size exceeds the maximum limit.',
  UPLOAD_FAILED: 'Upload failed. Please try again.'
};
