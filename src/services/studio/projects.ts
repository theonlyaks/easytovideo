import { collection, query, where, orderBy, onSnapshot, addDoc, Unsubscribe, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/common/firebase';
import { Project } from '@/types';

export class ProjectService {
  static subscribeToProjects(
    userId: string,
    onSuccess: (projects: Project[]) => void,
    onError: (error: Error) => void
  ): Unsubscribe {
    const projectsCollection = collection(db, 'projects');
    const q = query(
      projectsCollection,
      where('userId', '==', userId),
      orderBy('updatedAt', 'desc')
    );

    return onSnapshot(
      q,
      (snapshot) => {
        const projectList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        })) as Project[];
        onSuccess(projectList);
      },
      onError
    );
  }

  static async createProject(project: Project) {
    console.log(project)
    const projectRef = await addDoc(collection(db, 'projects'), {
      ...project,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return projectRef.id;
  }
}