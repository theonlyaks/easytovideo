import { useEffect } from 'react';
import { ProjectService } from '@/services/studio/projects';
import { Project } from '@/types';

export const useProjectThumbnailUrl = (
  project: Project, 
  newThumbnailUrl: string | null
) => {
  useEffect(() => {
    const updateThumbnailUrl = async () => {
      if (newThumbnailUrl && 
          project.id && 
          !project.thumbnailUrl && 
          project.status === "completed") {
        try {
          await ProjectService.updateProjectThumbnailUrl(project.id, newThumbnailUrl);
        } catch (error) {
          console.error("Error updating thumbnail URL:", error);
        }
      }
    };

    updateThumbnailUrl();
  }, [newThumbnailUrl, project.id, project.thumbnailUrl, project.status]);
};
