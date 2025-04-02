import { Metadata } from 'next';
import { PropsWithChildren } from 'react';
import { db } from '@/lib/common/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { extractUsername } from '@/lib/common/util';

const APP_NAME = "EasyToVideo";

type Props = {
  params: Promise<{ id: string }>; // Explicitly type params as a Promise
};

async function getShareContentFromFirebase(shareId: string) {
  try {
    const shareRef = doc(db, 'shares', shareId);
    const shareSnapshot = await getDoc(shareRef);
    
    if (shareSnapshot.exists()) {
      return shareSnapshot.data();
    } else {
      console.error('Share not found');
      return null;
    }
  } catch (error) {
    console.error('Error fetching share from Firebase:', error);
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params; // Explicitly await params
  const id = resolvedParams.id; // Access id after awaiting

  // Fetch share data from Firebase
  let shareData;
  try {
    shareData = await getShareContentFromFirebase(id);
  } catch (error) {
    console.error('Error fetching share data for metadata:', error);
  }

  // Extract username from email address using the utility function
  const username = shareData?.userName ? extractUsername(shareData.userName) : '';

  // Generate title and description
  const pageTitle = shareData 
    ? `${username}'s shared Subtitled Video Magic – See It on ${APP_NAME}!` 
    : `Subtitled Video Magic – See It on ${APP_NAME}!`;
  
  const pageDescription = shareData 
    ? `Watch this video with stunning subtitles in 14+ languages! Made with ${APP_NAME} – Join for $2/month. Try now!` 
    : `Watch videos with stunning subtitles in 14+ languages! Made with ${APP_NAME} – Join for $2/month. Try now!`;

  // Generate image URL for platforms that don't support video previews
  const thumbnailUrl = shareData?.thumbnailUrl || 
    (shareData?.videoUrl ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/thumbnail?url=${encodeURIComponent(shareData.videoUrl)}` : null);

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://your-default-domain.com'), // Add metadataBase
    title: pageTitle,
    description: pageDescription,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      ...(shareData?.videoUrl && {
        videos: [
          {
            url: shareData.videoUrl,
            width: 1280,
            height: 720,
            type: 'video/mp4',
          },
        ],
        images: thumbnailUrl ? [{ url: thumbnailUrl }] : [],
      }),
      type: 'video.other',
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
      ...(thumbnailUrl && { images: [thumbnailUrl] }),
    },
  };
}

export default function ShareLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-background">
      {children}
    </div>
  );
}