import React from 'react';

export const SkeletonLoader = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3].map((item) => (
        <div key={item} className="bg-muted rounded-lg overflow-hidden shadow-md animate-pulse">
          <div className="w-full h-48 bg-neutral" />
          <div className="p-4">
            <div className="h-4 bg-neutral rounded w-3/4 mb-2" />
            <div className="h-3 bg-neutral rounded w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
};
