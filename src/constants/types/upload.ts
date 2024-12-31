import { UploadConfig, MediaType } from '@/types';

export const getUploadConfig = (userId: string, type: MediaType): UploadConfig => {
  const configs: Record<MediaType, Omit<UploadConfig, 'type'>> = {
    video: {
      allowedTypes: ['video/mp4', 'video/quicktime', 'video/x-msvideo'],
      maxSizeInMB: 100,
      path: `user_video_uploads/${userId}`
    },
    audio: {
      allowedTypes: ['audio/mpeg', 'audio/wav', 'audio/ogg'],
      maxSizeInMB: 50,
      path: `user_audio_exports/${userId}`
    }
  };

  return {
    ...configs[type],
    type
  };
};

export const UPLOAD_ERROR_MESSAGES = {
  INVALID_TYPE: 'Invalid file type. Please upload a valid video file.',
  FILE_TOO_LARGE: 'File size exceeds the maximum limit.',
  UPLOAD_FAILED: 'Upload failed. Please try again.'
};
