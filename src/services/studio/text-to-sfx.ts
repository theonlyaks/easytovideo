import { GenerateSpeechOptions } from '@/types';

export async function generateSpeech(text: string, options?: GenerateSpeechOptions) {
  try {
    const response = await fetch('http://localhost:5000/generate-sfx', {
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
      throw new Error('Failed to generate speech');
    }
    const audioBlob = await response.blob();
    return audioBlob;
  } catch (error) {
    console.error('Error generating speech:', error);
    throw error;
  }
}
