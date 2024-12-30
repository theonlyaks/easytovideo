import { collection, query, where, orderBy, onSnapshot, Query, Unsubscribe } from 'firebase/firestore';
import { db } from '@/lib/common/firebase';
import { Project } from '@/types';

export class ProjectService {
  static subscribeToProjects(
    email: string,
    onSuccess: (projects: Project[]) => void,
    onError: (error: Error) => void
  ): Unsubscribe {
    const projectsCollection = collection(db, 'projects');
    const q = query(
      projectsCollection,
      where('email', '==', email),
      where('is_active', '==', true),
      orderBy('updation_time', 'desc')
    );

    return onSnapshot(
      q,
      (snapshot) => {
        const projectList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          remainingTime: '',
        })) as Project[];
        onSuccess(projectList);
      },
      onError
    );
  }
}
