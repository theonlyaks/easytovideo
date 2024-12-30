import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '@/lib/common/firebase';
import { UploadProgress, UploadConfig } from '@/types/interfaces/upload';
import { generateFileName } from '@/lib/common/upload';

export const uploadVideo = (
  file: File,
  config: UploadConfig,
  onProgress: (progress: UploadProgress) => void,
  onCancel: (uploadTask: any) => void  // Add cancel callback
): Promise<string> => {
  return new Promise((resolve, reject) => {
    console.log('Upload service - Starting upload');
    console.log('File details:', {
      name: file.name,
      type: file.type,
      size: file.size,
      path: config.path
    });

    const fileName = generateFileName(file);
    const storageRef = ref(storage, `${config.path}/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    
    // Pass uploadTask to cancel callback
    onCancel(uploadTask);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Firebase progress:', progress);
        onProgress({
          progress,
          bytesTransferred: snapshot.bytesTransferred,
          totalBytes: snapshot.totalBytes,
          state: 'running'
        });
      },
      (error) => {
        console.error('Firebase upload error:', error);
        reject(error);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          console.log('Upload complete, download URL:', downloadURL);
          resolve(downloadURL);
        } catch (error) {
          console.error('Error getting download URL:', error);
          reject(error);
        }
      }
    );
  });
};
