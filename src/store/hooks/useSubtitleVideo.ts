import { useState } from 'react';
import { FileItem, Project } from '@/types';
import { SubtitleService } from '@/services/studio/subtitle';

type VideoStatus = 'idle' | 'validating' | 'transcribing';

interface UseVideoSubtitleProps {
  user: {
    uid: string;
    email?: string;
  } | null;
}

interface UseVideoSubtitleReturn {
  status: VideoStatus;
  errorMessage: string | null;
  currentProjectId: string | null;
  handleProcessVideo: (file: FileItem) => Promise<void>;
  resetState: () => void;
  setErrorMessage: (error: string | null) => void;  // Add this line
}

export function useVideoSubtitle({ user }: UseVideoSubtitleProps): UseVideoSubtitleReturn {
  const [status, setStatus] = useState<VideoStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [currentProjectId, setCurrentProjectId] = useState<string | null>(null);

  const validateVideo = async (video: HTMLVideoElement): Promise<void> => {
    await new Promise((resolve, reject) => {
      video.onloadedmetadata = () => resolve(video);
      video.onerror = () => reject(new Error('Failed to load video'));
      video.load();
    });

    if (video.duration > 300) throw new Error('Video must be less than 5 minutes');
    if (video.duration < 3) throw new Error('Video must be at least 3 seconds');
    if (video.videoHeight / video.videoWidth < 1.5) {
      throw new Error('Please upload a vertical video (9:16 aspect ratio)');
    }
  };

  const handleProcessVideo = async (file: FileItem) => {
    if (!user) return;

    try {
      setStatus('validating');
      setErrorMessage(null);

      const video = document.createElement('video');
      video.src = file.fileUrl;
      
      try {
        await validateVideo(video);
      } catch (validationError) {
        setStatus('idle');
        throw validationError;
      }

      setStatus('transcribing');
      
      const newProject: Project = {
        userId: user.uid,
        email: user.email || '',
        type: 'subtitle',
        fileName: file.fileName,
        status: 'validation_complete',
        duration: video.duration,
        is_active: false,
        progress: 0,
      };

      const projectId = await SubtitleService.createSubtitleProject(newProject);
      setCurrentProjectId(projectId!);
      
    } catch (error) {
      setStatus('idle');
      setErrorMessage(error instanceof Error ? error.message : 'Failed to process video');
    }
  };

  const resetState = () => {
    setStatus('idle');
    setErrorMessage(null);
    setCurrentProjectId(null);
  };

  return {
    status,
    errorMessage,
    currentProjectId,
    handleProcessVideo,
    resetState,
    setErrorMessage  // Add this line
  };
}
