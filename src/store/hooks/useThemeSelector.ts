import { useState, useMemo, useEffect } from "react";
import { SubtitleTheme, ThemeConfig } from "@/types";
import { SUBTITLE_THEMES,VIDEO_LANGUAGES} from "@/constants/";

interface UseThemeSelectorProps {
  initialCustomization: ThemeConfig;
  isDifferentLanguage: boolean; // Keep this required in the hook
  targetLanguage?: string;
}

export const useThemeSelector = ({
  initialCustomization,
  isDifferentLanguage = false, // Add default value
  targetLanguage,
}: UseThemeSelectorProps) => {
  const [selectedTheme, setSelectedTheme] = useState<SubtitleTheme>(() => {
    if (isDifferentLanguage) {
      return (
        SUBTITLE_THEMES.find((theme) => theme.id === "word_group_segment") ||
        SUBTITLE_THEMES[0]
      );
    }
    return (
      SUBTITLE_THEMES.find(
        (theme) => theme.id === initialCustomization.themeId
      ) || SUBTITLE_THEMES[0]
    );
  });

  const [customization, setCustomization] = useState({
    font: initialCustomization.fontId || "poppins-regular",
    size: initialCustomization.fontSize,
    color: initialCustomization.color,
  });

  const availableThemes = useMemo(() => {
    return isDifferentLanguage
      ? SUBTITLE_THEMES.filter((theme) => theme.is_different_language_support)
      : SUBTITLE_THEMES.filter((theme) => !theme.is_different_language_support);
  }, [isDifferentLanguage]);

  const currentLanguage = useMemo(() => {
    return VIDEO_LANGUAGES.find((lang) => lang.code === targetLanguage);
  }, [targetLanguage]);

  useEffect(() => {
    if (currentLanguage?.supported_fonts) {
      const isCurrentFontSupported = currentLanguage.supported_fonts.includes(
        customization.font
      );
      if (!isCurrentFontSupported && currentLanguage.supported_fonts.length > 0) {
        setCustomization((prev) => ({
          ...prev,
          font: currentLanguage?.supported_fonts?.[0] || "poppins-regular",
        }));
      }
    }
  }, [currentLanguage, customization.font]);

  const handleCustomizationChange = (
    type: "font" | "size" | "color",
    value: string
  ) => {
    setCustomization((prev) => ({ ...prev, [type]: value }));

    if (type === "color") {
      if (selectedTheme.id === "highlight_group") {
        setSelectedTheme((prev) => ({
          ...prev,
          highlightColor: value,
        }));
      } else {
        setSelectedTheme((prev) => ({
          ...prev,
          textColor: value,
        }));
      }
    }
  };

  const getConfig = (): ThemeConfig => ({
    themeId: selectedTheme.id,
    fontId: customization.font,
    fontSize: customization.size,
    color: customization.color,
  });

  return {
    selectedTheme,
    setSelectedTheme,
    customization,
    availableThemes,
    currentLanguage,
    handleCustomizationChange,
    getConfig,
  };
};
