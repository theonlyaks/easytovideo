import { Timestamp } from 'firebase/firestore';

export interface Project {
  id?: string;
  email?: string;
  title?: string;
  status?: string;
  duration?: number;
  updation_time?: Timestamp;
  is_active?: boolean;
  signed_url_image?: string;
  remainingTime?: string;
  startTime?: number;
  endTime?: number;
  userId?: string;
  type?: string;
  fileName?: string;
  updatedAt?: Timestamp;
  statusMessage?:string;
  progress?: number;
  outputFileName?: string;
  thumbnailFilename?:string;
  isOriginalClip?:boolean;
  thumbnailUrl?:string;
  subTitlePosition?: {
    y_position: number;
    frontend_video_height: number;
  };
  subTitleTheme?: {
    backgroundColor: string;
    textColor: string;
    fontFamily: string;
    fontWeight: string;
    isCapital?:boolean;
    fontSize?:number;
  };
  subTitleText?: string;
  subTitleSize?: {
    width: number;
    height: number;
  };
  selectedThemeId?: string;
  transcription?:any;
  isActive?:boolean;
  transcriptionProgress?:number;
  subtitleProperties?:{
    videoLang:string, subtitleType:string, whisperLanguage:string
  },
  isDifferentLanguage?:boolean;
  isNative?:boolean;
  targetLanguage?:string;
  isCapital?: boolean;
}

export interface ProjectState {
  projects: Project[];
  loading: boolean;
  error?: string;
}

export interface ProjectSubscriptionResult {
  project: Project | null;
  progress: number;
  error: string | null;
}
