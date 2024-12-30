"use client";

import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { MdAdd, MdMovie } from 'react-icons/md';
import { useProjectUpdates, useProjects } from '@/store';
import { ProjectSingle } from '@/components/common/ProjectSingle';
import { SkeletonLoader } from '@/components/common/SkeletonProjectLoader';
import { SectionHeader } from '@/components/common/SectionHeader';
import { QuickActions } from '@/components/common/QuickActions';
import { User } from '@/types';
import { Modal } from '@/components/common/Modal';
import { Upload } from '@/components/common/Upload';
import { FileManager } from '@/components/common/FileManager';
import { FileItem } from '@/types/interfaces/common';

interface ProjectsProps {
  user: User | null;
}

export function ProjectListComponent({ user }: ProjectsProps) {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isFileManagerOpen, setIsFileManagerOpen] = useState(false);
  const [fileManagerMode, setFileManagerMode] = useState<'import' | 'duplicate'>('import');
  const { projects, loading } = useProjects(user);
  const updatedProjects = useProjectUpdates(projects);
  const router = useRouter();

  const handleProjectClick = (projectId: string, status: string) => {
    if (status !== 'processing') {
      router.push(`/project/video/${projectId}`);
    }
  };

  const handleCreateNew = () => {
    setIsUploadModalOpen(true);
  };

  const handleModalClose = useCallback(() => {
    setIsUploadModalOpen(false);
    setIsFileManagerOpen(false);
  }, []);

  const handleFileSelect = (file: FileItem) => {

    console.log("asdsadas",file)
    if (fileManagerMode === 'import') {
      // Handle import logic
    } else if (fileManagerMode === 'duplicate') {
      // Handle duplicate logic
    }
    handleModalClose();
  };

  const handleImport = () => {
    setFileManagerMode('import');
    setIsFileManagerOpen(true);
  };

  const handleDuplicate = () => {
    setFileManagerMode('duplicate');
    setIsFileManagerOpen(true);
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <QuickActions 
          onCreateNew={handleCreateNew}
          onImport={handleImport}
          onDuplicate={handleDuplicate}
          onTemplate={() => router.push('/project/templates')}
        />

        <SectionHeader 
          title="Recent Projects"
          subtitle="Transform your content into engaging videos with AI-powered editing tools"
        />

        {loading ? (
          <SkeletonLoader />
        ) : (!updatedProjects || updatedProjects.length === 0) ? (
          <div className="text-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center mb-4">
              <MdMovie className="h-24 w-24 text-gray-400" />
            </div>
            <button
              onClick={() => router.push("/project")}
              className="inline-flex items-center px-6 py-3 border border-transparent 
                       text-base font-medium rounded-md shadow-sm text-primary-text 
                       bg-primary hover:bg-opacity-90 
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary
                       transition-colors duration-200"
            >
              <MdAdd className="mr-2 -ml-1 h-5 w-5" />
              Create New Project
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {updatedProjects.map((project) => (
              <ProjectSingle
                key={project.id}
                project={project}
                onClick={handleProjectClick}
              />
            ))}
          </div>
        )}

        <Modal 
          isOpen={isUploadModalOpen} 
          onClose={handleModalClose}
        >
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Upload Video</h2>
            {user?.id ? (
              <Upload userId={user.id} />
            ) : (
              <div className="text-red-500 text-center">
                Please sign in to upload files
              </div>
            )}
          </div>
        </Modal>

        <Modal 
          isOpen={isFileManagerOpen} 
          onClose={handleModalClose}
        >
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">
              {fileManagerMode === 'import' ? 'Import from Files' : 'Select Video file to work on'}
            </h2>
            {user ? (
              <FileManager 
                user={user} 
                onSelect={handleFileSelect}
              />
            ) : (
              <div className="text-red-500 text-center">
                Please sign in to manage files
              </div>
            )}
          </div>
        </Modal>
      </div>
    </div>
  );
}
