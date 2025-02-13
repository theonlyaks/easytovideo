import { collection, query, where, orderBy, onSnapshot, addDoc, Unsubscribe, serverTimestamp, doc, updateDoc } from 'firebase/firestore';
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
    // console.log(project)
    const projectRef = await addDoc(collection(db, 'projects'), {
      ...project,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return projectRef.id;
  }

  static async updateProjectThumbnailUrl(projectId: string, thumbnailUrl: string) {
    try {
      const projectRef = doc(db, 'projects', projectId);
      await updateDoc(projectRef, {
        thumbnailUrl: thumbnailUrl,  // Changed from generated_thumbnailUrl
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      //console.error("Error updating thumbnail URL:", error);
      throw error;
    }
  }
}