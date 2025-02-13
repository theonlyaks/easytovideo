import { FileItem } from "@/types/interfaces/common";
import { auth, db } from "@/lib/common/firebase";
import { collection, addDoc, Timestamp } from 'firebase/firestore';

export async function createViralProject(file: FileItem, type: String) {
  try {
    const userId = auth.currentUser?.uid;
    if (!userId) {
      throw new Error('User not authenticated');
    }

    // Create project document in Firestore
    const now = Timestamp.now();
    const projectRef = await addDoc(collection(db, 'projects'), {
      type,
      fileUrl: file.fileUrl,
      uid: userId,
      fileName: file.fileName,
      createdAt: now,
      updatedAt: now,
      status: 'In Queue',
      stepStatus:'0/5'
    });

    // console.log('Creating viral project...', file);
    const response = await fetch('/api/viral/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        file,
        projectId: projectRef.id 
      })
    });

    if (!response.ok) {
      throw new Error('Failed to create viral project');
    }

    const data = await response.json();
    return {
      success: true,
      message: 'Viral project created successfully!',
      data
    };
  } catch (error) {
    return {
      success: false,
      message: 'Failed to create viral project. Please try again.',
      error
    };
  }
}
