import { ref, listAll, getMetadata, getDownloadURL } from 'firebase/storage';
import { storage } from '@/lib/common/firebase';
import { FileItem } from '@/types/interfaces/common';

export const getUserFiles = async (userId: string): Promise<FileItem[]> => {
  try {
    const storageRef = ref(storage, `uploads/${userId}`);
    const result = await listAll(storageRef);
    
    const filesPromises = result.items.map(async (item) => {
      const metadata = await getMetadata(item);
      const downloadUrl = await getDownloadURL(item);
      
      return {
        id: item.name,
        fileName: item.name,
        fileUrl: downloadUrl,
        createdAt: new Date(metadata.timeCreated),
        fileSize: metadata.size,
        fileType: metadata.contentType || 'unknown'
      };
    });

    const files = await Promise.all(filesPromises);
    return files.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  } catch (error) {
    console.error('Error loading files:', error);
    throw error;
  }
};
