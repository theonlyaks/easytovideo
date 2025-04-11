import React from "react";
import { MdAdd } from "react-icons/md";
import { Demo } from "@/components/features/studio/subtitle/Demo/Demo";
import { FileSelectorProps } from "@/types";

export function FileSelector({ onOpenFileManager }: FileSelectorProps) {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      {/* Header Section */}
      <div className="mb-10 text-center">
        <h1 className="text-2xl md:text-3xl font-semibold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          Auto Subtitles
        </h1>
        <p className="text-base text-muted-text px-1 mb-2">
          Boost Your TikTok, Reels & Shorts – Try Free Now!
        </p>
      </div>

      {/* File Upload Button */}
      <button
        onClick={onOpenFileManager}
        className="relative w-full border border-primary/20 rounded-xl p-6 md:p-8 text-center cursor-pointer bg-gradient-to-br from-white to-primary/5 hover:from-primary/10 hover:to-primary/20 transition-all duration-300 flex flex-col items-center justify-center min-h-[150px] shadow-md hover:shadow-lg"
        aria-label="Upload or select a video"
      >
        <MdAdd className="h-8 w-8 md:h-10 md:w-10 text-primary mb-2 animate-bounce" />
        <p className="text-base md:text-lg font-medium text-gray-800">
          Click to Upload or Select
        </p>
        <p className="text-sm text-muted-text mt-1">
        Supports vertical videos up to 3 minutes with ease        </p>
        {/* Subtle Hover Overlay */}
        <div className="absolute inset-0 rounded-xl bg-primary/0 hover:bg-primary/5 transition-opacity duration-300"></div>
      </button>

      <Demo />
    </div>
  );
}