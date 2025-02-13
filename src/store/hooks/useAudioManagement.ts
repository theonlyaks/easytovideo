import { useState } from 'react';
import { useDeleteUpload, useUpload} from '@/store';
import { AudioFile} from '@/types';

export function useAudioManagement(audioFiles: AudioFile[], userId: string) {
  const [isUploading, setIsUploading] = useState<boolean[]>([]);
  const [isAdded, setIsAdded] = useState<boolean[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<Array<AudioFile | null>>([]);
  const [generatedFileNames, setGeneratedFileNames] = useState<Array<string | null>>([]);
  
  const { startUpload } = useUpload(userId, 'audio', 'export');
  const { deleteUpload } = useDeleteUpload(userId, 'audio');

  const handleUpload = async (index: number) => {
    try {
      const audioFile = audioFiles[index];
      if (!audioFile) return;

      const newIsUploading = [...isUploading];
      newIsUploading[index] = true;
      setIsUploading(newIsUploading);

      const response = await fetch(audioFile.url);
      const blob = await response.blob();
      const file = new File([blob], audioFile.fileName, { type: 'audio/mpeg' });

      const result = await startUpload(file);
      
      if (!result?.url || !result?.fileName) {
        throw new Error('Upload failed');
      }

      const newIsAdded = [...isAdded];
      newIsAdded[index] = true;
      setIsAdded(newIsAdded);

      const newUploadedFiles = [...uploadedFiles];
      newUploadedFiles[index] = {
        url: result.url,
        fileName: audioFile.fileName 
      };
      setUploadedFiles(newUploadedFiles);

      const newGeneratedFileNames = [...generatedFileNames];
      newGeneratedFileNames[index] = result.fileName;
      setGeneratedFileNames(newGeneratedFileNames);

    } catch (error) {
      //console.error("Error uploading audio:", error);
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
      if (isAdded[index] && generatedFileNames[index]) {
        const deleteSuccess = await deleteUpload(generatedFileNames[index]!);
        
        if (deleteSuccess) {
          const newIsAdded = [...isAdded];
          newIsAdded[index] = false;
          setIsAdded(newIsAdded);

          const newUploadedFiles = [...uploadedFiles];
          newUploadedFiles[index] = null;
          setUploadedFiles(newUploadedFiles);

          const newGeneratedFileNames = [...generatedFileNames];
          newGeneratedFileNames[index] = null;
          setGeneratedFileNames(newGeneratedFileNames);
        }
      } else {
        await handleUpload(index);
      }
    } catch (error) {
      //console.error("Error toggling audio:", error);
    } finally {
      const newIsUploading = [...isUploading];
      newIsUploading[index] = false;
      setIsUploading(newIsUploading);
    }
  };

  return {
    isUploading,
    isAdded,
    handleToggleUpload,
    generatedFileNames  // Added to return value
  };
}
