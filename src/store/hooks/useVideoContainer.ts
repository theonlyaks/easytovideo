import { RefObject, useEffect, useCallback } from 'react';

interface UseVideoContainerProps {
  containerRef: RefObject<HTMLDivElement | null>;
  videoRef: RefObject<HTMLVideoElement | null>;
  videoContainerRef: RefObject<HTMLDivElement | null>;
}

export const useVideoContainer = ({
  containerRef,
  videoRef,
  videoContainerRef
}: UseVideoContainerProps) => {
  const adjustVideoSize = useCallback(() => {
    if (!videoRef.current || !videoContainerRef.current || !containerRef.current) return;
    
    const video = videoRef.current;
    const container = containerRef.current;
    const videoContainer = videoContainerRef.current;

    // Update breakpoint to match lg (1024px)
    const isMobile = window.innerWidth < 1024;
    
    if (isMobile) {
      videoContainer.style.width = '100%';
      videoContainer.style.height = 'auto';
      return;
    }
    
    const videoAspectRatio = video.videoWidth / video.videoHeight;
    const availableHeight = window.innerHeight * 0.7;
    const widthForHeight = availableHeight * videoAspectRatio;
    const availableWidth = container.clientWidth - 320;
    const heightForWidth = availableWidth / videoAspectRatio;

    if (heightForWidth <= availableHeight) {
      videoContainer.style.width = `${availableWidth}px`;
      videoContainer.style.height = `${heightForWidth}px`;
    } else {
      videoContainer.style.width = `${widthForHeight}px`;
      videoContainer.style.height = `${availableHeight}px`;
    }
  }, [containerRef, videoRef, videoContainerRef]);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(adjustVideoSize);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    const handleVideoLoad = () => videoRef.current && adjustVideoSize();
    videoRef.current?.addEventListener('loadedmetadata', handleVideoLoad);
    window.addEventListener('orientationchange', adjustVideoSize);

    return () => {
      resizeObserver.disconnect();
      videoRef.current?.removeEventListener('loadedmetadata', handleVideoLoad);
      window.removeEventListener('orientationchange', adjustVideoSize);
    };
  }, [adjustVideoSize, containerRef, videoRef]);

  return { adjustVideoSize };
};
