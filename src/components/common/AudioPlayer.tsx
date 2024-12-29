import React from 'react';
import { FiDownload, FiPlus, FiCheck } from 'react-icons/fi';
import Button from '@/components/common/Button';

interface AudioPlayerProps {
  audioUrl: string;
  title: string;
  onDownload?: () => void;
  onAdd?: () => void;
  className?: string;
  isUploading?: boolean;
  isAdded?: boolean;
}

export function AudioPlayer({
  audioUrl,
  title,
  onDownload,
  onAdd,
  className = '',
  isUploading = false,
  isAdded = false,
}: AudioPlayerProps) {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = audioUrl;
    link.download = 'generated-speech.mp3';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={`bg-gray-50 rounded-lg p-4 ${className}`}>
      <div className="space-y-3">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-medium">{title}</h3>
          <div className="flex gap-2">
            <Button
              onClick={onDownload || handleDownload}
              variant="secondary"
              size="sm"
              icon={FiDownload}
            >
              Download
            </Button>
            <Button
              onClick={onAdd}
              variant="secondary"
              size="sm"
              icon={isAdded ? FiCheck : FiPlus}
              isLoading={isUploading}
              customLoadingText={isAdded ? 'Removing...' : 'Adding...'}
            >
              {isAdded ? 'Added' : 'Add'}
            </Button>
          </div>
        </div>

        <audio controls className="w-full">
          <source src={audioUrl} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
    </div>
  );
}