import React from "react";
import { MdAdd } from "react-icons/md";
import { Demo } from "@/components/features/studio/subtitle/Demo/Demo";
import { FileSelectorProps } from "@/types";

export function FileSelector({ onOpenFileManager }: FileSelectorProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-2xl md:text-3xl font-medium mb-2">
          Auto Subtitles
        </h1>
        <p className="text-base text-muted-text px-1">
          Perfect for TikTok, Reels & Shorts
        </p>
      </div>
      <button
        onClick={onOpenFileManager}
        className="w-full border-2 border-dashed border-primary rounded-lg p-4 md:p-8 text-center cursor-pointer hover:bg-primary/5 transition-colors flex flex-col items-center justify-center min-h-[150px]"
      >
        <MdAdd className="h-8 w-8 md:h-24 md:w-12 text-primary mb-2" />
        <p className="text-base md:text-lg mb-1 md:mb-2">
          Select video from library
        </p>
        <p className="text-base text-muted-text">
          Add automatic subtitles to your video
        </p>
      </button>
      <Demo />
    </div>
  );
}
