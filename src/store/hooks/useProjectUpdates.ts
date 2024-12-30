import { useState, useEffect } from 'react';
import { Project } from '@/types';
import { calculateRemainingTime } from '@/lib/common/time';

export const useProjectUpdates = (projects: Project[]) => {
  // Initialize with the projects passed in
  const [updatedProjects, setUpdatedProjects] = useState<Project[]>(() => 
    projects.map(project => ({
      ...project,
      remainingTime: project.status === 'processing'
        ? calculateRemainingTime(project.updation_time, project.duration || 0)
        : ''
    }))
  );

  // Update when projects change
  useEffect(() => {
    setUpdatedProjects(projects.map(project => ({
      ...project,
      remainingTime: project.status === 'processing'
        ? calculateRemainingTime(project.updation_time, project.duration || 0)
        : ''
    })));
  }, [projects]);

  // Start the interval timer
  useEffect(() => {
    if (!updatedProjects.some(p => p.status === 'processing')) return;

    const timer = setInterval(() => {
      setUpdatedProjects(prev => prev.map(project => ({
        ...project,
        remainingTime: project.status === 'processing'
          ? calculateRemainingTime(project.updation_time, project.duration || 0)
          : project.remainingTime
      })));
    }, 1000);

    return () => clearInterval(timer);
  }, [projects]);

  return updatedProjects;
};
