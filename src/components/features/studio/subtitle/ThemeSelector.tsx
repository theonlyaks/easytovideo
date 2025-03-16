import React from "react";
import Button from "@/components/common/Button";
import { MdArrowBack, MdArrowForward } from "react-icons/md";
import { ThemeSelectorProps, } from "@/types";
import { SubtitleThemePreview } from "@/components/features/studio/subtitle/SubtitleThemePreview";
import { CustomizationPanel } from "@/components/features/studio/subtitle/CustomizationPanel";
import { useThemeSelector } from "@/store";

export function ThemeSelector({
  onNext,
  onPrevious,
  initialCustomization,
  isDifferentLanguage = false, // Add default value
  targetLanguage,
}: ThemeSelectorProps) {
  const {
    selectedTheme,
    setSelectedTheme,
    customization,
    availableThemes,
    currentLanguage,
    handleCustomizationChange,
    getConfig,
  } = useThemeSelector({
    initialCustomization,
    isDifferentLanguage,
    targetLanguage,
  });

  return (
    <div className="mx-auto px-2">
      <h1 className="text-xl lg:text-2xl font-bold text-background-text">
        Customise Style
      </h1>
      <p className="text-sm lg:text-base text-background-textLight mb-6">
        Edit font, size and color of the subtitle text
      </p>
      
      <CustomizationPanel
        selectedFont={customization.font}
        selectedSize={customization.size}
        selectedColor={customization.color}
        onFontChange={(value) => handleCustomizationChange("font", value)}
        onSizeChange={(value) => handleCustomizationChange("size", value)}
        onColorChange={(value) => handleCustomizationChange("color", value)}
        isHighlightMode={selectedTheme.id === "highlight_group"}
        targetLanguage={currentLanguage}
      />

      <h1 className="text-xl lg:text-2xl font-bold text-background-text">
        Select Style
      </h1>
      <p className="text-sm lg:text-base text-background-textLight mb-6">
        Choose animation style
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {availableThemes.map((theme) => (
          <div
            key={theme.id}
            className={`cursor-pointer rounded-lg p-4 border-2 transition-all ${
              selectedTheme.id === theme.id
                ? "border-primary bg-primary/10"
                : "border-neutral/30 hover:border-primary/50"
            }`}
            onClick={() => setSelectedTheme(theme)}
          >
            <SubtitleThemePreview theme={theme} customization={customization} />
            <div className="mt-3">
              <h3 className="font-semibold text-lg text-background-text">
                {theme.name}
              </h3>
              <p className="text-muted-text text-sm">{theme.preview}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <Button
          onClick={() => onPrevious(getConfig())}
          variant="outline"
          icon={MdArrowBack}
          className="w-full sm:w-auto py-2 bg-red sm:py-3 px-4 rounded-lg hover:bg-white/5 transition-all duration-300 text-xs sm:text-sm flex items-center justify-center gap-2"
        >
          Back
        </Button>
        <Button
          onClick={() => onNext(getConfig())}
          icon={MdArrowForward}
          iconPosition="right"
          className="w-full sm:w-auto py-2 sm:py-3 px-4 bg-gradient-to-r from-primary to-secondary text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-xs sm:text-sm flex items-center justify-center gap-2"
        >
          Next (Step 2 of 3)
        </Button>
      </div>
    </div>
  );
}
