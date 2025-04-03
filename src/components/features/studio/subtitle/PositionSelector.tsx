import React, { useRef, useCallback, memo, RefObject, useState } from "react";
import { VideoPlayer } from "@/components/common/VideoPlayer";
import Button from "@/components/common/Button";
import { MdArrowBack, MdArrowForward, MdDragHandle } from "react-icons/md";
import { useSubtitlePosition, useVideoContainer } from "@/store";
import { PositionSelectorProps } from "@/types";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";

// Memoized Header component
const Header = memo(({ className }: { className?: string }) => (
  <div className={className}>
    <div className="flex flex-col gap-2">
      <h1 className="text-xl lg:text-2xl font-semibold text-background-text">
        Adjust Subtitle Position
      </h1>
      <p className="text-sm lg:text-base text-background-textLight">
        Drag the subtitle overlay <span className="text-primary font-semibold">up or down</span> to set its position
      </p>
    </div>
  </div>
));

Header.displayName = "Header";

// Memoized Controls component
const Controls = memo(
  ({
    onNext,
    onCancel,
  }: Pick<PositionSelectorProps, "onNext" | "onCancel">) => (
    <div className="bg-white/5 rounded-xl py-4 space-y-4">
      <Button
        onClick={onNext}
         icon={MdArrowForward}
         size='md'

                iconPosition='right'
        className="w-full  bg-gradient-to-r from-primary to-secondary text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
      >
        Next (Step 1 of 3)
      </Button>
      <Button
        onClick={onCancel}
        icon={MdArrowBack}
        size='md'

        variant="outline"
        className="w-full rounded-lg hover:bg-white/5 transition-all duration-300 flex items-center justify-center gap-2"
      >
        Back
      </Button>
    </div>
  )
);

Controls.displayName = "Controls";

// Memoized SubtitleOverlay component
const SubtitleOverlay = memo(
  ({
    y,
    onMouseDown,
    onTouchStart,
  }: {
    y: number;
    onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
    onTouchStart: (e: React.TouchEvent<HTMLDivElement>) => void;
  }) => (
    <div
      className="absolute left-1/2 transform -translate-x-1/2 cursor-move 
               bg-black/75 backdrop-blur-sm border border-white/20 
               text-white text-center rounded-lg transition-colors
               hover:bg-black/85 touch-none
               w-[90%] lg:w-[70%]"
      style={{
        top: `${y}px`,
        padding: "0.75rem",
      }}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
    >
      <div className="flex items-center justify-center gap-2 text-white/70">
        <MdDragHandle className="w-5 h-5" />
        <span className="text-sm lg:text-base">Drag to adjust position</span>
      </div>
    </div>
  )
);

SubtitleOverlay.displayName = "SubtitleOverlay";

export const PositionSelector = memo(function PositionSelector({
  videoUrl,
  onNext,
  onCancel,
  onPositionUpdate,
}: PositionSelectorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const {
    subtitlePosition,
    handleMouseDown,
    handleTouchStart,
    getPositionData,
  } = useSubtitlePosition({
    videoContainerRef: videoContainerRef as RefObject<HTMLDivElement>,
    subtitleHeight: 60,
  });

  useVideoContainer({
    containerRef: containerRef as RefObject<HTMLDivElement>,
    videoRef: videoRef as RefObject<HTMLVideoElement>,
    videoContainerRef: videoContainerRef as RefObject<HTMLDivElement>,
  });

  const handleNextClick = useCallback(() => {
    const positionData = getPositionData();
    if (positionData) {
      onPositionUpdate({
        frontend_video_height: positionData.frontend_video_height,
        y_position: positionData.y_position,
      });
      // console.log("Position data", positionData);
      onNext();
    }
  }, [getPositionData, onNext, onPositionUpdate]);

  return (
    <div className="max-w-4xl mx-auto min-h-screen bg-background">
      <div ref={containerRef} className="w-full max-w-[1920px] mx-auto px-2 lg:px-4">
        <Header className="mb-4 lg:mb-8 lg:hidden" />

        <div className="grid lg:grid-cols-[1fr,320px] gap-4 lg:gap-8 lg:min-h-[70vh]">
          <div className="w-full">
            <div 
              ref={videoContainerRef}
              className="w-full rounded-xl overflow-hidden relative bg-background-darker"
            >
              <div className="aspect-video w-full relative">
                <VideoPlayer
                  source={videoUrl}
                  ref={videoRef}
                  controls={false}
                  onDuration={() => {}}
                  onLoadedData={() => setIsVideoLoaded(true)}
                  className="w-full h-full object-contain"
                />
                {!isVideoLoaded ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <LoadingSpinner size="lg" color="primary" />
                    <p className="text-primary mt-4">Loading video...</p>
                  </div>
                ) : (
                  <SubtitleOverlay 
                    y={subtitlePosition.y} 
                    onMouseDown={handleMouseDown}
                    onTouchStart={handleTouchStart}
                  />
                )}
              </div>
            </div>
          </div>

          <div className="w-full">
            <Header className="hidden lg:block" />
            <Controls onNext={handleNextClick} onCancel={onCancel} />
          </div>
        </div>
      </div>
    </div>
  );
});
