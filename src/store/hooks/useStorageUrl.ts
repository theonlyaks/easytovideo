import { useState, useEffect } from 'react';
import { FirebaseStorageService } from '@/services/firebase/storage';

interface UseStorageUrlResult {
  url: string;
  loading: boolean;
  error: Error | null;
}

export function useStorageUrl(path: string | null): UseStorageUrlResult {
  const [url, setUrl] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!path) return;

    async function fetchUrl() {
      try {
        setLoading(true);
        setError(null);
        const downloadUrl = await FirebaseStorageService.getDownloadUrl(path||'');
        console.log('Download URL:', downloadUrl);
        setUrl(downloadUrl);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch URL'));
        console.error('Error fetching storage URL:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchUrl();
  }, [path]);

  return { url, loading, error };
}
