import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '@/lib/common/firebase';
import { UploadConfig, UploadProgress } from '@/types/interfaces/upload';

const mapFirebaseState = (state: string): 'paused' | 'running' | 'error' | 'success' => {
  switch (state) {
    case 'paused':
      return 'paused';
    case 'running':
      return 'running';
    case 'error':
      return 'error';
    case 'success':
      return 'success';
    default:
      return 'running';
  }
};

export const uploadVideo = async (
  file: File,
  config: UploadConfig,
  onProgress?: (progress: UploadProgress) => void,
  onTaskCreated?: (task: any) => void
) => {
  const storageRef = ref(storage, `${config.path}/${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  if (onTaskCreated) {
    onTaskCreated(uploadTask);
  }

  return new Promise<string>((resolve, reject) => {
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        if (onProgress) {
          onProgress({
            progress: (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
            bytesTransferred: snapshot.bytesTransferred,
            totalBytes: snapshot.totalBytes,
            state: mapFirebaseState(snapshot.state)
          });
        }
      },
      (error) => {
        reject(error);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        } catch (error) {
          reject(error);
        }
      }
    );
  });
};
