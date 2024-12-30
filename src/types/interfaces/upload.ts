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
}

export interface UploadState extends UploadProgress {
  file: File | null;
  url: string | null;
  error: string | null;
}
