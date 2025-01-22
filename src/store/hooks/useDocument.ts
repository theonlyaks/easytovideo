import { useState, useEffect } from 'react';
import { FirebaseDocumentService } from '@/services/firebase/document';

export function useDocument<T>(collectionName: string, documentId: string | null) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!documentId) {
      setLoading(false);
      return;
    }

    async function fetchDocument() {
      try {
        const result = await FirebaseDocumentService.getDocumentById<T>(collectionName, documentId || '');
        setData(result);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
        setData(null);
      } finally {
        setLoading(false);
      }
    }

    fetchDocument();
  }, [collectionName, documentId]);

  return { data, loading, error };
}
