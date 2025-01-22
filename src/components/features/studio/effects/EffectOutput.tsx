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
      console.error('Error updating title:', error);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-12 flex flex-col items-center space-y-4">
        <LoadingSpinner size="lg" color="primary" />
        <span className="text-background-text">Loading project data...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto py-12">
        <p className="text-red-500">Error: {error.message}</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="max-w-4xl mx-auto py-12">
        <p>Project not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12">
      {videoUrl && (
        <div className="bg-accent/10 border border-accent rounded-lg p-4 mb-8 flex items-center">
          <FiCheckCircle className="text-accent w-6 h-6 mr-3" />
          <span className="text-background-text font-medium">Your video is ready! You can preview or download it below.</span>
        </div>
      )}

      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2">
          {isEditing ? (
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={handleTitleUpdate}
              onKeyDown={(e) => e.key === 'Enter' && handleTitleUpdate()}
              className="px-3 py-2 text-xl border border-accent rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
              autoFocus
              placeholder="Enter title..."
            />
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-2xl font-semibold text-background-text">{title || 'Untitled'}</span>
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
          >
            {isDownloading ? 'Downloading...' : 'Download Video'}
          </Button>
        )}
      </div>
      <div className="p-4 border rounded-lg space-y-4">        
        {urlLoading ? (
          <p>Loading video URL...</p>
        ) : videoUrl ? (
          <div className="space-y-4">
            <VideoPlayer
              source={videoUrl}
              onDuration={() => {}}
            />
          </div>
        ) : (
          <p className="text-red-500">Failed to load video</p>
        )}
      </div>
    </div>
  );
}
