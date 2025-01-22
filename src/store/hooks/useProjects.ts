import { useState, useEffect } from 'react';
import { ProjectService } from '@/services/studio/projects';
import { ProjectState, User } from '@/types';

export const useProjects = (user: User | null): ProjectState => {
  const [state, setState] = useState<ProjectState>({
    projects: [],
    loading: true,
  });

  useEffect(() => {
    if (!user?.id) {
      console.log('No user or userId found:', user);
      setState({ projects: [], loading: false });
      return;
    }

    console.log('Subscribing to projects for user:', user.id);

    const unsubscribe = ProjectService.subscribeToProjects(
      user.id,
      (projects) => {
        console.log('Projects response:', projects);
        setState({ projects, loading: false });
      },
      (error) => {
        console.error('Error subscribing to projects:', error);
        setState((prev) => ({ ...prev, loading: false, error: error.message }));
      }
    );

    return () => unsubscribe();
  }, [user]);

  return state;
};
