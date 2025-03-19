"use client";

import React, { useMemo, useEffect } from "react";
import { EditProps, ThemeConfig } from "@/types";
import { PositionSelector } from "@/components/features/studio/subtitle/PositionSelector";
import { ThemeSelector } from "@/components/features/studio/subtitle/ThemeSelector";
import { TextEditor } from "@/components/features/studio/subtitle/TextEditor";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { SubtitleOutput } from "@/components/features/studio/subtitle/SubtitleOutput";
import { useRouter } from "next/navigation";
import { useSubtitleEdit } from "@/store";
import { ProjectNameEditor } from "@/components/features/studio/subtitle/ProjectNameEditor";
import { ProgressBar } from "@/components/common/ProgressBar";

// Memoized components
const MemoizedPositionSelector = React.memo(PositionSelector);
const MemoizedThemeSelector = React.memo(ThemeSelector);
const MemoizedTextEditor = React.memo(TextEditor);
const MemoizedSubtitleOutput = React.memo(SubtitleOutput);

export function Edit({ projectId, user }: EditProps) {
  const router = useRouter();
  const {
    isLoading,
    isProcessing,
    currentStep,
    errorMessage,
    isEditing: isSubtitleEditing,
    customPosition,
    selectedThemeId,
    project,
    videoUrl,
    error,
    setIsEditing: setIsSubtitleEditing,
    handleTranscriptionUpdate,
    nextStep,
    prevStep,
    setCustomPosition,
    setSelectedThemeId,
    themeCustomization,
    setThemeCustomization,
    isCapital,
    setIsCapital,
  } = useSubtitleEdit({ projectId, user });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  const currentStepContent = useMemo(() => {
    if (isLoading || isProcessing || !project || !videoUrl) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <LoadingSpinner size="lg" color="primary" />
          <p className="text-primary mt-4">
            {isProcessing ? 'Building Video...' : 'Loading project...'}
          </p>
        </div>
      );
    }

    if (error) {
      router.push('/studio/subtitle');
    }

    if (project.outputFileName && !isSubtitleEditing) {
      return <MemoizedSubtitleOutput 
        effectId={projectId} 
        user={user} 
        onEdit={() => setIsSubtitleEditing(true)}
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
            onNext={(config: ThemeConfig) => {
              setSelectedThemeId(config.themeId);
              setThemeCustomization(config);         
              nextStep();
            }}
            onPrevious={(config: ThemeConfig) => {
              setSelectedThemeId(config.themeId);
              setThemeCustomization(config);
              prevStep();         
            }}
            initialCustomization={themeCustomization}
            targetLanguage={project.targetLanguage}
            isDifferentLanguage={project.isDifferentLanguage || false}
          />
        );
      case 3:
        return (
          <MemoizedTextEditor
            onNext={() => {
              if (project && project.subTitleTheme) {
                project.subTitleTheme.isCapital = isCapital;
              } else if (project) {
                project.subTitleTheme = {
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  textColor: "#ffffff",
                  fontFamily: "Arial",
                  fontWeight: "normal",
                  isCapital
                };
              }
              
              nextStep();
            }}
            onPrevious={prevStep}
            transcription={project.transcription}
            onTranscriptionUpdate={handleTranscriptionUpdate}
            isDifferentLanguage={project?.isDifferentLanguage}
            isCapital={isCapital}
            onCapitalChange={setIsCapital}
          />
        );
      default:
        return null;
    }
  }, [currentStep, isLoading, isProcessing, error, project, videoUrl, isSubtitleEditing, projectId, user, nextStep, prevStep, handleTranscriptionUpdate, router, setSelectedThemeId, isCapital, setThemeCustomization, themeCustomization]);

  return (
    <>
      {isLoading ? (
        <div className="flex flex-col items-center justify-center min-h-screen ">
          <LoadingSpinner size="lg" color="primary" />
          <p className="text-primary mt-4">Loading project...</p>
        </div>
      ) : (
        <main className="mx-auto py-6 md:py-0 px-2 md:px-0">
          <ProjectNameEditor projectId={projectId} initialTitle={project?.title} />
          {/* Add ProgressBar here */}
          {!isProcessing && project && isSubtitleEditing && (
            <div className="max-w-5xl mx-auto px-2">
              <ProgressBar currentStep={currentStep} totalSteps={3} />
            </div>
          )}
          <div className="">
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
      )}
    </>
  );
}
