import React from 'react';
import { MdCheck, MdError } from "react-icons/md";
import { LoadingSpinner } from "./LoadingSpinner";

interface LoadingSyncTaskProps {
  state: 'loading' | 'success' | 'error';
  text: string;
}

export const LoadingSyncTask: React.FC<LoadingSyncTaskProps> = ({
  state,
  text
}) => {
  return (
    <div className="flex flex-col items-center">
      {state === 'loading' && (
        <LoadingSpinner text={text} color="primary" />
      )}
      {state === 'success' && (
        <div className="flex flex-col items-center">
          <MdCheck className="w-16 h-16 text-accent mb-4" />
          <p className="text-lg font-medium text-background-text">{text}</p>
        </div>
      )}
      {state === 'error' && (
        <div className="flex flex-col items-center">
          <MdError className="w-16 h-16 text-red-700 mb-4" />
          <p className="text-lg font-medium text-background-text">{text}</p>
        </div>
      )}
    </div>
  );
};
