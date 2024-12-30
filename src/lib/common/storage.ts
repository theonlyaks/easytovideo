import { storage, db } from '@/lib/common/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp, deleteDoc, doc } from 'firebase/firestore';

export async function uploadAudioFile(audioBlob: Blob) {
  try {
    // Create a unique filename
    const filename = `audio-${Date.now()}.mp3`;
    const storageRef = ref(storage, `audio/${filename}`);
    
    // Upload the file
    const uploadResult = await uploadBytes(storageRef, audioBlob);
    
    // Get the download URL
    const downloadURL = await getDownloadURL(uploadResult.ref);
    
    // Create a new document in the 'add' collection
    const docRef = await addDoc(collection(db, 'add'), {
      url: downloadURL,
      type: 'audio',
      createdAt: serverTimestamp(),
    });

    return { url: downloadURL, id: docRef.id };
  } catch (error) {
    console.error('Error uploading audio:', error);
    throw error;
  }
}

export async function removeAudioEntry(docId: string) {
  try {
    await deleteDoc(doc(db, 'add', docId));
    return true;
  } catch (error) {
    console.error('Error removing audio entry:', error);
    throw error;
  }
}
