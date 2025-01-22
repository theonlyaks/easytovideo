import React from 'react';
import { FiDownload, FiPlus, FiCheck } from 'react-icons/fi';
import Button from '@/components/common/Button';
import { getFilenamePartByIndex } from '@/lib/common/file';

interface AudioPlayerProps {
  audioUrl: string;
  title: string;
  onDownload?: () => void;
  onAdd?: () => void;
  className?: string;
  isUploading?: boolean;
  isAdded?: boolean;
  fileName?: string;  // Add fileName prop
}

export function AudioPlayer({
  audioUrl,
  title,
  onDownload,
  onAdd,
  className = '',
  isUploading = false,
  isAdded = false,
  fileName,  // Add fileName to destructuring
}: AudioPlayerProps) {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = audioUrl;
    // If it's a generated filename (contains @1), extract original part, otherwise use as is
    const downloadName = fileName || 'generated-speech.mp3';
    link.download = downloadName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  
  return (
    <div className={`bg-gray-50 rounded-lg p-4 ${className}`}>
      <div className="space-y-3">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h3 className="text-lg font-medium">{title}</h3>
            {fileName && <p className="text-sm text-gray-500">{fileName}</p>}
          </div>
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