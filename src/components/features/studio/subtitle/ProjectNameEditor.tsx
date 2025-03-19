"use client";

import React, { useState, useEffect } from 'react';
import { FiEdit2, FiSave, FiX } from "react-icons/fi";
import { FirebaseDocumentService } from '@/services/firebase/document';
import { serverTimestamp } from 'firebase/firestore';

interface ProjectNameEditorProps {
  projectId: string;
  initialTitle?: string;
}

export function ProjectNameEditor({ projectId, initialTitle = '' }: ProjectNameEditorProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(initialTitle);

  useEffect(() => {
    setTitle(initialTitle);
  }, [initialTitle]);

  const handleTitleUpdate = () => {
    if (!projectId || !title.trim()) return;
    
    FirebaseDocumentService.updateDocument('projects', projectId, {
      title: title.trim(),
      updatedAt: serverTimestamp()
    });
    setIsEditing(false);
  };

  return (
    <div className="max-w-6xl mx-auto my-6">
      <div className="flex items-center md:justify-center w-full  bg-background">
        {isEditing ? (
          <div className="flex items-center gap-2 w-full max-w-xl px-2 sm:px-6">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleTitleUpdate()}
              className="px-2 py-2 text-base sm:text-xl w-full border border-muted rounded-md 
                       focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent
                       transition-all duration-200 bg-background text-background-text"
              autoFocus
              placeholder="Enter title..."
            />
            <button
              onClick={handleTitleUpdate}
              className="p-1.5 sm:p-2 rounded-md bg-accent text-accent-text hover:bg-primary transition-colors flex-shrink-0"
              aria-label="Save title"
            >
              <FiSave className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="p-1.5 sm:p-2 rounded-md bg-muted text-muted-text hover:bg-neutral transition-colors flex-shrink-0"
              aria-label="Cancel editing"
            >
              <FiX className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        ) : (
          <div className="flex sm:items-center gap-2 w-full max-w-xl px-2 sm:px-6">
            <p className="text-lg sm:text-2xl font-medium text-background-text flex-1 sm:text-center truncate">
              <span className="truncate">{title || 'My Video'}</span> <span className="text-neutral/50 whitespace-nowrap"></span> <span className="text-primary whitespace-nowrap">Subtitle Editor</span>
            </p>
            <button
              onClick={() => setIsEditing(true)}
              className="p-1.5 sm:p-2 rounded-full hover:bg-muted text-muted-text hover:text-accent transition-all duration-200 flex-shrink-0"
              aria-label="Edit title"
            >
              <FiEdit2 className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
