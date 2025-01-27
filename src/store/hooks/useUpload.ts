import { useState, useCallback, useRef } from 'react';
import { UploadState, MediaType } from '@/types';
import { uploadVideo } from '@/services/studio/upload';
import { validateFile } from '@/lib/common/upload';
import { UPLOAD_ERROR_MESSAGES, getUploadConfig } from '@/constants';
import { useSetAtom } from 'jotai';
import { fileListRefreshAtom } from '@/store';

export const useUpload = (userId: string, mediaType: MediaType = 'video', source: string = 'upload') => {
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

    const config = getUploadConfig(userId, mediaType);
    const error = validateFile(file, config);
    if (error) {
      setState(prev => ({ ...prev, error }));
      return;
    }

    const timestamp = Date.now();
    const fileName = `${file.name.split('.')[0]}_@1_${timestamp}_@1_${mediaType}_@1_${source}.${file.name.split('.').pop()}`;

    setState(prev => ({ ...prev, file: { ...file, name: fileName }, error: null, state: 'running' }));

    try {
      const url = await uploadVideo(
        new File([file], fileName, { type: file.type }), 
        config, 
        (progress) => {
          console.log('Upload progress:', progress);
          setState(prev => ({ ...prev, ...progress }));
        },
        (uploadTask) => {
          uploadTaskRef.current = uploadTask;
        }
      );
      setState(prev => ({ ...prev, url, state: 'success' }));
      setFileListRefresh(prev => prev + 1); 
      return { url, fileName }; // Modified to return fileName as well
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        error: UPLOAD_ERROR_MESSAGES.UPLOAD_FAILED,
        state: 'error'
      }));
    }
  }, [userId, mediaType, source, setFileListRefresh]);

  return { ...state, startUpload, cancelUpload };
};
