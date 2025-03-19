"use client";

import React, { useState, useEffect } from "react";
import { FileItem, AuthState } from "@/types";
import { Modal } from "@/components/common/Modal";
import { FileManager } from "@/components/common/FileManager";
import { LoadingSyncTask } from "@/components/common/LoadingSyncTask";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { useSyncTask } from "@/store";
import { useRouter } from "next/navigation";
import { FileSelector } from "@/components/features/studio/subtitle/FileSelector";
import { useProjectSubscription } from "@/hooks/useProjectSubscription";
import { useVideoSubtitle } from "@/store";
import { LanguageSelector } from "@/components/features/studio/subtitle/LanguageSelector";
import Button from "@/components/common/Button";
import { FiAlertCircle } from "react-icons/fi";

export function Subtitle({ user }: AuthState) {
  const router = useRouter();
  const [isFileManagerOpen, setIsFileManagerOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  const syncTask = useSyncTask();

  // Add effect for scroll behavior
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedFile, showLanguageSelector]);

  const {
    status,
    errorMessage,
    currentProjectId,
    handleProcessVideo,
    resetState,
    setErrorMessage,
  } = useVideoSubtitle({ user });

  const { project, progress, error: subscriptionError } = useProjectSubscription(currentProjectId);

  useEffect(() => {
    if (project?.isActive && currentProjectId) {
      router.push(`/studio/subtitle/${currentProjectId}/edit`);
    }
  }, [project, currentProjectId, router]);

  useEffect(() => {
    if (subscriptionError) {
      setErrorMessage(subscriptionError);
    }
  }, [subscriptionError]);

  const handleFileSelect = async (file: FileItem) => {
    setIsFileManagerOpen(false);
    setSelectedFile(file);
    setShowLanguageSelector(true);
  };

  const handleLanguageSubmit = (videoLang: string, subtitleType: string, whisperLanguage: string) => {
    setShowLanguageSelector(false); // Move to processing state
    if (selectedFile) {
      handleProcessVideo(selectedFile, videoLang, subtitleType, whisperLanguage);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setShowLanguageSelector(false);
    resetState();
  };

  return (
    <main className="mx-auto px-3 sm:px-4 py-4 sm:py-6 mt-4 sm:mt-0 min-h-screen bg-background">
      {!selectedFile ? (
        <FileSelector onOpenFileManager={() => setIsFileManagerOpen(true)} />
      ) : showLanguageSelector ? (
        <LanguageSelector
          onSubmit={handleLanguageSubmit}
          onCancel={handleReset}
        />
      ) : (
        <div className="max-w-md mx-auto mt-8 p-4">
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100 animate-fadeIn">
            <div className="flex flex-col items-center justify-center">
              {(status === "validating" || status === "transcribing") && (
                <>
                  <LoadingSpinner size="lg" color="primary"/>
                  <p className="text-base sm:text-lg font-medium text-primary text-center m-2">
                    {status === "validating" ? "Validating video..." : "Transcribing video..."}
                  </p>
                  {status === "transcribing" && progress !== undefined && (
                    <p className="text-sm sm:text-base text-accent text-center m-2">
                      {progress === 0 ? "Getting things ready..." : `${progress}% complete`}
                    </p>
                  )}
                </>
              )}
              {errorMessage && (
                <>
                  <div className="relative mb-4">
                    <FiAlertCircle className="w-12 h-12 sm:w-14 sm:h-14 text-primary animate-pulse" />
                  </div>
                  <p className="text-sm sm:text-base font-semibold text-primary text-center mb-4 sm:mb-6">
                    {errorMessage}
                  </p>
                  <Button
                    variant="primary"
                    onClick={handleReset}
                    className="w-full max-w-[200px] py-2 sm:py-3 px-4 sm:px-6 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-sm sm:text-base font-semibold"
                  >
                    Pick Another Video
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <Modal
        isOpen={isFileManagerOpen}
        onClose={() => setIsFileManagerOpen(false)}
      >
        <div className="p-3 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
            Select Video File
          </h2>
          {user ? (
            <FileManager user={user} onSelect={handleFileSelect} />
          ) : (
            <div className="text-red-500 text-center text-sm sm:text-base">
              Please sign in to manage files
            </div>
          )}
        </div>
      </Modal>

      <Modal
        isOpen={syncTask.isOpen}
        onClose={syncTask.closeTask}
        isLoader={syncTask.state === "loading"}
      >
        <div className="p-3 sm:p-6">
          <LoadingSyncTask state={syncTask.state} text={syncTask.text} />
        </div>
      </Modal>
    </main>
  );
}