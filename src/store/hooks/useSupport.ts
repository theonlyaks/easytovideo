import { useState } from 'react';
import { SupportService } from '@/services/studio/support';
import { SupportForm } from '@/types';

export const useSupport = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const submitSupport = async (formData: SupportForm) => {
    setIsSubmitting(true);
    try {
      await SupportService.createSupportTicket(formData);
      setStatus({
        type: 'success',
        message: 'Thank you for reaching out! We\'ll get back to you within 24-48 hours.'
      });
      return true;
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Failed to send message. Please try again.'
      });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    status,
    submitSupport,
  };
};
