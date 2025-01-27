import { Modal } from "@/components/common/Modal";
import { FiAlertTriangle } from "react-icons/fi";

interface CancelSubscriptionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    isLoading: boolean;
}

export function CancelSubscriptionModal({ isOpen, onClose, onConfirm, isLoading }: CancelSubscriptionModalProps) {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <FiAlertTriangle className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-center sm:text-left text-lg sm:text-xl font-semibold text-background-text">
                        Cancel Subscription
                    </h3>
                </div>
                
                <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                    <p className="text-sm sm:text-base text-center sm:text-left text-neutral-text">
                        Are you sure you want to cancel your subscription?
                    </p>
                    <p className="text-xs sm:text-sm text-center sm:text-left text-muted-text">
                        Your subscription will remain active until the end of the current billing period. 
                        You'll continue to have access to all features until then.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                    <button
                        onClick={onClose}
                        className="w-full px-4 py-2 border border-neutral/20 rounded-md hover:bg-background transition-colors text-background-text order-2 sm:order-1"
                    >
                        Keep Subscription
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={isLoading}
                        className="w-full px-4 py-2 bg-primary text-primary-text rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed order-1 sm:order-2"
                    >
                        {isLoading ? "Cancelling..." : "Cancel Subscription"}
                    </button>
                </div>
            </div>
        </Modal>
    );
}
