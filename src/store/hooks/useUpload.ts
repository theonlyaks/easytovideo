import { useState, useCallback, useRef } from 'react';
import { UploadState, UploadConfig } from '@/types/interfaces/upload';
import { uploadVideo } from '@/services/studio/upload';
import { validateFile } from '@/lib/common/upload';
import { UPLOAD_ERROR_MESSAGES, getUploadConfig } from '@/constants/types/upload';
import { useSetAtom } from 'jotai';
import { fileListRefreshAtom } from '../atoms/fileAtoms';

export const useUpload = (userId: string) => {
  const [state, setState] = useState<UploadState>({
    file: null,
    progress: 0,
    bytesTransferred: 0,
    totalBytes: 0,
    state: 'paused', // Changed from 'running' to 'paused'
    url: null,
    error: null
  });
  const uploadTaskRef = useRef<any>(null);
  const setFileListRefresh = useSetAtom(fileListRefreshAtom);

  const cancelUpload = useCallback(() => {
    if (uploadTaskRef.current) {
      uploadTaskRef.current.cancel();
      setState(prev => ({
        ...prev,
        state: 'paused',
        error: null
      }));
    }
  }, []);

  const startUpload = useCallback(async (file: File) => {
    if (!userId) {
      console.error('No user ID provided');
      setState(prev => ({ 
        ...prev, 
        error: 'Authentication required',
        state: 'error'
      }));
      return;
    }

    console.log('Starting upload process for user:', userId);
    const config = getUploadConfig(userId);
    const error = validateFile(file, config);
    if (error) {
      console.log('Validation error:', error);
      setState(prev => ({ ...prev, error }));
      return;
    }

    setState(prev => ({ ...prev, file, error: null, state: 'running' }));

    try {
      console.log('Initiating upload to Firebase with config:', config);
      const url = await uploadVideo(
        file, 
        config, 
        (progress) => {
          console.log('Upload progress:', progress);
          setState(prev => ({ ...prev, ...progress }));
        },
        (uploadTask) => {
          uploadTaskRef.current = uploadTask;
        }
      );
      console.log('Upload completed, URL:', url);
      setState(prev => ({ ...prev, url, state: 'success' }));
      setFileListRefresh(prev => prev + 1); // Trigger refresh after successful upload
    } catch (error) {
      console.error('Upload error:', error);
      setState(prev => ({ 
        ...prev, 
        error: UPLOAD_ERROR_MESSAGES.UPLOAD_FAILED,
        state: 'error'
      }));
    }
  }, [userId, setFileListRefresh]);

  return { ...state, startUpload, cancelUpload };
};
