'use client';
import { useState, useEffect, useCallback } from 'react';

// Define proper type for beforeinstallprompt event
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function InstallPrompt() {
  const [showInstall, setShowInstall] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check if already installed
    const isAppInstalled = window.matchMedia('(display-mode: standalone)').matches;
    
    // Check if iOS device
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    setIsIOS(isIOSDevice);
    
    if (!isAppInstalled) {
      // For iOS devices, show install prompt directly since beforeinstallprompt isn't supported
      if (isIOSDevice) {
        setShowInstall(true);
      } else {
        // For Android and other devices that support beforeinstallprompt
        const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
          // Prevent Chrome 67 and earlier from automatically showing the prompt
          e.preventDefault();
          // Stash the event so it can be triggered later
          setDeferredPrompt(e);
          // Show the install button
          setShowInstall(true);
        };
        
        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt as EventListener);
        
        // Proper cleanup
        return () => {
          window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt as EventListener);
        };
      }
    }
    // For iOS devices or already installed apps, no cleanup needed
    return undefined;
  }, []);

  const handleInstallClick = useCallback(() => {
    if (isIOS) {
      // For iOS, we can't programmatically trigger install
      // Just show instructions
      return;
    }
    
    if (!deferredPrompt) return;
    
    // Show the install prompt
    deferredPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        // Remove console.log in production or use a logger
        if (process.env.NODE_ENV !== 'production') {
          console.log('User accepted the install prompt');
        }
        setShowInstall(false);
      }
      // Clear the saved prompt as it can't be used again
      setDeferredPrompt(null);
    });
  }, [deferredPrompt, isIOS]);

  const handleClose = useCallback(() => {
    setShowInstall(false);
  }, []);

  // Uncomment this to make the prompt conditional
  if (!showInstall) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-purple-700 text-white p-4 flex justify-between items-center z-50">
      <div>
        <h3 className="font-bold text-lg">Install EasytoVideo</h3>
        {isIOS ? (
          <p>Tap the share icon and then "Add to Home Screen"</p>
        ) : (
          <p>Takes Only 3 Seconds!</p>
        )}
      </div>
      <div className="flex gap-3">
        {!isIOS && (
          <button 
            onClick={handleInstallClick}
            className="bg-pink-500 px-4 py-2 rounded-md font-medium"
          >
            Install
          </button>
        )}
        <button onClick={handleClose} className="text-xl">×</button>
      </div>
    </div>
  );
}