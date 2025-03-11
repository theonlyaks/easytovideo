import { useState, useEffect, useCallback, RefObject, MouseEvent, TouchEvent, useMemo } from 'react';

interface SubtitlePosition {
  y: number;
}

interface VideoDimensions {
  height: number;
  top: number;
}

interface UseSubtitlePositionProps {
  videoContainerRef: RefObject<HTMLDivElement | null>;
  initialPosition?: SubtitlePosition;
  subtitleHeight?: number;
}

interface UseSubtitlePositionReturn {
  subtitlePosition: SubtitlePosition;
  isDragging: boolean;
  handleMouseDown: (e: MouseEvent<HTMLDivElement>) => void;
  handleTouchStart: (e: TouchEvent<HTMLDivElement>) => void;
  getPositionData: () => {
    y_position: number;
    frontend_video_height: number;
    debug_info: {
      container_width: number;
      container_top: number;
      container_bottom: number;
      subtitle_y: number;
    };
  } | null;
}

export function useSubtitlePosition({
  videoContainerRef,
  initialPosition = { y: 0 },
  subtitleHeight = 60
}: UseSubtitlePositionProps): UseSubtitlePositionReturn {
  const [subtitlePosition, setSubtitlePosition] = useState<SubtitlePosition>(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [videoDimensions, setVideoDimensions] = useState<VideoDimensions>({ height: 0, top: 0 });

  // Memoize the resize observer callback
  const resizeObserverCallback = useCallback((entries: ResizeObserverEntry[]) => {
    const entry = entries[0];
    if (entry) {
      const rect = entry.target.getBoundingClientRect();
      setVideoDimensions({
        height: rect.height,
        top: rect.top
      });
      setSubtitlePosition(prev => ({
        ...prev,
        y: rect.height / 2 - subtitleHeight / 2
      }));
    }
  }, [subtitleHeight]);

  // Use ResizeObserver instead of window resize event
  useEffect(() => {
    if (!videoContainerRef.current) return;

    const resizeObserver = new ResizeObserver(resizeObserverCallback);
    resizeObserver.observe(videoContainerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [videoContainerRef, resizeObserverCallback]);

  const handleMouseDown = useCallback((e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOffset(e.clientY - subtitlePosition.y);
    setIsDragging(true);
  }, [subtitlePosition.y]);

  const handleMouseMove = useCallback((e: globalThis.MouseEvent) => {
    if (!isDragging || !videoContainerRef.current) return;
    
    const rect = videoContainerRef.current.getBoundingClientRect();
    const newY = Math.max(0, Math.min(e.clientY - dragOffset, rect.height - subtitleHeight));
    
    // Use functional update to prevent stale closures
    setSubtitlePosition(() => ({ y: newY }));
  }, [isDragging, dragOffset, subtitleHeight, videoContainerRef]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleTouchStart = useCallback((e: TouchEvent<HTMLDivElement>) => {
    e.preventDefault();
    const touch = e.touches[0];
    setDragOffset(touch.clientY - subtitlePosition.y);
    setIsDragging(true);
  }, [subtitlePosition.y]);

  const handleTouchMove = useCallback((e: globalThis.TouchEvent) => {
    if (!isDragging || !videoContainerRef.current) return;
    
    const touch = e.touches[0];
    const rect = videoContainerRef.current.getBoundingClientRect();
    const newY = Math.max(0, Math.min(touch.clientY - dragOffset, rect.height - subtitleHeight));
    
    setSubtitlePosition(() => ({ y: newY }));
  }, [isDragging, dragOffset, subtitleHeight, videoContainerRef]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (!isDragging) return;

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);
    document.addEventListener('touchcancel', handleTouchEnd);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('touchcancel', handleTouchEnd);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

  const getPositionData = useCallback(() => {
    if (!videoContainerRef.current) return null;
    
    const videoRect = videoContainerRef.current.getBoundingClientRect();
    return {
      y_position: subtitlePosition.y,
      frontend_video_height: videoRect.height,
      debug_info: {
        container_width: videoRect.width,
        container_top: videoRect.top,
        container_bottom: videoRect.bottom,
        subtitle_y: subtitlePosition.y
      }
    };
  }, [subtitlePosition.y]);

  return useMemo(() => ({
    subtitlePosition,
    isDragging,
    handleMouseDown,
    handleTouchStart,
    getPositionData
  }), [subtitlePosition, isDragging, handleMouseDown, handleTouchStart, getPositionData]);
}
