import { useState, useEffect } from 'react';
import { ProjectService } from '@/services/studio/projects';
import { ProjectState, User } from '@/types';
import { calculateRemainingTime } from '@/lib/common/time';

export const useProjects = (user: User | null): ProjectState => {
  const [state, setState] = useState<ProjectState>({
    projects: [],
    loading: true,
  });

  useEffect(() => {
    if (!user?.email) {
      setState({ projects: [], loading: false });
      return;
    }

    const unsubscribe = ProjectService.subscribeToProjects(
      user.email,
      (projects) => setState({ projects, loading: false }),
      (error) => setState((prev) => ({ ...prev, loading: false, error: error.message }))
    );

    return () => unsubscribe();
  }, [user]);

  useEffect(() => {
    const timer = setInterval(() => {
      setState((prev) => ({
        ...prev,
        projects: prev.projects.map((project) => ({
          ...project,
          remainingTime:
            project.status === 'processing'
              ? calculateRemainingTime(project.updation_time, project.duration || 0)
              : '',
        })),
      }));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return state;
};
