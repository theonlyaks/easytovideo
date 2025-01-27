import { useState, useEffect, useCallback } from 'react';
import { SyncTaskConfig, SyncTaskResult } from '@/types/interfaces/common';

export function useSyncTask(initialConfig?: SyncTaskConfig) {
  const [result, setResult] = useState<SyncTaskResult>({
    state: 'loading',
    text: 'Processing...',
    isOpen: false
  });

  const startTask = useCallback(async (config: SyncTaskConfig) => {
    try {
      setResult({
        state: 'loading',
        text: config.loadingMessage || 'Processing request...',
        isOpen: true
      });

      const response = await config.serviceFunction(...(config.args || []));

      if (response.success) {
        setResult({
          state: 'success',
          text: config.successMessage || response.message,
          isOpen: true
        });
      } else {
        setResult({
          state: 'error',
          text: config.errorMessage || response.message,
          isOpen: true
        });
      }

      // Auto close after success/error
      setTimeout(() => {
        setResult(prev => ({ ...prev, isOpen: false }));
      }, 2000);

    } catch (error) {
      setResult({
        state: 'error',
        text: config.errorMessage || 'Operation failed',
        isOpen: true
      });
    }
  }, []);

  return {
    ...result,
    startTask,
    closeTask: () => setResult(prev => ({ ...prev, isOpen: false }))
  };
}
