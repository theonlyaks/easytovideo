import React, { useCallback, useRef } from 'react';
import { useUpload } from '@/store';
import { MdCloudUpload, MdCancel } from 'react-icons/md';
import { UploadProps } from '@/types';



export const Upload: React.FC<UploadProps> = ({ userId, mediaType = 'video' }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { progress, state, error, startUpload, cancelUpload } = useUpload(userId, mediaType);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      startUpload(file);
    }
  }, [startUpload]);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      <input
        ref={fileInputRef}
        type="file"
        accept={mediaType === 'video' ? 'video/*' : 'audio/*'}
        onChange={handleFileChange}
        className="hidden"
        disabled={state === 'running'}
      />

      {(state !== 'running') && (
        <div 
          onClick={handleClick}
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors"
        >
          <MdCloudUpload className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm text-gray-600">Click to upload or drag and drop</p>
          <p className="text-xs text-gray-500">
            {mediaType === 'video' ? 'MP4, MOV, AVI' : 'MP3, WAV, OGG (max. 50MB)'}
          </p>
        </div>
      )}
      
      {state === 'running' && (
        <div className="space-y-2">
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div 
              className="bg-primary h-4 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex items-center justify-between px-2">
            <div className="text-sm text-gray-600">
              Uploading... {Math.round(progress)}%
            </div>
            <button
              onClick={cancelUpload}
              className="flex items-center px-3 py-1 text-sm text-red-500 hover:text-red-600"
            >
              <MdCancel className="mr-1" />
              Cancel
            </button>
          </div>
        </div>
      )}
      
      {error && (
        <div className="mt-4 text-red-500 text-sm text-center">{error}</div>
      )}
      
      {state === 'success' && (
        <div className="mt-4 text-green-500 text-sm text-center">
          Upload completed successfully!
        </div>
      )}
    </div>
  );
};
