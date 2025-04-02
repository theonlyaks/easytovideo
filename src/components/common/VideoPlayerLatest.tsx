"use client"

import { useState, useRef, useEffect, useCallback, memo } from "react"
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaExpand } from "react-icons/fa"
import { LoadingSpinner } from "@/components/common/LoadingSpinner"

interface VideoPlayerLatestProps {
  source: string;
  poster?: string;
  aspectRatio?: string; // '16/9', '9/16', etc.
  showWatermark?: boolean;
  watermarkText?: string;
  onTogglePlay?: (isPlaying: boolean) => void;
}

// Memoized buffering indicator for better performance
const BufferingIndicator = memo(() => (
  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 bg-black/40 rounded-full p-4">
    <LoadingSpinner size="md" color="primary" />
  </div>
));
BufferingIndicator.displayName = 'BufferingIndicator';

// Memoized watermark component
const Watermark = memo(({ text }: { text: string }) => (
  <div className="absolute top-4 right-4 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full text-white text-xs font-medium">
    {text}
  </div>
));
Watermark.displayName = 'Watermark';

export default function VideoPlayerLatest({
  source,
  aspectRatio = "9/16",
  showWatermark = true,
  watermarkText = "Made with EasyToVideo",
  onTogglePlay
}: VideoPlayerLatestProps) {
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [progress, setProgress] = useState(0)
  const [showControls, setShowControls] = useState(true)
  const [isBuffering, setIsBuffering] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  
  // Fix: Properly initialize the timeout ref with null or undefined
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Format time (seconds to MM:SS) - memoized for performance
  const formatTime = useCallback((time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }, []);

  // Control video playback - memoized
  const togglePlay = useCallback(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play().catch(e => console.error('Error playing video:', e))
      }
      setIsPlaying(!isPlaying)
      onTogglePlay?.(!isPlaying)
    }
  }, [isPlaying, onTogglePlay])

  // Toggle mute - memoized
  const toggleMute = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }, [isMuted])

  // Handle fullscreen - memoized
  const toggleFullscreen = useCallback(() => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(e => console.error('Error exiting fullscreen:', e))
      } else {
        videoRef.current.requestFullscreen().catch(e => console.error('Error entering fullscreen:', e))
      }
    }
  }, [])

  // Handle progress bar click - memoized
  const handleProgressClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    
    if (videoRef.current && progressRef.current) {
      const rect = progressRef.current.getBoundingClientRect()
      const pos = (e.clientX - rect.left) / rect.width
      videoRef.current.currentTime = pos * videoRef.current.duration
    }
  }, [])

  // Reset controls timeout to keep controls visible during user activity
  const resetControlsTimeout = useCallback(() => {
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current)
      controlsTimeoutRef.current = null
    }
    
    setShowControls(true)
    
    // Only hide controls when video is playing
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false)
      }, 3000)
    }
  }, [isPlaying])

  // Update progress as video plays and handle buffering
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const updateProgress = () => {
      setCurrentTime(video.currentTime)
      setProgress((video.currentTime / video.duration) * 100)
    }

    const handleLoadedMetadata = () => {
      setDuration(video.duration)
      setIsBuffering(false)
    }

    const handleWaiting = () => {
      setIsBuffering(true)
    }

    const handlePlaying = () => {
      setIsBuffering(false)
    }

    const handleCanPlay = () => {
      setIsBuffering(false)
    }

    // If video source changes, reset state and load new video
    video.addEventListener("loadstart", () => {
      setCurrentTime(0)
      setProgress(0)
      setIsBuffering(true)
    })

    video.addEventListener("timeupdate", updateProgress)
    video.addEventListener("loadedmetadata", handleLoadedMetadata)
    video.addEventListener("waiting", handleWaiting)
    video.addEventListener("playing", handlePlaying)
    video.addEventListener("canplay", handleCanPlay)

    // Set up mousemove event to keep controls visible
    document.addEventListener("mousemove", resetControlsTimeout)

    // Initial call to set timeout
    resetControlsTimeout()

    return () => {
      video.removeEventListener("loadstart", () => {})
      video.removeEventListener("timeupdate", updateProgress)
      video.removeEventListener("loadedmetadata", handleLoadedMetadata)
      video.removeEventListener("waiting", handleWaiting)
      video.removeEventListener("playing", handlePlaying)
      video.removeEventListener("canplay", handleCanPlay)
      document.removeEventListener("mousemove", resetControlsTimeout)
      
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current)
        controlsTimeoutRef.current = null
      }
    }
  }, [resetControlsTimeout, source]) // Added source to dependencies to handle source changes

  // Effect to handle keyboard shortcuts for video control
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement?.tagName === 'INPUT' || 
          document.activeElement?.tagName === 'TEXTAREA') {
        return
      }
      
      switch (e.key.toLowerCase()) {
        case ' ':
        case 'k':
          togglePlay()
          e.preventDefault()
          break
        case 'm':
          toggleMute()
          e.preventDefault()
          break
        case 'f':
          toggleFullscreen()
          e.preventDefault()
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [togglePlay, toggleMute, toggleFullscreen])

  return (
    <div
      className={`relative bg-black cursor-pointer aspect-[${aspectRatio}]`}
      onClick={togglePlay}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => isPlaying && setShowControls(false)}
      onMouseMove={resetControlsTimeout}
      role="region"
      aria-label="Video player"
    >
      <video
        ref={videoRef}
        className="w-full h-full object-contain"
        autoPlay
        src={source}
        onClick={(e) => {
          e.stopPropagation()
          togglePlay()
        }}
      />

      {/* Buffering Indicator */}
      {isBuffering && <BufferingIndicator />}

      {/* Watermark */}
      {showWatermark && <Watermark text={watermarkText} />}

      {/* Video Controls */}
      <div
        className={`absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent transition-opacity duration-300 ${
          showControls ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Center Play Button (when paused) */}
        {!isPlaying && !isBuffering && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="h-16 w-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <FaPlay className="h-8 w-8 text-white" />
            </div>
          </div>
        )}

        {/* Bottom Controls */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          {/* Progress Bar */}
          <div
            ref={progressRef}
            className="h-1 bg-white/30 rounded-full mb-4 cursor-pointer"
            onClick={handleProgressClick}
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
          >
            <div
              className="h-full bg-gradient-to-r from-primary to-secondary rounded-full relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 h-3 w-3 bg-white rounded-full shadow"></div>
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={togglePlay} 
                className="text-white hover:text-primary transition-colors"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <FaPause className="h-5 w-5" /> : <FaPlay className="h-5 w-5" />}
              </button>
              <button 
                onClick={toggleMute} 
                className="text-white hover:text-primary transition-colors"
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <FaVolumeMute className="h-5 w-5" /> : <FaVolumeUp className="h-5 w-5" />}
              </button>
              <div className="text-white text-sm">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
            </div>
            <div>
              <button 
                onClick={toggleFullscreen} 
                className="text-white hover:text-primary transition-colors"
                aria-label="Toggle fullscreen"
              >
                <FaExpand className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
