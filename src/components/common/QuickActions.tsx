import React from 'react';
import { MdAdd, MdContentCopy, MdVideoLibrary, MdImportExport } from 'react-icons/md';
import { QuickActionsProps } from '@/types';
import { QuickActionButton } from '@/components/common/QuickActionButton';
import { FiAlignCenter } from 'react-icons/fi';

export const QuickActions: React.FC<QuickActionsProps> = ({
  onCreateAiEffect,
  onCreateSubtitle
}) => {
  return (
    <div className="mb-8">
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <QuickActionButton
          icon={<FiAlignCenter className="h-6 w-6" />}
          label="Add Subtitle"
          description=""
          onClick={onCreateSubtitle}
        />
         <QuickActionButton
          icon={<MdAdd className="h-6 w-6" />}
          label="Speech To Visuals"
          description=""
          onClick={onCreateAiEffect}
        />
        {/* <QuickActionButton
          icon={<MdContentCopy className="h-6 w-6" />}
          label="Duplicate"
          description="Copy existing project"
          onClick={onDuplicate}
        />
        <QuickActionButton
          icon={<MdVideoLibrary className="h-6 w-6" />}
          label="Templates"
          description="Start from template"
          onClick={onTemplate}
        /> */}
      </div>
    </div>
  );
};
