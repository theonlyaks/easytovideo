import { Modal } from '@/components/common/Modal';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { useRazorpayConfirmation } from '@/store/hooks/useRazorpayConfirmation';
import { useRouter } from 'next/navigation';
import { FiCheckCircle, FiXCircle } from 'react-icons/fi';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  subscriptionId: string | null;
}

export const PaymentModal = ({ isOpen, onClose, subscriptionId }: PaymentModalProps) => {
  const router = useRouter();
  const { status, loading, error } = useRazorpayConfirmation(subscriptionId);

  const renderContent = () => {
    // Keep showing loading until we have a definitive status
    if (loading || status === 'created' || status === 'authenticated') {
      return (
        <div className="text-center space-y-4">
          <LoadingSpinner 
            size="lg" 
            color="primary" 
            text="Processing your payment..." 
          />
          <p className="text-sm text-muted-text">Please wait while we confirm your payment...</p>
        </div>
      );
    }

    // Show success state
    if (status === 'active') {
      return (
        <div className="text-center space-y-4">
          <FiCheckCircle className="w-16 h-16 text-accent mx-auto" />
          <h3 className="text-xl font-semibold text-background-text">Payment Successful!</h3>
          <p className="text-muted-text">Your subscription has been activated.</p>
          <button
            onClick={() => router.push('/studio/projects')}
            className="px-6 py-2 bg-primary text-primary-text rounded-lg hover:bg-primary/90 transition-colors"
          >
            Go to Projects
          </button>
        </div>
      );
    }

    // Show failure state or any other status
    return (
      <div className="text-center space-y-4">
        <FiXCircle className="w-16 h-16 text-primary mx-auto" />
        <h3 className="text-xl font-semibold text-background-text">Payment Failed</h3>
        <p className="text-muted-text">
          {error || 'Something went wrong with your payment.'}
        </p>
        <button
          onClick={onClose}
          className="px-6 py-2 bg-secondary text-secondary-text rounded-lg hover:bg-secondary/90 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      isLoader={loading || status === 'created' || status === 'authenticated'}
    >
      <div className="p-8 min-w-[300px] bg-background">
        {renderContent()}
      </div>
    </Modal>
  );
};
