import { useState } from 'react';

interface DownloadOptions {
  fileName?: string;
  fileType?: string;
}

export function useFileDownload() {
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const downloadFile = async (url: string, options: DownloadOptions = {}) => {
    if (!url) return;
    
    setIsDownloading(true);
    setError(null);

    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = options.fileName || 'download';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(downloadUrl);
      document.body.removeChild(a);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Download failed'));
      console.error('Error downloading file:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  return {
    downloadFile,
    isDownloading,
    error
  };
}
