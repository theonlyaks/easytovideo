import { useState, useCallback, useMemo } from 'react';
import { Project, EditProps, ThemeConfig } from '@/types';
import { useDocument,useStorageUrl } from '@/store';
import { FirebaseDocumentService } from '@/services/firebase/document';
import { useRouter } from 'next/navigation';
import { CreditsService } from '@/services/studio/credits'; // Add this import

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
  themeCustomization: ThemeConfig;
  setThemeCustomization: (config: ThemeConfig) => void;
  isCapital: boolean;
  setIsCapital: (value: boolean) => void;
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
  const [selectedThemeId, setSelectedThemeId] = useState<string>('one_word');

  const defaultCustomization: ThemeConfig = {
    themeId: 'one_word',
    fontId: 'poppins-regular',
    fontSize: '32',
    color: '#ff5a5a'
  };

  const [themeCustomization, setThemeCustomization] = useState<ThemeConfig>(() => {
    if (project?.subTitleTheme) {
      return {
        themeId: project.selectedThemeId || defaultCustomization.themeId,
        fontId: project.subTitleTheme.fontFamily || defaultCustomization.fontId,
        fontSize: String(project.subTitleTheme.fontSize || defaultCustomization.fontSize),
        color: project.subTitleTheme.textColor || defaultCustomization.color
      };
    }
    return defaultCustomization;
  });

  const [isCapital, setIsCapital] = useState<boolean>(() => {
    return project?.subTitleTheme?.isCapital ?? false;
  });

  const handleSubtitleCreate = useCallback(async () => {
    setIsProcessing(true);
    try {
      // Update project document with subtitle settings
      await FirebaseDocumentService.updateDocument('projects', projectId, {
        transcription: project?.transcription,
        subTitlePosition: customPosition,
        selectedThemeId: selectedThemeId,
        themeCustomization: themeCustomization,
        isCapital: isCapital
      });

      // Deduct one credit from user's account
      if (user && user.uid) {
        await CreditsService.updateCredits(
          user.uid,
          -1, // Subtract 1 credit
          "credit_used",
          {
            description: `Credit used for subtitle project: ${projectId}`,
            projectId: projectId,
          }
        );
      }

      // Create subtitle via API
      const response = await fetch('/api/subtitle/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId }),
      });

      if (!response.ok) throw new Error('Failed to create subtitle');
      
      // Update project status
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
  }, [projectId, project?.transcription, customPosition, selectedThemeId, router, isCapital, themeCustomization, user]);

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
    setSelectedThemeId,
    themeCustomization,
    setThemeCustomization,
    isCapital,
    setIsCapital
  };
}
