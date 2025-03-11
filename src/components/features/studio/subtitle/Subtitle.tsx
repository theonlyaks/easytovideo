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
import { useProjectSubscription } from '@/hooks/useProjectSubscription';
import { useVideoSubtitle } from '@/store';

export function Subtitle({ user }: AuthState) {
  const router = useRouter();
  const [isFileManagerOpen, setIsFileManagerOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  const syncTask = useSyncTask();

  const {
    status,
    errorMessage,
    currentProjectId,
    handleProcessVideo,
    resetState,
    setErrorMessage
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
    handleProcessVideo(file);
  };

  const handleReset = () => {
    setSelectedFile(null);
    resetState();
  };

  return (
    <main className="mx-auto px-4 py-4 md:py-12 md:px-0 mt-8 sm:mt-0">
      {!selectedFile ? (
        <FileSelector onOpenFileManager={() => setIsFileManagerOpen(true)} />
      ) : (
        <div className="text-center">
          {!errorMessage && (
            <>
              <LoadingSpinner size="lg" color="primary" />
              <p className="text-lg mt-4 text-primary">
                {status === 'validating' ? 'Validating video...' : 'Transcribing video...'}
              </p>
              {status === 'transcribing' && (
                <p className="text-sm mt-2 text-gray-600">
                  Progress: {progress}%
                </p>
              )}
            </>
          )}
          {errorMessage && (
            <>
              <p className="text-primary mt-4">{errorMessage}</p>
              <button
                onClick={handleReset}
                className="mt-4 text-white bg-primary px-4 py-2 rounded-lg"
              >
                Try Again
              </button>
            </>
          )}
        </div>
      )}

      <Modal
        isOpen={isFileManagerOpen}
        onClose={() => setIsFileManagerOpen(false)}
      >
        <div className="p-3 md:p-6">
          <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">
            Select Video File
          </h2>
          {user ? (
            <FileManager user={user} onSelect={handleFileSelect} />
          ) : (
            <div className="text-red-500 text-center text-sm md:text-base">
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
        <div className="p-3 md:p-6">
          <LoadingSyncTask state={syncTask.state} text={syncTask.text} />
        </div>
      </Modal>
    </main>
  );
}
