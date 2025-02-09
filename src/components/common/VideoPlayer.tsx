import React, { useRef, useState, useEffect } from 'react';
import { VideoPlayerProps } from '@/types';

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ 
  source, 
  onDuration 
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const updateDimensions = () => {
    if (videoRef.current && containerRef.current) {
      const video = videoRef.current;
      const container = containerRef.current;
      const containerWidth = container.clientWidth;
      
      const videoAspectRatio = video.videoWidth / video.videoHeight;
      let newWidth = Math.min(containerWidth, 1200); // Max width limit
      let newHeight = Math.round(newWidth / videoAspectRatio);

      // If height is too tall for viewport, calculate from height instead
      const maxHeight = window.innerHeight * 0.8; // 80% of viewport height
      if (newHeight > maxHeight) {
        newHeight = maxHeight;
        newWidth = Math.round(newHeight * videoAspectRatio);
      }

      setDimensions({
        width: newWidth,
        height: newHeight
      });
    }
  };

  useEffect(() => {
    const handleResize = () => {
      updateDimensions();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      const video = videoRef.current;
      if (video.duration && !isNaN(video.duration)) {
        onDuration(video.duration);
      }
      updateDimensions();
    }
  };

  return (
    <div className="w-full flex justify-center items-center" ref={containerRef}>
      <div 
        className="relative flex items-center" 
        style={{
          width: dimensions.width ? `${dimensions.width}px` : '100%',
          height: dimensions.height ? `${dimensions.height}px` : 'auto',
        }}
      >
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