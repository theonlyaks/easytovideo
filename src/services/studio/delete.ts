import { deleteObject, ref } from 'firebase/storage';
import { storage } from '@/lib/common/firebase';
import { getUploadConfig } from '@/constants';
import { MediaType } from '@/types';

export const deleteFile = async (fileName: string, userId: string, type: MediaType) => {
  try {
    const config = getUploadConfig(userId, type);
    const filePath = `${config.path}/${fileName}`;
    const fileRef = ref(storage, filePath);
    await deleteObject(fileRef);
    return true;
  } catch (error) {
    throw error;
  }
};
