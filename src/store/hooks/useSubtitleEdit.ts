import { useState, useCallback, useMemo } from 'react';
import { Project, EditProps } from '@/types';
import { useDocument } from '@/store/hooks/useDocument';
import { useStorageUrl } from '@/store/hooks/useStorageUrl';
import { FirebaseDocumentService } from '@/services/firebase/document';
import { useRouter } from 'next/navigation';

interface UseSubtitleEditReturn {
  isLoading: boolean;
  isProcessing: boolean;
  currentStep: number;
  errorMessage: string | null;
  isEditing: boolean;
  customPosition: { y_position: number; frontend_video_height: number };
  selectedThemeId: string;
  project: Project | null;
  videoUrl: string | null;
  error: Error | null;
  setIsEditing: (value: boolean) => void;
  handleSubtitleCreate: () => Promise<void>;
  handleTranscriptionUpdate: (newTranscription: any) => void;
  nextStep: () => void;
  prevStep: () => void;
  setCustomPosition: (position: { y_position: number; frontend_video_height: number }) => void;
  setSelectedThemeId: (themeId: string) => void;
}

export function useSubtitleEdit({ projectId, user }: EditProps): UseSubtitleEditReturn {
  const router = useRouter();
  const { data: project, loading: docLoading, error } = useDocument<Project>('projects', projectId);
  
  const storagePath = project && user ? `user_files/${user.uid}/${project.fileName}` : null;
  const { url: videoUrl, loading: urlLoading } = useStorageUrl(storagePath);

  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [customPosition, setCustomPosition] = useState({ y_position: 50, frontend_video_height: 50 });
  const [selectedThemeId, setSelectedThemeId] = useState<string>('single-word');

  const handleSubtitleCreate = useCallback(async () => {
    setIsProcessing(true);
    try {
      await FirebaseDocumentService.updateDocument('projects', projectId, {
        transcription: project?.transcription,
        subTitlePosition: customPosition,
        selectedThemeId: selectedThemeId
      });

      const response = await fetch('/api/subtitle/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId }),
      });

      if (!response.ok) throw new Error('Failed to create subtitle');
      
      await FirebaseDocumentService.updateDocument('projects', projectId, {
        progress: 0,
        statusMessage: 'Added to queue',
        status: 'progress',
      });
      
      router.push("/studio/projects");
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Failed to create subtitle');
      setIsProcessing(false);
    }
  }, [projectId, project?.transcription, customPosition, selectedThemeId, router]);

  const handleTranscriptionUpdate = useCallback((newTranscription: any) => {
    if (project) {
      project.transcription = newTranscription;
    }
  }, [project]);

  const nextStep = useCallback(() => {
    if (currentStep === 3) {
      handleSubtitleCreate();
    } else if (currentStep < 3) {
      setCurrentStep(prev => prev + 1);
    }
  }, [currentStep, handleSubtitleCreate]);

  const prevStep = useCallback(() => {
    if (currentStep > 1) setCurrentStep(prev => prev - 1);
  }, [currentStep]);

  return {
    isLoading: docLoading || urlLoading,
    isProcessing,
    currentStep,
    errorMessage,
    isEditing,
    customPosition,
    selectedThemeId,
    project,
    videoUrl,
    error,
    setIsEditing,
    handleSubtitleCreate,
    handleTranscriptionUpdate,
    nextStep,
    prevStep,
    setCustomPosition,
    setSelectedThemeId
  };
}
