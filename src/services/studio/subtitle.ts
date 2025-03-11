import { Project } from '@/types';
import { ProjectService } from './projects';

export class SubtitleService {
  static async startTranscription(projectId: string) {
    const response = await fetch('/api/subtitle/transcribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ projectId }),
    });

    if (!response.ok) {
      throw new Error('Failed to start transcription');
    }

    return await response.json();
  }

  static async createSubtitleProject(project: Project) {
    // First create the project
    try {
    const projectId = await ProjectService.createProject(project);
    
    if (projectId) {
      // Then start transcription
      console.log('Starting transcription for project:', projectId);
      await this.startTranscription(projectId);
      return projectId;
    }
    }
 catch (error) {
    console.error('Subtitle project creation error:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to create subtitle project');
  }
  }
}
