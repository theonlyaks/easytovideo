import { FileListProps } from '@/types';
import { getFileTypeIcon, getFileTypeLabel, getFilenamePartByIndex } from '@/lib/common/file';
import { useFilesList } from '@/store';
import { LoadingSpinner } from './LoadingSpinner';
import { FaFileAlt } from 'react-icons/fa'; // Add this import

export const FileList = ({ user, onSelect }: FileListProps) => {
  const { files, loading, error } = useFilesList(user);

  if (loading) {
    return <LoadingSpinner color='primary' text='Fetching files...'/>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (files.length === 0) {
    return (
      <div className="flex items-center mt-4 justify-center text-muted-text">
        <FaFileAlt className="mr-2" size={24} /> {/* Use FontAwesome icon */}
        <div>No files found</div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-4 text-background-text">Your Files</h2>
      <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-2">
        {files.map((file) => (
          <div key={file.id}>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                {(() => {
                  const { Icon, props } = getFileTypeIcon(file.fileType);
                  return <Icon {...props} />;
                })()}
                <div>
                  <h3 className="font-medium text-background-text">{getFilenamePartByIndex(file.fileName,'original')}</h3>
                  <div className="flex space-x-3 text-sm text-muted-text">
                    <span>{getFileTypeLabel(file.fileType)}</span>
                    <span>•</span>
                    <span>{(file.fileSize / 1024 / 1024).toFixed(2)} MB</span>
                    <span>•</span>
                    <span>{file.createdAt.toLocaleDateString()}</span>
                    <span>•</span>
                    <span>{getFilenamePartByIndex(file.fileName, 'source')}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => onSelect?.(file)}
                className="px-4 py-2 bg-primary text-secondary-text rounded 
                         hover:bg-opacity-90 transition-colors duration-200
                         focus:outline-none focus:ring-2 focus:ring-offset-2 
                         focus:ring-primary"
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

