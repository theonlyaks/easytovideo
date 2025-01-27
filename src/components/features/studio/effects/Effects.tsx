import React, { useState, useCallback } from "react";
import { VideoTime, FileItem, User, AuthProps, AuthState } from "@/types";
import { MAX_DURATION_SECONDS } from "@/constants";
import { isClipTooLong, formatTime } from "@/lib/common/video";
import { VideoPlayer } from "@/components/common/VideoPlayer";
import { RangeSeeker } from "@/components/common/RangeSeeker";
import { Modal } from "@/components/common/Modal";
import { FileManager } from "@/components/common/FileManager";
import { LoadingSyncTask } from "@/components/common/LoadingSyncTask";
import { useSyncTask } from "@/store/hooks/useSyncTask";
import { MdAdd, MdClose } from "react-icons/md";
import Button from "@/components/common/Button";
import { FiPlayCircle } from "react-icons/fi";
import { ProjectService } from "@/services/studio/projects";
import { Project } from "@/types";
import { EffectsService } from "@/services/studio/effects";
import { useRouter } from "next/navigation";
const { createProject } = ProjectService;
const { createAndProcessProject } = EffectsService;

export function Effects({ user }: AuthState) {
  const router = useRouter();
  const [isFileManagerOpen, setIsFileManagerOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [timeRange, setTimeRange] = useState<VideoTime>({ start: 0, end: 0 });
  const [duration, setDuration] = useState<number>(0);
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const syncTask = useSyncTask();

  const handleFileSelect = async (file: FileItem) => {
    setIsFileManagerOpen(false);
    setVideoUrl(file.fileUrl);
    setSelectedFile(file);
  };

  const handleLoadedMetadata = (videoDuration: number) => {
    setDuration(videoDuration);
    setTimeRange({ start: 0, end: videoDuration });
  };

  const handleRangeChange = ([start, end]: number[]) => {
    setTimeRange({ start, end });
  };

  const handleCancel = () => {
    setVideoUrl("");
    setTimeRange({ start: 0, end: 0 });
    setDuration(0);
    setSelectedFile(null);
  };

  const isInvalidDuration =
    duration > 0 &&
    isClipTooLong(timeRange.start, timeRange.end, MAX_DURATION_SECONDS);

  const handleApplyEffects = async () => {
    if (!user || !selectedFile) return;

    try {
      setIsLoading(true);
      const project: Project = {
        userId: user.uid,
        type: "effects",
        startTime: timeRange.start,
        endTime: timeRange.end,
        fileName: selectedFile.fileName,
        title: "Untitled Project",
      };
      const projectId = await createProject(project);
      console.log("Project created:", projectId);

      await createAndProcessProject(projectId);
      console.log("Project processed:", projectId);
      router.push("/studio/projects");
    } catch (error) {
      console.error("Error creating or processing project:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="max-w-4xl mx-auto py-4 md:py-12 px-2 md:px-0">
      <h1 className="text-lg md:text-xl font-bold text-center md:text-left text-background-text mb-6 sm:mb-8">
        Video Effects
      </h1>

      {!videoUrl ? (
        <button
          onClick={() => setIsFileManagerOpen(true)}
          className="w-full border-2 border-dashed border-primary rounded-lg p-4 md:p-8 text-center cursor-pointer hover:bg-primary/5 transition-colors"
        >
          <MdAdd className="mx-auto h-8 w-8 md:h-12 md:w-12 text-primary mb-2" />
          <p className="text-base md:text-lg mb-1 md:mb-2">
            Select video from library
          </p>
          <p className="text-xs md:text-sm text-muted-text">
            Supports MP4, WebM, and Ogg
          </p>
        </button>
      ) : (
        <div className="space-y-3 md:space-y-4">
          <div className="flex justify-end">
            <Button
              onClick={handleCancel}
              variant="outline"
              size="sm"
              icon={MdClose}
              className="text-sm md:text-base"
            >
              Change Video
            </Button>
          </div>

          <div className="aspect-video w-full bg-black rounded-lg overflow-hidden">
            <VideoPlayer source={videoUrl} onDuration={handleLoadedMetadata} />
          </div>

          {duration > 0 && (
            <div className="w-full space-y-3 md:space-y-4">
              <div className="">
                <RangeSeeker
                  min={0}
                  max={duration}
                  values={[timeRange.start, timeRange.end]}
                  onChange={handleRangeChange}
                  formatValue={formatTime}
                />
              </div>

              {isInvalidDuration && (
                <div className="text-xs md:text-sm text-primary text-center">
                  Clip duration cannot exceed {MAX_DURATION_SECONDS} seconds
                </div>
              )}

              <div className="flex justify-end">
                <Button
                  onClick={handleApplyEffects}
                  isLoading={isLoading}
                  size="lg"
                  customLoadingText="Applying Effects..."
                  icon={FiPlayCircle}
                  className="w-full md:w-auto md:ml-auto text-sm md:text-base"
                  disabled={isInvalidDuration || !user || isLoading}
                >
                  Apply Effects
                </Button>
              </div>
            </div>
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
