"use client";

import React, { useMemo } from "react";
import { EditProps } from "@/types";
import { PositionSelector } from "@/components/features/studio/subtitle/PositionSelector";
import { ThemeSelector } from "@/components/features/studio/subtitle/ThemeSelector";
import { TextEditor } from "@/components/features/studio/subtitle/TextEditor";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { SubtitleOutput } from "@/components/features/studio/subtitle/SubtitleOutput";
import { useRouter } from "next/navigation";
import { useSubtitleEdit } from "@/store";

// Memoized components
const MemoizedPositionSelector = React.memo(PositionSelector);
const MemoizedThemeSelector = React.memo(ThemeSelector);
const MemoizedTextEditor = React.memo(TextEditor);
const MemoizedSubtitleOutput = React.memo(SubtitleOutput);

export function Edit(props: EditProps) {
  const router = useRouter();
  const {
    isLoading,
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
    handleTranscriptionUpdate,
    nextStep,
    prevStep,
    setCustomPosition,
    setSelectedThemeId
  } = useSubtitleEdit(props);

  // Memoize step rendering
  const currentStepContent = useMemo(() => {
    if (isLoading || isProcessing) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <LoadingSpinner size="lg" color="primary" />
          <p className="text-primary mt-4">
            {isProcessing ? 'Processing Subtitle...' : 'Loading project...'}
          </p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center text-primary mt-8">
          <p>Error loading project: {error.message}</p>
          <button
            onClick={() => router.push('/studio/subtitle')}
            className="mt-4 text-white bg-primary px-4 py-2 rounded-lg"
          >
            Go Back
          </button>
        </div>
      );
    }

    if (!project || !videoUrl) {
      return (
        <div className="text-center text-primary mt-8">
          <p>Project not found or video unavailable</p>
          <button
            onClick={() => router.push('/studio/subtitle')}
            className="mt-4 text-white bg-primary px-4 py-2 rounded-lg"
          >
            Go Back
          </button>
        </div>
      );
    }

    if (project.outputFileName && !isEditing) {
      return <MemoizedSubtitleOutput 
        effectId={props.projectId} 
        user={props.user} 
        onEdit={() => setIsEditing(true)}
      />;
    }

    switch (currentStep) {
      case 1:
        return (
          <MemoizedPositionSelector
            videoUrl={videoUrl}
            onNext={nextStep}
            onCancel={() => router.push('/studio/subtitle')}
            onPositionUpdate={setCustomPosition}
          />
        );
      case 2:
        return (
          <MemoizedThemeSelector
            onNext={(themeId) => {
              setSelectedThemeId(themeId);
              nextStep();
            }}
            onPrevious={prevStep}
          />
        );
      case 3:
        return (
          <MemoizedTextEditor
            onNext={nextStep}
            onPrevious={prevStep}
            transcription={project.transcription}
            onTranscriptionUpdate={handleTranscriptionUpdate}
          />
        );
      default:
        return null;
    }
  }, [currentStep, isLoading, isProcessing, error, project, videoUrl, isEditing, props.projectId, props.user, nextStep, prevStep, handleTranscriptionUpdate, router]);

  return (
    <main className="mx-auto py-4 md:py-12 px-2 md:px-0">
      <div className="space-y-3 md:space-y-4">
        <div className="flex flex-col">
          {currentStepContent}
          {errorMessage && (
            <div className="text-primary text-lg text-center mt-4">
              {errorMessage}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
