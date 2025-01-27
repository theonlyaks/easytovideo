import { NextRequest, NextResponse } from 'next/server';
import { EffectsService } from '@/services/studio/effects';

export async function POST(req: NextRequest) {
  try {
    const { projectId } = await req.json();

    const result = await EffectsService.processProject(projectId);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process project' }, { status: 500 });
  }
}
