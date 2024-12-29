export async function generateSpeech(text: string) {
  try {
    const response = await fetch('http://localhost:5000/generate-sfx', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to generate speech');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error generating speech:', error);
    throw error;
  }
}
