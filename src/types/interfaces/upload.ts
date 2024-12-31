export type MediaType = 'video' | 'audio';

export interface UploadProgress {
  progress: number;
  bytesTransferred: number;
  totalBytes: number;
  state: 'paused' | 'running' | 'error' | 'success'; // Added 'paused' state
}

export interface UploadConfig {
  allowedTypes: string[];
  maxSizeInMB: number;
  path: string;
  type: MediaType;
}

export interface UploadState extends UploadProgress {
  file: File | null;
  url: string | null;
  error: string | null;
}

export interface UploadProps {
  userId: string;
  mediaType?: MediaType;
}