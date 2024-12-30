import { useState } from 'react';
import { uploadAudio, removeAudio } from '@/services/studio/audio';

export function useAudioManagement(audioUrls: string[]) {
  const [isUploading, setIsUploading] = useState<boolean[]>([]);
  const [isAdded, setIsAdded] = useState<boolean[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<Array<{ id: string } | null>>([]);

  const handleUpload = async (index: number) => {
    try {
      if (!audioUrls[index]) return;

      const newIsUploading = [...isUploading];
      newIsUploading[index] = true;
      setIsUploading(newIsUploading);

      const result = await uploadAudio(audioUrls[index]!);

      const newIsAdded = [...isAdded];
      newIsAdded[index] = true;
      setIsAdded(newIsAdded);

      const newUploadedFiles = [...uploadedFiles];
      newUploadedFiles[index] = { id: result.id };
      setUploadedFiles(newUploadedFiles);
    } catch (error) {
      console.error("Error uploading audio:", error);
    } finally {
      const newIsUploading = [...isUploading];
      newIsUploading[index] = false;
      setIsUploading(newIsUploading);
    }
  };

  const handleToggleUpload = async (index: number) => {
    const newIsUploading = [...isUploading];
    newIsUploading[index] = true;
    setIsUploading(newIsUploading);

    try {
      if (isAdded[index] && uploadedFiles[index]) {
        await removeAudio(uploadedFiles[index]!.id);

        const newIsAdded = [...isAdded];
        newIsAdded[index] = false;
        setIsAdded(newIsAdded);

        const newUploadedFiles = [...uploadedFiles];
        newUploadedFiles[index] = null;
        setUploadedFiles(newUploadedFiles);
      } else {
        await handleUpload(index);
      }
    } catch (error) {
      console.error("Error toggling audio:", error);
    } finally {
      const finalIsUploading = [...isUploading];
      finalIsUploading[index] = false;
      setIsUploading(finalIsUploading);
    }
  };

  return {
    isUploading,
    isAdded,
    handleToggleUpload
  };
}
