import { collection, getDocs } from 'firebase/firestore';
import { db,auth } from '@/lib/common/firebase';
import type { AudioLanguageData,AudioVoice } from '@/types';
import { GenerateTextToSfxOptions, GenerateTextToSpeechOptions } from '@/types';
import { uploadAudioFile, removeAudioEntry } from "@/lib/common/storage";

export const revokeAudioUrl = (url: string | null) => {
  if (url) {
    URL.revokeObjectURL(url);
  }
};

export const createAudioUrl = (blob: Blob): string => {
  return URL.createObjectURL(blob);
};

export const validateAudioResponse = (response: Response) => {
  if (!response.ok) {
    throw new Error('Failed to generate speech');
  }

  const contentType = response.headers.get('content-type');
  if (!contentType || !contentType.includes('audio/')) {
    throw new Error('Invalid response format - expected audio content');
  }
};

export const getAudioLanguages = async (): Promise<AudioLanguageData[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, 'audio_language'));
    return querySnapshot.docs.map(doc => doc.data() as AudioLanguageData);
  } catch (error) {
    console.error('Error fetching audio languages:', error);
    return [];
  }
};
export const getAudioVoices = async (): Promise<AudioVoice[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, 'audio_voices'));
    return querySnapshot.docs.map(doc => doc.data() as AudioVoice);
  } catch (error) {
    console.error('Error fetching audio voices:', error);
    return [];
  }
};

export async function generateTextToSfx(text: string, options?: GenerateTextToSfxOptions) {
  try {
    const response = await fetch('/api/audio/text-to-sfx', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        text,
        version: options?.version || 1,
        ...options
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to generate speech');
    }

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('audio/')) {
      throw new Error('Invalid response format - expected audio content');
    }

    const audioBlob = await response.blob();
    return audioBlob;
  } catch (error) {
    console.error('Error generating sfx:', error);
    throw error;
  }
}

export async function generateTextToSpeech(text: string, options?: GenerateTextToSpeechOptions) {
    try {
      const response = await fetch('/api/audio/text-to-speech', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          text,
          ...options
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to generate speech');
      }
  
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('audio/')) {
        throw new Error('Invalid response format - expected audio content');
      }
  
      const audioBlob = await response.blob();
      return audioBlob;
    } catch (error) {
      console.error('Error generating speech:', error);
      throw error;
    }
  }
    
  export async function uploadAudio(audioUrl: string) {
    if (!auth.currentUser) {
      throw new Error("Please sign in to upload audio");
    }
  
    const response = await fetch(audioUrl);
    const audioBlob = await response.blob();
    return await uploadAudioFile(audioBlob);
  }
  
  export async function removeAudio(audioId: string) {
    return await removeAudioEntry(audioId);
  }
