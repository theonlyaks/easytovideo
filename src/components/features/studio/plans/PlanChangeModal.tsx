import { Modal } from '@/components/common/Modal';
import { PlanPrice } from '@/types';
import { unixToLocalTime } from '@/lib/common/time';
import React from 'react';

interface PlanChangeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  currentPlan: {
    displayName: string;
    price: PlanPrice;
  };
  newPlan: {
    displayName: string;
    price: PlanPrice;
  };
  nextBillingDate: number;
  amountDue: number;
}

export const PlanChangeModal: React.FC<PlanChangeModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  currentPlan,
  newPlan,
  nextBillingDate,
  amountDue,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} >
  <div className="p-8 bg-background rounded-2xl">
  <h3 className="text-2xl font-bold text-background-text">Confirm Plan Change</h3>
        
        {/* Plan comparison section */}
        <div className="mt-6 space-y-4">
          <div className="bg-white p-4 rounded-xl border border-neutral/20">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-text">Current Plan</p>
                <p className="font-semibold text-background-text">{currentPlan.displayName}</p>
              </div>
              <p className="font-medium text-background-text">
                ${(currentPlan.price.amount / 100).toFixed(2)}/{currentPlan.price.interval}
              </p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border-2 border-primary">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-text">New Plan</p>
                <p className="font-semibold text-background-text">{newPlan.displayName}</p>
              </div>
              <p className="font-medium text-background-text">
                ${(newPlan.price.amount / 100).toFixed(2)}/{newPlan.price.interval}
              </p>
            </div>
          </div>
        </div>

        {/* Billing details section */}
        <div className="mt-6 space-y-4">
          <div className="bg-muted/20 p-4 rounded-xl">
            <p className="text-background-text">
              Your new plan starts now. You'll pay ${(newPlan.price.amount / 100).toFixed(2)}/month
              starting {unixToLocalTime(nextBillingDate)}.
            </p>
          </div>

          {/* Terms section */}
          <div className="text-sm text-muted-text space-y-2">
            <p>
              By confirming, you agree that your EasytoVideo subscription will continue and we'll 
              automatically charge the monthly fee until you cancel.
            </p>
            <p>
              You may cancel at any time to avoid future charges. To cancel, go to Account Settings 
              and select "Cancel Subscription".
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="mt-8 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2.5 rounded-xl font-medium text-sm
              bg-background hover:bg-background/90 text-background-text 
              border border-neutral/20 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 px-4 py-2.5 rounded-xl font-medium text-sm
              bg-primary hover:bg-primary/90 text-primary-text 
              transition-colors"
          >
            Confirm Change
          </button>
        </div>
      </div>
    </Modal>
  );
};
