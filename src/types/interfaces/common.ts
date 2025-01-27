export interface AudioLanguageData {
  code: string;
  country: string;
  default_voice_id: string;
  default_voice_name: string;
  name: string;
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export interface AudioVoice {
  description: string;
  language_code: string;
  name: string;
  source: string;
  tags: Record<string, boolean>;
  url: string;
  voice_id: string;
}

export interface SelectWithPlayProps extends Omit<SelectProps, 'options'> {
  options: (AudioVoice & { label: string; value: string })[];
}

export interface SuggestionItem {
  icon: string;
  text: string;
}

export interface SuggestionGroupProps {
  suggestions: SuggestionItem[];
  onSelect: (text: string) => void;
}

export interface QuickActionButtonProps {
  icon: React.ReactNode;
  label: string;
  description: string;
  onClick: () => void;
}

export interface QuickActionsProps {
  onCreateAiEffect: () => void;
}

export interface FileItem {
  id: string;
  fileName: string;
  fileUrl: string;
  createdAt: Date;
  fileSize: number;
  fileType: string;
}
import { User } from '@/types';

export interface FileListProps {
  user: User | null;
  onSelect?: (file: FileItem) => void;
}

export interface SyncTaskConfig {
  serviceFunction: (...args: any[]) => Promise<any>;
  args?: any[];
  loadingMessage?: string;
  successMessage?: string;
  errorMessage?: string;
}

export interface SyncTaskResult {
  state: 'loading' | 'success' | 'error';
  text: string;
  isOpen: boolean;
}

export type FilenamePart = 'original' | 'timestamp' | 'type' | 'source';

