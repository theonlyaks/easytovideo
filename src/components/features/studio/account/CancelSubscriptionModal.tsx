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
            <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <FiAlertTriangle className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-background-text">
                        Cancel Subscription
                    </h3>
                </div>
                
                <div className="space-y-4 mb-6">
                    <p className="text-neutral-text">
                        Are you sure you want to cancel your subscription?
                    </p>
                    <p className="text-sm text-muted-text">
                        Your subscription will remain active until the end of the current billing period. 
                        You'll continue to have access to all features until then.
                    </p>
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 px-4 py-2 border border-neutral/20 rounded-md hover:bg-background transition-colors text-background-text"
                    >
                        Keep Subscription
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={isLoading}
                        className="flex-1 px-4 py-2 bg-primary text-primary-text rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? "Cancelling..." : "Cancel Subscription"}
                    </button>
                </div>
            </div>
        </Modal>
    );
}
