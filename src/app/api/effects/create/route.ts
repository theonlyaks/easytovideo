import { NextRequest, NextResponse } from 'next/server';
import { EffectsService } from '@/services/studio/effects';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth" 
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email || !session?.user?.id) {
        return NextResponse.json({
            error: 'Please sign in to continue.',
        }, { status: 401 });
    }

    const { projectId } = await req.json();

    const result = await EffectsService.processProject(projectId);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process project' }, { status: 500 });
  }
}
