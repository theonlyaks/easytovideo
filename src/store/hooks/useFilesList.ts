import { useState, useEffect } from 'react';
import { useAtomValue } from 'jotai';
import { User, FileItem } from '@/types';
import { getUserFiles } from '@/services/studio/file-list';
import { fileListRefreshAtom } from '../atoms/fileAtoms';

export const useFilesList = (user: User | null) => {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const refreshTrigger = useAtomValue(fileListRefreshAtom);

  useEffect(() => {
    if (!user?.id) return;

    const loadFiles = async () => {
      setLoading(true);
      try {
        const fileList = await getUserFiles(user.id);
        setFiles(fileList);
        setError(null);
      } catch (err) {
        console.error('Error loading files:', err);
        setError('Failed to load files');
      } finally {
        setLoading(false);
      }
    };

    loadFiles();
  }, [user, refreshTrigger]);

  return { files, loading, error };
};
