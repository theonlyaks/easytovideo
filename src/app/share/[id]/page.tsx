'use client';

import { useParams, useRouter } from 'next/navigation';
import { Share } from '@/components/features/share/Share';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { useShareContent } from '@/store/hooks/useShare';
import Button from '@/components/common/Button';
import { FiHome } from 'react-icons/fi';
import { useCallback, useMemo, memo } from 'react';
import { extractUsername } from '@/lib/common/util';

// Performance optimization: Extract components outside of the main component
const LoadingDisplay = memo(() => (
  <div className="min-h-screen flex items-center justify-center">
    <LoadingSpinner size="lg" color="primary" />
  </div>
));
LoadingDisplay.displayName = 'LoadingDisplay';

// Memoized error display component
const ErrorDisplay = memo(({ error, onGoHome }: { error: string; onGoHome: () => void }) => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center p-6 max-w-md bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-primary mb-2">Error</h1>
      <p className="text-gray-700 mb-6">{error}</p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button 
          onClick={onGoHome}
          icon={FiHome}
          variant="primary"
          className="mx-auto"
        >
          Go to Home Page
        </Button>
      </div>
    </div>
  </div>
));
ErrorDisplay.displayName = 'ErrorDisplay';

export default function SharePage() {
  const { id } = useParams();
  const router = useRouter();
  
  // Guard against undefined id with fallback
  const shareId = useMemo(() => {
    if (!id) return '';
    return Array.isArray(id) ? id[0] : id;
  }, [id]);
  
  const { data: shareData, loading, error } = useShareContent(shareId);
  
  const goToHomePage = useCallback(() => {
    router.push('/');
  }, [router]);
  
  // Early return for invalid shareId
  if (!shareId) {
    return <ErrorDisplay error="Invalid share link" onGoHome={goToHomePage} />;
  }

  // Optimized rendering logic
  if (loading) return <LoadingDisplay />;
  if (error) return <ErrorDisplay error={error} onGoHome={goToHomePage} />;
  if (!shareData) return <ErrorDisplay error="Share not found" onGoHome={goToHomePage} />;

  // Extract username once
  const userName = shareData.userName ? extractUsername(shareData.userName) : '';
  
  return (
    <Share 
      shareId={shareId}
      videoUrl={shareData.videoUrl}
      userName={userName}
      type={shareData.type}
    />
  );
}
