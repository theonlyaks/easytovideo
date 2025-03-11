import { useState, useEffect } from 'react';
import { Project, ProjectSubscriptionResult} from '@/types';
import { ProjectService } from '@/services/studio/projects';

export const useProjectSubscription = (projectId: string | null): ProjectSubscriptionResult => {
  const [project, setProject] = useState<Project | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    if (projectId) {
      unsubscribe = ProjectService.subscribeToProject(
        projectId,
        (project) => {
          setProject(project);
          setProgress(project.progress || 0);
        },
        (error) => {
          setError('Failed to monitor project status');
          console.error('Error monitoring project:', error);
        }
      );
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [projectId]);

  return { project, progress, error };
};
