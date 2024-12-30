import React from 'react';
import { Upload } from './Upload';
import { FileList } from './FileList';
import { FileItem } from '@/types/interfaces/common';
import { User } from '@/types';

interface FileManagerProps {
  user: User | null;
  onSelect?: (file: FileItem) => void;
}

export const FileManager: React.FC<FileManagerProps> = ({ user, onSelect }) => {
  if (!user) {
    return (
      <div className="text-red-500 text-center p-4">
        Authentication required to access files
      </div>
    );
  }

  const handleFileUploaded = (file: FileItem) => {
    onSelect?.(file);
  };

  return (
    <div className="space-y-6">
      <Upload userId={user.id}/>
      <div className="mt-8">
        <FileList user={user} onSelect={onSelect} />
      </div>
    </div>
  );
};
