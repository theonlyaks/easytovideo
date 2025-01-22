import React, { useRef } from 'react';
import { VideoPlayerProps } from '@/types';

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ 
  source, 
  onDuration 
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleLoadedMetadata = () => {
    if (videoRef.current && videoRef.current.duration && !isNaN(videoRef.current.duration)) {
      onDuration(videoRef.current.duration);
    }
  };

  return (
    <div className="w-full"> {/* Changed from max-w-[853px] to w-full */}
      <div className="relative w-full aspect-video">
        <video
          ref={videoRef}
          src={source}
          controls
          onLoadedMetadata={handleLoadedMetadata}
          className="w-full h-full rounded-lg bg-secondary"
        />
      </div>
    </div>
  );
};