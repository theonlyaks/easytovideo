import { useState, useEffect } from 'react';
import { useAudioManagement } from '@/store';
import { auth } from '@/lib/common/firebase';
import { 
  generateTextToSpeech, 
  revokeAudioUrl, 
  createAudioUrl 
} from '@/services/studio/audio';

export const useTextToSpeech = () => {
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [audioFile, setAudioFile] = useState<{ url: string; fileName: string } | null>(null);
  const [generatedFileName, setGeneratedFileName] = useState<string | null>(null);
  const userId = auth.currentUser?.uid || '';

  const { 
    isUploading, 
    isAdded, 
    handleToggleUpload,
    generatedFileNames 
  } = useAudioManagement(
    audioFile ? [audioFile] : [],
    userId
  );

  // Update generated filename when received from useAudioManagement
  useEffect(() => {
    if (generatedFileNames?.[0]) {
      setGeneratedFileName(generatedFileNames[0]);
    }
  }, [generatedFileNames]);

  useEffect(() => {
    return () => {
      if (audioUrl) {
        revokeAudioUrl(audioUrl);
      }
    };
  }, [audioUrl]);

  useEffect(() => {
    if (audioUrl) {
      setAudioFile({
        url: audioUrl,
        fileName: `${text.replace(/[^a-zA-Z]/g, '').slice(0, 25)}.mp3`
      });
    } else {
      setAudioFile(null);
    }
  }, [audioUrl]);

  const handleGenerate = async (voiceId: string) => {
    if (!text || !voiceId) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Clear previous audio URL
      setAudioUrl(null);
      if (audioUrl) {
        revokeAudioUrl(audioUrl);
      }
      
      const audioBlob = await generateTextToSpeech(text, {
        voiceId,
      });
      const newUrl = createAudioUrl(audioBlob);
      setAudioUrl(newUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate speech');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    text,
    setText,
    isLoading,
    error,
    audioUrl,
    isUploading: isUploading[0],
    isAdded: isAdded[0],
    generatedFileName,
    handleToggleUpload: () => handleToggleUpload(0),
    handleGenerate,
  };
};
