import { FileListProps } from '@/types';
import { getFileTypeIcon, getFileTypeLabel, getFilenamePartByIndex } from '@/lib/common/file';
import { useFilesList } from '@/store';
import { LoadingSpinner } from './LoadingSpinner';
import { FaFileAlt } from 'react-icons/fa';

export const FileList = ({ user, onSelect }: FileListProps) => {
  const { files, loading, error } = useFilesList(user);

  // Filter for video files only
  const videoFiles = files.filter(file => 
    file.fileType.startsWith('video/') || 
    ['mp4', 'webm', 'ogg'].includes(file.fileType.split('/')[1])
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <LoadingSpinner color='primary' text='Fetching files...'/>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[200px] text-sm md:text-base text-red-500">
        {error}
      </div>
    );
  }

  if (videoFiles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[200px] gap-2 text-muted-text">
        <FaFileAlt className="w-8 h-8 md:w-10 md:h-10" />
        <div className="text-sm md:text-base">No video files found</div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-background-text">
        Your Video Files
      </h2>
      
      <div className="space-y-2 max-h-[50vh] md:max-h-[60vh] overflow-y-auto 
                    scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent 
                    pr-2 -mr-2">
        {videoFiles.map((file) => (
          <div key={file.id} 
               className="bg-white/50 hover:bg-white/80 transition-colors duration-200 
                        rounded-lg p-3 md:p-4">
            <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
              <div className="flex items-start md:items-center gap-3 flex-1 min-w-0">
                {(() => {
                  const { Icon, props } = getFileTypeIcon(file.fileType);
                  return <Icon {...props} />;
                })()}
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm md:text-base text-background-text truncate">
                    {getFilenamePartByIndex(file.fileName,'original')}
                  </h3>
                  
                  <div className="flex flex-wrap gap-x-2 md:gap-x-3 gap-y-1 text-xs md:text-sm text-muted-text">
                    <span>{getFileTypeLabel(file.fileType)}</span>
                    <span className="hidden md:inline">•</span>
                    <span>{(file.fileSize / 1024 / 1024).toFixed(2)} MB</span>
                    <span className="hidden md:inline">•</span>
                    <span>{file.createdAt.toLocaleDateString()}</span>
                    <span className="hidden md:inline">•</span>
                    <span className="truncate max-w-[150px]">
                      {getFilenamePartByIndex(file.fileName, 'source')}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onSelect?.(file)}
                className="w-full md:w-auto px-4 py-2 bg-primary text-secondary-text 
                         rounded-md hover:bg-opacity-90 active:bg-opacity-100
                         transition-colors duration-200 text-sm md:text-base
                         focus:outline-none focus:ring-2 focus:ring-offset-2 
                         focus:ring-primary shadow-sm"
              >
                Select
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

