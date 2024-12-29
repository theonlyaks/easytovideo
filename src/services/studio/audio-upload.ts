import { uploadAudioFile, removeAudioEntry } from "@/lib/common/storage";
import { auth } from "@/lib/common/firebase";

export async function uploadAudio(audioUrl: string) {
  if (!auth.currentUser) {
    throw new Error("Please sign in to upload audio");
  }

  const response = await fetch(audioUrl);
  const audioBlob = await response.blob();
  return await uploadAudioFile(audioBlob);
}

export async function removeAudio(audioId: string) {
  return await removeAudioEntry(audioId);
}
