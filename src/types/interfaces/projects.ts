import { Timestamp } from 'firebase/firestore';

export interface Project {
  id: string;
  email: string;
  title?: string;
  status: 'processing' | 'completed' | 'failed';
  duration?: number;
  updation_time: Timestamp;
  is_active: boolean;
  signed_url_image?: string;
  remainingTime?: string;
}

export interface ProjectState {
  projects: Project[];
  loading: boolean;
  error?: string;
}
