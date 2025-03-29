import { Language } from "@/constants";
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

export type DisplayMode = 'single' | 'full' | 'group_progressive_active' | 'multi' | 'highlight';

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
  is_different_language_support?: boolean; // Add this line
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
    isDifferentLanguage?: boolean;
    isCapital?: boolean;
    onCapitalChange?: (isCapital: boolean) => void;
  }
  
  export interface SubtitleSegment {
    id: number;
    avg_logprob: number;
    compression_ratio: number;
    end: number;
    no_speech_prob: number;
    seek: number;
    start: number;
    temperature: number;
    text: string;
    tokens: number[];
  }

  export interface SubtitleData {
    duration: number;
    language: string;
    subtitleType: string;
    segments?: SubtitleSegment[];
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
    customization?: {
      font?: string;
      size?: string;
      color?: string;
    };
    targetLanguage?: Language;
  }

export interface ThemeConfig {
  themeId: string;
  fontId: string;
  fontSize: string; // Explicitly string type
  color: string;
}

export interface ThemeSelectorProps {
  onNext: (config: ThemeConfig) => void;
  onPrevious: (config: ThemeConfig) => void;
  initialCustomization: ThemeConfig;
  isDifferentLanguage?: boolean; 
  targetLanguage?: string;
}

export interface VideoProcessingOptions {
  videoLang: string;
  subtitleType: string;
}