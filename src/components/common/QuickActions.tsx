import React from 'react';
import { MdAdd, MdContentCopy, MdVideoLibrary, MdImportExport } from 'react-icons/md';
import { QuickActionsProps } from '@/types';
import { QuickActionButton } from '@/components/common/QuickActionButton';

export const QuickActions: React.FC<QuickActionsProps> = ({
  onCreateAiEffect
}) => {
  return (
    <div className="mb-8">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <QuickActionButton
          icon={<MdAdd className="h-6 w-6" />}
          label="Add AI effects"
          description="One click to add AI effects"
          onClick={onCreateAiEffect}
        />
        {/* <QuickActionButton
          icon={<MdImportExport className="h-6 w-6" />}
          label="Import"
          description="Import from YouTube"
          onClick={onImport}
        />
        <QuickActionButton
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
