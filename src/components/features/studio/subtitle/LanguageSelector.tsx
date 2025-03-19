import React, { useState, useEffect, useMemo, useCallback, memo } from 'react';
import { VIDEO_LANGUAGES, getSubtitleOptions } from '@/constants/types/languages';
import { Select } from '@/components/common/Select';

// Memoize static video language options
const VIDEO_LANGUAGE_OPTIONS = VIDEO_LANGUAGES.map(lang => ({
  value: lang.code,
  label: `${lang.flag} ${lang.name}`
}));

const LanguageField = memo(({ 
  label, 
  value, 
  onChange, 
  options, 
  placeholder, 
  disabled, 
  helpText 
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder: string;
  disabled?: boolean;
  helpText: string;
}) => (
  <div>
    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
      {label} <span className="text-red-500">*</span>
    </label>
    <Select
      value={value}
      onChange={onChange}
      options={options}
      placeholder={placeholder}
      className="w-full p-2 sm:p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all text-xs sm:text-sm"
      disabled={disabled}
    />
    <p className="text-xs text-muted-text mt-1">{helpText}</p>
  </div>
));
LanguageField.displayName = 'LanguageField';

export const LanguageSelector = memo(({ onSubmit, onCancel }: {
  onSubmit: (videoLang: string, subtitleType: string, whisperLanguage: string) => void;
  onCancel: () => void;
}) => {
  const [selectedVideoLang, setSelectedVideoLang] = useState('');
  const [selectedSubtitleType, setSelectedSubtitleType] = useState('');
  const [currentLanguage, setCurrentLanguage] = useState<any>(null);

  // Memoize subtitle options
  const subtitleOptions = useMemo(() => {
    if (!selectedVideoLang) return [];
    const language = VIDEO_LANGUAGES.find(lang => lang.code === selectedVideoLang);
    if (!language) return [];
    
    return getSubtitleOptions(language).map(option => ({
      ...option,
      label: option.label.includes('Translation')
        ? option.label.replace('Translation', `Translation`)
        : option.label
    }));
  }, [selectedVideoLang]);

  // Memoize handlers
  const handleVideoLanguageChange = useCallback((value: string) => {
    setSelectedVideoLang(value);
    setSelectedSubtitleType('');
    const language = VIDEO_LANGUAGES.find(lang => lang.code === value);
    setCurrentLanguage(language || null);
  }, []);

  const handleSubtitleTypeChange = useCallback((value: string) => {
    setSelectedSubtitleType(value);
  }, []);

  const handleSubmit = useCallback(() => {
    if (selectedVideoLang && selectedSubtitleType && currentLanguage) {
      const whisperLanguage = currentLanguage.whisper_language || currentLanguage.name.toLowerCase();
      onSubmit(selectedVideoLang, selectedSubtitleType, whisperLanguage);
    }
  }, [selectedVideoLang, selectedSubtitleType, currentLanguage, onSubmit]);

  return (
    <div className="max-w-md mx-auto py-6 px-4 sm:py-8 sm:px-6">
      <div className="mb-10 text-center">
        <h1 className="text-2xl md:text-3xl font-semibold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          Free Auto Subtitles
        </h1>
        <p className="text-base text-muted-text px-1 mb-2">
          Boost Your TikTok, Reels & Shorts – Try Free Now!
        </p>
      </div>
      
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md animate-fadeIn">
        <h2 className="text-lg sm:text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary mb-3">
          Subtitle Language Selection
        </h2>
        <p className="text-xs sm:text-sm text-muted-text mb-4">
          Choose the language spoken in your video and your desired subtitle language for automatic subtitle generation.
        </p>

        <div className="space-y-5">
          <LanguageField
            label="Language Spoken in Video"
            value={selectedVideoLang}
            onChange={handleVideoLanguageChange}
            options={VIDEO_LANGUAGE_OPTIONS}
            placeholder="Select video language"
            helpText="Select the language spoken in your video for accurate transcription."
          />

          <LanguageField
            label="Subtitle Language"
            value={selectedSubtitleType}
            onChange={handleSubtitleTypeChange}
            options={subtitleOptions}
            placeholder={selectedVideoLang ? "Select subtitle language" : "Select video language first"}
            disabled={!selectedVideoLang}
            helpText="Choose your subtitle language or translation preference."
          />
        </div>

        <div className="mt-5 sm:mt-6 flex space-x-3 sm:space-x-4">
          <button
            onClick={handleSubmit}
            disabled={!selectedVideoLang || !selectedSubtitleType}
            className="flex-1 py-2 sm:py-3 px-4 bg-gradient-to-r from-primary to-secondary text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm"
          >
            Continue
          </button>
          <button
            onClick={onCancel}
            className="flex-1 py-2 sm:py-3 px-4 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-all duration-300 text-xs sm:text-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
});
LanguageSelector.displayName = 'LanguageSelector';