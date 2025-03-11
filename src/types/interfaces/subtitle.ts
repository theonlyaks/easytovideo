import { User } from "./auth";

export interface PositionSelectorProps {
  videoUrl: string;
  onNext: () => void;
  onCancel: () => void;
  onPositionUpdate: (position: { frontend_video_height: number; y_position: number }) => void;
}


export interface ThemeProps {
  backgroundColor: string;
  textColor: string;
  fontFamily: string;
  fontWeight: string;
  fontSize: string;
}

export type DisplayMode = 'single' | 'full' | 'progressive' | 'multi' | 'highlight';

export interface SubtitleTheme {
  id: string;
  name: string;
  backgroundColor: string;
  textBackgroundColor?: string; // Added this line
  textColor: string;
  fontFamily: string;
  fontWeight: string;
  fontSize: string;
  displayMode: DisplayMode;
  preview: string;
  highlightColor?: string;
}

export interface Preset {
  name: string;
  backgroundColor: string;
  textColor: string;
  fontFamily: string;
  fontWeight: string;
  fontSize: string;
  wordMode: DisplayMode;
}

export interface Option {
  label: string;
  value: string;
}

export interface VideoValidationProps {
    videoUrl: string;
    onDuration: (duration: number, videoElement: HTMLVideoElement) => void;
    errorMessage: string | null;
    onCancel: () => void;
    isTranscribing?: boolean;
  }

  export interface SubtitleOutputProps {
    effectId: string;
    user: User | null;
    onEdit: () => void;
  }

  export interface TextEditorProps {
    onNext: () => void;
    onPrevious: () => void;
    transcription: SubtitleData | null;
    onTranscriptionUpdate: (newTranscription: SubtitleData) => void;
  }
  
  export interface SubtitleData {
    duration: number;
    language: string;
    words: Array<{
      end: number;
      start: number;
      word: string;
    }>;
  }
  
export  interface EditProps {
    projectId: string;
    user: User | null;
  }

export interface FileSelectorProps {
    onOpenFileManager: () => void;
  }

export interface SubtitleThemePreviewProps {
    theme: SubtitleTheme;
  }

export interface ThemeSelectorProps {
  onNext: (themeId: string) => void;
  onPrevious: () => void;
}