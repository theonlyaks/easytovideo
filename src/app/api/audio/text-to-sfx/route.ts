import { API_ENDPOINTS } from '@/constants';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
    try {
      const requestData = await request.json();
      
      const response = await fetch(`${API_ENDPOINTS.BACKEND_URL}api/v1/audio_ai/generate-sfx`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error('Backend service failed');
      }
      
      const audioBlob = await response.blob();
      const headers = new Headers();
      headers.set('Content-Type', 'audio/mpeg');

      return new Response(audioBlob, {
        status: 200,
        headers,
      });
      
    } catch (error) {
      return Response.json(
        { error: error instanceof Error ? error.message : 'Unknown error' }, 
        { status: 500 }
      );
    }
}
