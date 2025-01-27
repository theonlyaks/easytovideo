import { useState, useCallback } from 'react';
import { deleteFile } from '@/services/studio/delete';
import { MediaType } from '@/types';

export const useDeleteUpload = (userId: string, type: MediaType) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteUpload = useCallback(async (fileName: string) => {
    setIsDeleting(true);
    setError(null);
    try {
      await deleteFile(fileName, userId, type);
      return true;
    } catch (error) {
      setError('Failed to delete file');
      return false;
    } finally {
      setIsDeleting(false);
    }
  }, [userId, type]);

  return { deleteUpload, isDeleting, error };
};
