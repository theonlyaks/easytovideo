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
}

export interface ProjectState {
  projects: Project[];
  loading: boolean;
  error?: string;
}
