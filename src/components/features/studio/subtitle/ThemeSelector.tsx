import React, { useState } from 'react';
import Button from "@/components/common/Button";
import { MdArrowBack, MdArrowForward } from "react-icons/md";
import { SubtitleTheme, ThemeSelectorProps } from '@/types';
import { SUBTITLE_THEMES } from '@/constants/';
import { SubtitleThemePreview } from '@/components/features/studio/subtitle/SubtitleThemePreview';

export function ThemeSelector({ onNext, onPrevious }: ThemeSelectorProps) {
  const [selectedTheme, setSelectedTheme] = useState<SubtitleTheme>(SUBTITLE_THEMES[0]);

  const handleNext = () => {
    onNext(selectedTheme.id);
  };

  return (
    <div className="mx-auto py-8 px-2">
      <h1 className="text-xl sm:text-3xl font-bold text-background-text mb-6">Choose a Subtitle Style</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {SUBTITLE_THEMES.map((theme) => (
          <div
            key={theme.id}
            className={`cursor-pointer rounded-lg p-4 border-2 transition-all ${
              selectedTheme.id === theme.id
                ? 'border-primary bg-primary/10'
                : 'border-neutral/30 hover:border-primary/50'
            }`}
            onClick={() => setSelectedTheme(theme)}
          >
            <SubtitleThemePreview theme={theme} />
            <div className="mt-3">
              <h3 className="font-semibold text-lg text-background-text">{theme.name}</h3>
              <p className="text-muted-text text-sm">{theme.preview}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <Button
          onClick={onPrevious}
          variant="outline"
          size="lg"
          icon={MdArrowBack}
        >
          Back
        </Button>
        <Button
          onClick={handleNext}
          size="lg"
          icon={MdArrowForward}
          iconPosition="right"
        >
          Next (Step 2 of 3)
        </Button>
      </div>
    </div>
  );
}