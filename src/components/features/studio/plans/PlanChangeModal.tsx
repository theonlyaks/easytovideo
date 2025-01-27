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
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-4 sm:p-8 bg-background rounded-2xl">
        <h3 className="text-xl sm:text-2xl font-bold text-background-text">
          Confirm Plan Change
        </h3>
        
        {/* Plan comparison section */}
        <div className="mt-4 sm:mt-6 space-y-3 sm:space-y-4">
          <div className="bg-white p-3 sm:p-4 rounded-xl border border-neutral/20">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0">
              <div>
                <p className="text-xs sm:text-sm text-muted-text">Current Plan</p>
                <p className="font-semibold text-sm sm:text-base text-background-text">{currentPlan.displayName}</p>
              </div>
              <p className="font-medium text-sm sm:text-base text-background-text">
                ${(currentPlan.price.amount / 100).toFixed(2)}/{currentPlan.price.interval}
              </p>
            </div>
          </div>

          <div className="bg-white p-3 sm:p-4 rounded-xl border-2 border-primary">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0">
              <div>
                <p className="text-xs sm:text-sm text-muted-text">New Plan</p>
                <p className="font-semibold text-sm sm:text-base text-background-text">{newPlan.displayName}</p>
              </div>
              <p className="font-medium text-sm sm:text-base text-background-text">
                ${(newPlan.price.amount / 100).toFixed(2)}/{newPlan.price.interval}
              </p>
            </div>
          </div>
        </div>

        {/* Billing details section */}
        <div className="mt-4 sm:mt-6 space-y-3 sm:space-y-4">
          <div className="bg-muted/20 p-3 sm:p-4 rounded-xl">
            <p className="text-sm sm:text-base text-background-text">
              Your new plan starts now. You'll pay ${(newPlan.price.amount / 100).toFixed(2)}/month
              starting {unixToLocalTime(nextBillingDate)}.
            </p>
          </div>

          {/* Terms section */}
          <div className="text-xs sm:text-sm text-muted-text space-y-2">
            <p>
              By confirming, you agree that your EasytoVideo subscription will continue and we'll 
              automatically charge the monthly fee until you cancel.
            </p>
            <p className="hidden sm:block">
              You may cancel at any time to avoid future charges. To cancel, go to Account Settings 
              and select "Cancel Subscription".
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={onClose}
            className="w-full px-4 py-2.5 rounded-xl font-medium text-sm
              bg-background hover:bg-background/90 text-background-text 
              border border-neutral/20 transition-colors order-2 sm:order-1"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="w-full px-4 py-2.5 rounded-xl font-medium text-sm
              bg-primary hover:bg-primary/90 text-primary-text 
              transition-colors order-1 sm:order-2"
          >
            Confirm Change
          </button>
        </div>
      </div>
    </Modal>
  );
};
