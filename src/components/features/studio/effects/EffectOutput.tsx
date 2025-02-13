import { User } from '@/types';
import { useDocument } from '@/store/hooks/useDocument';
import { useStorageUrl } from '@/store/hooks/useStorageUrl';
import { Project } from '@/types';
import { VideoPlayer } from '@/components/common/VideoPlayer';
import Button from '@/components/common/Button';
import { FiDownload, FiCheckCircle, FiEdit2 } from 'react-icons/fi';
import { useFileDownload } from '@/store/hooks/useFileDownload';
import { getFilenamePartByIndex } from '@/lib/common/file';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { useState, useEffect } from 'react';
import { FirebaseDocumentService } from '@/services/firebase/document';
import { serverTimestamp } from 'firebase/firestore';

interface EffectOutputProps {
  effectId: string;
  user: User | null;
}

export function EffectOutput({ effectId, user }: EffectOutputProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('');
  const { data: project, loading, error } = useDocument<Project>('projects', effectId);
  const storagePath = project && user ? `user_files/${user.uid}/${project.outputFileName}` : null;
  const { url: videoUrl, loading: urlLoading } = useStorageUrl(storagePath);
  const { downloadFile, isDownloading } = useFileDownload();

  useEffect(() => {
    if (project?.title) {
      setTitle(project.title);
    }
  }, [project?.title]);

  const handleDownload = () => {
    if (!videoUrl || !project?.outputFileName) return;
    downloadFile(videoUrl, { fileName: getFilenamePartByIndex(project.outputFileName,'original') || ''});
  };

  const handleTitleUpdate = async () => {
    if (!project || !title.trim()) return;
    
    try {
      await FirebaseDocumentService.updateDocument('projects', effectId, {
        title: title.trim(),
        updatedAt: serverTimestamp()
      });
      setIsEditing(false);
    } catch (error) {
      //console.error('Error updating title:', error);
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
    <div className="max-w-6xl mx-auto py-6 md:py-12 px-2 mt-8 sm:mt-0 md:px-0">
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
                  Your video is ready! You can preview or download it below.
                </span>
              </div>
            </div>
          )}
  
          <div>
            {isEditing ? (
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onBlur={handleTitleUpdate}
                onKeyDown={(e) => e.key === 'Enter' && handleTitleUpdate()}
                className="px-3 py-2 text-lg md:text-xl border border-accent rounded-md 
                         focus:outline-none focus:ring-2 focus:ring-accent w-full"
                autoFocus
                placeholder="Enter title..."
              />
            ) : (
              <div className="flex items-center gap-2">
                <h1 className="text-lg md:text-2xl font-semibold text-background-text truncate">
                  {title || 'Untitled'}
                </h1>
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-1 hover:text-accent transition-colors"
                >
                  <FiEdit2 className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
  
          {videoUrl && (
            <Button
              onClick={handleDownload}
              icon={FiDownload}
              variant="primary"
              isLoading={isDownloading}
              disabled={isDownloading}
              className="w-full"
            >
              {isDownloading ? 'Downloading...' : 'Download Video'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
