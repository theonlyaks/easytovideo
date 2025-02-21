import React, { useState, useCallback } from "react";
import { VideoTime, FileItem, User, AuthProps, AuthState } from "@/types";
import { MAX_DURATION_SECONDS, MIN_DURATION_SECONDS } from "@/constants";
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
import { useAtomValue } from "jotai";
import { subscriptionAtom } from "@/store/atoms/subscriptionAtom";
import { CreditsService } from "@/services/studio/credits";
import { BiCoinStack } from "react-icons/bi"; // Add this import
import { Demo } from '@/components/features/studio/effects/Demo';

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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const subscription = useAtomValue(subscriptionAtom);
  const [isOriginalClip, setIsOriginalClip] = useState(true);
  const [originalDuration, setOriginalDuration] = useState<VideoTime>({ start: 0, end: 0 });
  const [videoDimensions, setVideoDimensions] = useState<{ width: number; height: number } | null>(null);
  
  const isVerticalVideo = videoDimensions 
    ? videoDimensions.height / videoDimensions.width >= 1.5 // roughly checks for vertical aspect ratio
    : true;

  const syncTask = useSyncTask();

  const handleFileSelect = async (file: FileItem) => {
    setIsFileManagerOpen(false);
    setVideoUrl(file.fileUrl);
    setSelectedFile(file);
    setIsOriginalClip(true);
    setErrorMessage(null); // Reset error message
    setVideoDimensions(null); // Reset video dimensions
  };

  const handleLoadedMetadata = (videoDuration: number, videoElement: HTMLVideoElement) => {
    setDuration(videoDuration);
    const initialTimeRange = { start: 0, end: videoDuration };
    setTimeRange(initialTimeRange);
    setOriginalDuration(initialTimeRange);
    setIsOriginalClip(true);
    
    // Get video dimensions
    setVideoDimensions({
      width: videoElement.videoWidth,
      height: videoElement.videoHeight
    });
  };

  const handleRangeChange = ([start, end]: number[]) => {
    setTimeRange({ start, end });
    // Check if current range matches original duration
    setIsOriginalClip(
      Math.abs(start - originalDuration.start) < 0.1 && 
      Math.abs(end - originalDuration.end) < 0.1
    );
  };

  const handleCancel = () => {
    setVideoUrl("");
    setTimeRange({ start: 0, end: 0 });
    setDuration(0);
    setSelectedFile(null);
    setErrorMessage(null); // Reset error message
    setVideoDimensions(null); // Reset video dimensions
  };

  const isInvalidDuration =
    duration > 0 &&
    (isClipTooLong(timeRange.start, timeRange.end, MAX_DURATION_SECONDS) ||
    (timeRange.end - timeRange.start) < 20);

  const handleApplyEffects = async () => {
    if (!user || !selectedFile) return;
    
    if (!isVerticalVideo) {
      setErrorMessage("Please upload a vertical video (9:16 aspect ratio) suitable for Reels/Shorts/TikTok");
      return;
    }

    const clipDuration = timeRange.end - timeRange.start;
    if (clipDuration < MIN_DURATION_SECONDS) {
      setErrorMessage(`Selected clip must be at least ${MIN_DURATION_SECONDS} seconds long.`);
      return;
    }

    if (subscription.credit <= 0) {
      setErrorMessage("You ran out of credits. Please upgrade your plan to continue creating videos.");
      return;
    }

    try {
      setIsLoading(true);
      setErrorMessage(null);
      const project: Project = {
        userId: user.uid,
        type: "Effects",
        startTime: timeRange.start,
        endTime: timeRange.end,
        fileName: selectedFile.fileName,
        title: "Untitled Project",
        isOriginalClip, // Add this new property
      };
      const projectId = await createProject(project);
      // console.log("Project created:", projectId);

      // Subtract 1 credit and add to history - removed videoName
      await CreditsService.updateCredits(
        user.uid, 
        -1, // Subtract 1 credit
        'credit_used',
        {
          description: `Credit used for project: ${projectId}`,
          projectId: projectId
        }
      );

      await createAndProcessProject(projectId);
      
      // Add status update
      await ProjectService.updateProjectStatus(
        projectId,
        'progress',
        'Added to the processing queue'
      );

      router.push("/studio/projects");
    } catch (error) {
      //console.error("Error creating or processing project:", error);
      setErrorMessage("Failed to process video. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="max-w-4xl mx-auto py-4 md:py-12 px-2 md:px-0 mt-8 sm:mt-0">
      {!videoUrl ? (
        <>
          <div className="mb-8 text-center">
            <h1 className="text-2xl md:text-3xl font-medium mb-2">
              Smart Video Effects
            </h1>
            <p className="text-sm text-muted-text px-1">
              AI-powered effects for TikTok, Reels & Shorts
            </p>
          </div>
          <button
            onClick={() => setIsFileManagerOpen(true)}
            className="w-full border-2 border-dashed border-primary rounded-lg p-4 md:p-8 text-center cursor-pointer hover:bg-primary/5 transition-colors flex flex-col items-center justify-center min-h-[150px]"
          >
            <MdAdd className="h-8 w-8 md:h-24 md:w-12 text-primary mb-2" />
            <p className="text-base md:text-lg mb-1 md:mb-2">
              Select video from library
            </p>
            {/* <p className="text-xs md:text-sm text-muted-text">
              Supports MP4, WebM, and Ogg
            </p> */}
          </button>
          <Demo />
        </>
      ) : (
        <div className="space-y-3 md:space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Left side - Video */}
            <div className="w-full md:w-1/2">
              <div className="rounded-lg">
                <VideoPlayer
                  source={videoUrl}
                  onDuration={handleLoadedMetadata}
                />
              </div>
            </div>

            {/* Right side - Controls */}
            <div className="w-full md:w-1/2 flex flex-col justify-center">
              <div className="space-y-4">
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

                {duration > 0 && (
                  <div className="space-y-4">
                    <RangeSeeker
                      min={0}
                      max={duration}
                      values={[timeRange.start, timeRange.end]}
                      onChange={handleRangeChange}
                      formatValue={formatTime}
                    />

                    {isInvalidDuration && (
                      <p className="text-xs md:text-sm text-primary text-center">
                        {(timeRange.end - timeRange.start) < 20
                          ? `Clip duration must be at least ${MIN_DURATION_SECONDS} seconds`
                          : `Clip duration cannot exceed ${MAX_DURATION_SECONDS} seconds`}
                      </p>
                    )}

                  {!isVerticalVideo && (
                      <p className="text-xs md:text-sm text-primary text-center">
                        Please upload a vertical video (9:16 aspect ratio) suitable for Reels/Shorts/TikTok
                      </p>
                    )}

                    {errorMessage && (
                      <div className="text-sm text-primary text-center mb-2">
                        {errorMessage}
                      </div>
                    )}

                    <Button
                      onClick={handleApplyEffects}
                      isLoading={isLoading}
                      size="lg"
                      customLoadingText="Applying Effects..."
                      icon={FiPlayCircle}
                      className="w-full text-sm md:text-base relative"
                      disabled={isInvalidDuration || !user || isLoading || !isVerticalVideo}
                    >
                      <span className="flex items-center justify-center gap-2">
                        Apply Effects
                        <span className="flex items-center gap-1 text-xs bg-white/20 px-2 py-1 rounded">
                          <BiCoinStack className="w-4 h-4" />
                          1
                        </span>
                      </span>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
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
