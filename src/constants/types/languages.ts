export interface Language {
  code: string;
  name: string;
  flag: string;
  hasTranslation?: boolean;
  additionalOptions?: string[];
  whisper_language?: string;
  isNative?: boolean;
  supported_fonts?: string[]; // New property for supported fonts
}

export const VIDEO_LANGUAGES: Language[] = [
  { 
    code: 'en', 
    name: 'English', 
    flag: '🇺🇸', 
    isNative: true, 
    whisper_language: 'english',
    supported_fonts: ['poppins-regular', 'poppins-bold', 'poppins-bold-italic']
  },
  { 
    code: 'hi', 
    name: 'Hindi', 
    flag: '🇮🇳', 
    hasTranslation: true, 
    // additionalOptions: ['hinglish'], 
    isNative: true, 
    whisper_language: 'hindi',
    supported_fonts: ['noto-sans-devanagari']
  },
  { code: 'ta', name: 'Tamil', flag: '🇮🇳', hasTranslation: true, isNative: false, whisper_language: 'tamil' },
  { code: 'te', name: 'Telugu', flag: '🇮🇳', hasTranslation: true, isNative: false, whisper_language: 'telugu' },
  { code: 'ar', name: 'Arabic', flag: '🇸🇦', hasTranslation: true, isNative: false, whisper_language: 'arabic' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸', hasTranslation: true, isNative: false, whisper_language: 'spanish' },
  { code: 'fr', name: 'French', flag: '🇫🇷', hasTranslation: true, isNative: false, whisper_language: 'french' },
  { code: 'de', name: 'German', flag: '🇩🇪', hasTranslation: true, isNative: false, whisper_language: 'german' },
  { code: 'zh', name: 'Chinese', flag: '🇨🇳', hasTranslation: true, isNative: false, whisper_language: 'chinese' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵', hasTranslation: true, isNative: false, whisper_language: 'japanese' },
  { code: 'ko', name: 'Korean', flag: '🇰🇷', hasTranslation: true, isNative: false, whisper_language: 'korean' },
  { code: 'ru', name: 'Russian', flag: '🇷🇺', hasTranslation: true, isNative: false, whisper_language: 'russian' },
  { code: 'bn', name: 'Bengali', flag: '🇧🇩', hasTranslation: true, isNative: false, whisper_language: 'bengali' },
  { code: 'pt', name: 'Portuguese', flag: '🇵🇹', hasTranslation: true, isNative: false, whisper_language: 'portuguese' },
  { code: 'id', name: 'Indonesian', flag: '🇮🇩', hasTranslation: true, isNative: false, whisper_language: 'indonesian' },
  { code: 'ms', name: 'Malay', flag: '🇲🇾', hasTranslation: true, isNative: false, whisper_language: 'malay' },
  { code: 'ur', name: 'Urdu', flag: '🇮🇳', hasTranslation: true, isNative: false, whisper_language: 'urdu' },
  { code: 'pa', name: 'Punjabi', flag: '🇮🇳', hasTranslation: true, isNative: false, whisper_language: 'punjabi' },
].map(lang => ({
  ...lang,
  supported_fonts: lang.supported_fonts || ['poppins-regular', 'poppins-bold', 'poppins-bold-italic'] // Default fonts for all languages
}));

export interface SubtitleOption {
  value: string;
  label: string;
}

export const getSubtitleOptions = (language: Language): SubtitleOption[] => {
  const options: SubtitleOption[] = [];
  
  // Only add native option if isNative is true
  if (language.isNative) {
    options.push({ 
      value: `${language.code}_native`, 
      label: `Native ${language.name}` 
    });
  }

  if (language.hasTranslation) {
    options.push({ 
      value: `${language.code}_en`, 
      label: `${language.name} to English Translation` 
    });
  }

  if (language.code === 'hi') {
    // options.push({ value: 'hi_hinglish', label: 'Hinglish' });
  }

  // Handle additional options if any
  if (language.additionalOptions?.length) {
    language.additionalOptions.forEach(option => {
      if (option !== 'hinglish' || language.code !== 'hi') { // Avoid duplicate hinglish option
        options.push({ 
          value: `${language.code}_${option}`, 
          label: `${option.charAt(0).toUpperCase() + option.slice(1)}` 
        });
      }
    });
  }

  return options;
};
