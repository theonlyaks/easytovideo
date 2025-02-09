import { Project } from "@/types";

export class EffectsService {
  static async processProject(projectId: string) {
    const backendUrl = process.env.BACKEND_URL;
    // const response = await fetch(`${backendUrl}api/v1/effects/process`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ projectId }),
    // });

    const response = await fetch(`https://effects-ai-410641e.app.beam.cloud`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Connection": "keep-alive",
        "Authorization": "Bearer REDACTED_BEAM_TOKEN==",
      },
      body: JSON.stringify({ projectId }),
    });

    if (!response.ok) {
      throw new Error('Failed to process project');
    }

    return response.json();
  }

  static async createAndProcessProject(projectId: string) {
    const response = await fetch('/api/effects/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ projectId }),
    });

    if (!response.ok) {
      throw new Error('Failed to process project');
    }

    const data = await response.json();
    return data.projectId;
  }
}

