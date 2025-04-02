import { useState, useEffect } from 'react';
import { collection, addDoc, serverTimestamp, doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/common/firebase';

interface ShareData {
  type: string;
  videoUrl: string;
  userName: string;
  thumbnailUrl?: string;
  createdAt?: any;
}

interface FetchShareResult {
  data: ShareData | null;
  loading: boolean;
  error: string | null;
}

export const useShare = () => {
  const [isSharing, setIsSharing] = useState(false);
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const shareContent = async (data: ShareData) => {
    setIsSharing(true);
    setError(null);
    
    try {
      const shareDoc = await addDoc(collection(db, 'shares'), {
        type: data.type,
        videoUrl: data.videoUrl,
        userName: data.userName,
        thumbnailUrl: data.thumbnailUrl || null,
        createdAt: serverTimestamp()
      });
      
      const generatedUrl = `https://app.easyto.video/share/${shareDoc.id}`;
      setShareUrl(generatedUrl);
      setIsSharing(false);
      return generatedUrl;
    } catch (err) {
      console.error('Error sharing content:', err);
      setError('Failed to share content. Please try again.');
      setIsSharing(false);
      return null;
    }
  };

  const resetShareState = () => {
    setShareUrl(null);
    setError(null);
  };

  return {
    shareContent,
    isSharing,
    shareUrl,
    error,
    resetShareState
  };
};

// New hook to fetch share data
export const useShareContent = (shareId: string): FetchShareResult => {
  const [state, setState] = useState<FetchShareResult>({
    data: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    async function fetchShareData() {
      if (!shareId) {
        setState({
          data: null,
          loading: false,
          error: 'No share ID provided'
        });
        return;
      }

      try {
        const shareRef = doc(db, 'shares', shareId);
        const shareDoc = await getDoc(shareRef);

        if (!shareDoc.exists()) {
          setState({
            data: null,
            loading: false,
            error: 'Share not found'
          });
          return;
        }

        const data = shareDoc.data() as ShareData;
        setState({
          data,
          loading: false,
          error: null
        });
      } catch (err) {
        console.error('Error fetching share:', err);
        setState({
          data: null,
          loading: false,
          error: 'Failed to load shared content'
        });
      }
    }

    fetchShareData();
  }, [shareId]);

  return state;
};
