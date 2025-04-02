import { useDocument } from '@/store/hooks/useDocument';
import { useStorageUrl } from '@/store/hooks/useStorageUrl';
import { Project } from '@/types';
import { VideoPlayer } from '@/components/common/VideoPlayer';
import Button from '@/components/common/Button';
import { FiDownload, FiCheckCircle, FiEdit3, FiShare2 } from 'react-icons/fi';
import { useFileDownload } from '@/store/hooks/useFileDownload';
import { getFilenamePartByIndex } from '@/lib/common/file';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { FeedbackEffect } from '@/components/features/studio/effects/FeedbackEffect';
import { SubtitleOutputProps } from '@/types';
import { useShare } from '@/store/hooks/useShare';
import { useState } from 'react';

export function SubtitleOutput({ effectId, user, onEdit }: SubtitleOutputProps) {
  const { data: project, loading, error } = useDocument<Project>('projects', effectId);
  const storagePath = project && user ? `user_files/${user.uid}/${project.outputFileName}` : null;
  const { url: videoUrl, loading: urlLoading } = useStorageUrl(storagePath);
  const { downloadFile, isDownloading } = useFileDownload();
  const { shareContent, isSharing, shareUrl } = useShare();
  const [showShareUrl, setShowShareUrl] = useState(false);

  const handleDownload = () => {
    if (!videoUrl || !project?.outputFileName) return;
    const fileName = getFilenamePartByIndex(project.outputFileName, 'original') || 'video.mp4';
  
    const a = document.createElement('a');
    a.href = videoUrl;
    a.download = fileName;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.click();
  };

  const handleShare = async () => {
    if (!videoUrl || !user) return;
    
    const url = await shareContent({
      type: 'subtitle',
      videoUrl: videoUrl,
      userName: user.name || user.email || 'Anonymous User',
      thumbnailUrl: project?.thumbnailUrl
    });
    
    if (url) {
      setShowShareUrl(true);
      // Copy to clipboard without toast
      navigator.clipboard.writeText(url)
        .then(() => console.log('URL copied to clipboard'))
        .catch(err => console.error('Failed to copy URL', err));
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-6 md:py-12 px-4 md:px-0 flex flex-col items-center space-y-4">
        <LoadingSpinner size="lg" color="primary" />
        <span className="text-sm md:text-base text-background-text">Loading project data...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto py-6 md:py-12 px-4 md:px-0">
        <p className="text-sm md:text-base text-red-500">Error: {error.message}</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="max-w-4xl mx-auto py-6 md:py-12 px-4 md:px-0">
        <p className="text-sm md:text-base">Project not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-2">
      <div className="flex flex-col-reverse md:flex-row gap-4 md:gap-8">
        {/* Left side - Video Player */}
        <div className="w-full md:w-2/3">
          <div className="border rounded-lg overflow-hidden">
            {urlLoading ? (
              <div className="flex items-center justify-center p-8">
                <LoadingSpinner size="md" color="primary" />
              </div>
            ) : videoUrl ? (
              <div className="flex justify-center">
                <VideoPlayer
                  source={videoUrl}
                  onDuration={() => {}}
                  controls = {true}
                />
              </div>
            ) : (
              <div className="flex items-center justify-center p-8">
                <p className="text-sm md:text-base text-red-500">Failed to load video</p>
              </div>
            )}
          </div>
        </div>
  
        {/* Right side - Controls (appears on top in mobile) */}
        <div className="w-full md:w-1/3 space-y-4 md:space-y-6">
          {videoUrl && (
            <div className="bg-accent/10 border border-accent rounded-lg p-3 sm:p-4  ">
              <div className="flex items-center gap-2 md:gap-3">
                <FiCheckCircle className="text-accent w-5 h-5 md:w-6 md:h-6 flex-shrink-0" />
                <span className="text-sm md:text-base text-background-text font-medium">
                  Your subtitle video is ready! You can preview or download it below.
                </span>
              </div>
            </div>
          )}

  
          {videoUrl && (
            <>
              <Button
                onClick={handleDownload}
                icon={FiDownload}
                variant="primary"
                isLoading={isDownloading}
                disabled={isDownloading}
                className="w-full bg-gradient-to-r from-primary to-secondary text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                size='md'
              >
                {isDownloading ? 'Downloading...' : 'Download Video'}
              </Button>
              
              <Button
                onClick={handleShare}
                icon={FiShare2}
                variant="secondary"
                isLoading={isSharing}
                disabled={isSharing}
                className="w-full"
                size='md'
              >
                {isSharing ? 'Sharing...' : 'Share Video'}
              </Button>
              
              {showShareUrl && shareUrl && (
                <div className="bg-background-light p-3 rounded-lg break-all">
                  <p className="text-xs text-background-text mb-1">Share URL (copied to clipboard):</p>
                  <a href={shareUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">{shareUrl}</a>
                </div>
              )}
              
              <Button
                onClick={onEdit}
                icon={FiEdit3}
                size='md'
                variant="outline"
                className="w-full"
              >
                Edit Subtitles
              </Button>
            </>
          )}
          <hr/>
          {videoUrl && (
            <div className="hidden md:block">
              <FeedbackEffect 
                projectId={effectId}
                userId={user?.uid}
              />
            </div>
          )}
        </div>
      </div>
      {videoUrl && (
        <div className="md:hidden mt-4">
          <FeedbackEffect 
            projectId={effectId}
            userId={user?.uid}
          />
        </div>
      )}
    </div>
  );
}
