import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email || !session?.user?.id) {
      return NextResponse.json({
        error: 'Please sign in to continue.',
      }, { status: 401 });
    }

    const { projectId } = await req.json();


    // Call the whisper transcribe endpoint
    // const response = await fetch(`${process.env.BACKEND_URL}api/v1/whisper/transcribe`, {
    const response = await fetch('https://whisper-ai-a2b3b1d.app.beam.cloud' , {
    method: 'POST',
      headers: {
        "Authorization": "Bearer REDACTED_BEAM_TOKEN==",
        "Connection": "keep-alive",
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ projectId }),
    });

    if (!response.ok) {
      throw new Error('Failed to start transcription');
    }

    const result = await response.json();
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Failed to process transcription:', error);
    return NextResponse.json({ 
      error: 'Failed to process transcription', 
      detail: error 
    }, { status: 500 });
  }
}
