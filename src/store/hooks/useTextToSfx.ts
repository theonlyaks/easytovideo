import { useState, useEffect } from 'react';
import { generateTextToSfx } from '@/services/studio/audio';
import { TOTAL_TEXT_TO_SFX_PARALLEL_REQUEST_COUNT } from '@/constants';

export function useTextToSfx() {
    const [text, setText] = useState('');
    const [duration, setDuration] = useState(8);
    const [isAutoDuration, setIsAutoDuration] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [audioUrls, setAudioUrls] = useState<Array<string | null>>([]);
    const [error, setError] = useState<string | null>(null);
    const [totalVariations, setTotalVariations] = useState(TOTAL_TEXT_TO_SFX_PARALLEL_REQUEST_COUNT);
  
    const handleGenerateTextToSfx = async () => {
      if (!text.trim()) return;
  
      setIsLoading(true);
      setError(null);
  
      // Cleanup previous audio URLs
      audioUrls.forEach(url => {
        if (url) URL.revokeObjectURL(url);
      });
      setAudioUrls([]);
  
      try {
        const options = {
          duration: !isAutoDuration ? duration : undefined,
          isAutoDuration
        };

        // Generate versions based on totalVariations
        const audioPromises = Array(totalVariations).fill(null).map((_, index) => 
          generateTextToSfx(text, { ...options, version: index + 1 })
        );

        const audioBlobs = await Promise.all(audioPromises);
        const urls = audioBlobs.map(blob => URL.createObjectURL(blob));
        setAudioUrls(urls);
      } catch (error) {
        setError('Failed to generate speech');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
  
    useEffect(() => {
      return () => {
        audioUrls.forEach(url => {
          if (url) URL.revokeObjectURL(url);
        });
      };
    }, [audioUrls]);
  
    return {
      text,
      setText,
      duration,
      setDuration,
      isAutoDuration,
      setIsAutoDuration,
      isLoading,
      audioUrls,
      error,
      handleGenerateTextToSfx,
      totalVariations,
      setTotalVariations
    };
}