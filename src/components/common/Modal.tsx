import React from 'react';
import { IoMdClose } from 'react-icons/io';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  isLoader?: boolean;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, isLoader = false }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div 
          className="fixed inset-0 bg-black opacity-50" 
          onClick={!isLoader ? onClose : undefined}
        ></div>
        <div className={`relative rounded-lg bg-white shadow-xl ${!isLoader ? 'w-full max-w-3xl' : ''}`}>
          {!isLoader && (
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-500"
            >
              <IoMdClose className="h-6 w-6" />
            </button>
          )}
          {children}
        </div>
      </div>
    </div>
  );
};
