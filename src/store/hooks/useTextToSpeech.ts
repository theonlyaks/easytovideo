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
  const userId = auth.currentUser?.uid || '';

  const { isUploading, isAdded, handleToggleUpload } = useAudioManagement(
    audioFile ? [audioFile] : [],
    userId
  );

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
        fileName: `speech_${Date.now()}.mp3`
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
    isUploading,
    isAdded,
    handleToggleUpload,
    handleGenerate,
  };
};
