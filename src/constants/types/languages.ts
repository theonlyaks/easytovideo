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
    supported_fonts: [
      'poppins-regular', 'poppins-bold', 'poppins-bold-italic',
      'dancing-script', 'oswald', 'playfair-display', 'rubik', 
      'ubuntu', 'kanit', 'bebas-neue', 'anton', 'gravitas-one'
    ]
  },
  { 
    code: 'hi', 
    name: 'Hindi', 
    flag: '🇮🇳', 
    hasTranslation: true, 
    isNative: true, 
    whisper_language: 'hindi',
    supported_fonts: ['noto-sans-devanagari']
  },
  { 
    code: 'bn', 
    name: 'Bengali', 
    flag: '🇮🇳', 
    hasTranslation: true, 
    isNative: true, 
    whisper_language: 'bengali',
    supported_fonts: ['noto-sans-bengali']
  },
  
  { 
    code: 'pa', 
    name: 'Punjabi', 
    flag: '🇮🇳', 
    hasTranslation: true, 
    isNative: true, 
    whisper_language: 'punjabi',
    supported_fonts: ['noto-sans-gurmukhi']
  },
  { 
    code: 'ta', 
    name: 'Tamil', 
    flag: '🇮🇳', 
    hasTranslation: true, 
    isNative: true, 
    whisper_language: 'tamil',
    supported_fonts: ['baloo-thambi']
  },
  { 
    code: 'te', 
    name: 'Telugu', 
    flag: '🇮🇳', 
    hasTranslation: true, 
    isNative: true, 
    whisper_language: 'telugu',
    supported_fonts: ['hind-guntur']
  },
  
  { 
    code: 'ar', 
    name: 'Arabic', 
    flag: '🇸🇦', 
    hasTranslation: true, 
    isNative: true, 
    whisper_language: 'arabic',
    supported_fonts: ['noto-sans-arabic']
  },
  { 
    code: 'ur', 
    name: 'Urdu', 
    flag: '🇮🇳', 
    hasTranslation: true, 
    isNative: true, 
    whisper_language: 'urdu',
    supported_fonts: ['noto-nastaliq-urdu']
  },
  { 
    code: 'es', 
    name: 'Spanish', 
    flag: '🇪🇸', 
    hasTranslation: true, 
    isNative: true, 
    whisper_language: 'spanish',
    supported_fonts: [
      'poppins-regular', 'poppins-bold', 'poppins-bold-italic',
      'dancing-script', 'oswald', 'playfair-display', 'rubik', 
      'ubuntu', 'kanit', 'bebas-neue', 'anton', 'gravitas-one'
    ]
  },
  { 
    code: 'fr', 
    name: 'French', 
    flag: '🇫🇷', 
    hasTranslation: true, 
    isNative: true, 
    whisper_language: 'french',
    supported_fonts: [
      'poppins-regular', 'poppins-bold', 'poppins-bold-italic',
      'dancing-script', 'oswald', 'playfair-display', 'rubik', 
      'ubuntu', 'kanit', 'bebas-neue', 'anton', 'gravitas-one'
    ]
  },
  { 
    code: 'de', 
    name: 'German', 
    flag: '🇩🇪', 
    hasTranslation: true, 
    isNative: true, 
    whisper_language: 'german',
    supported_fonts: [
      'poppins-regular', 'poppins-bold', 'poppins-bold-italic',
      'dancing-script', 'oswald', 'playfair-display', 'rubik', 
      'ubuntu', 'kanit', 'bebas-neue', 'anton', 'gravitas-one'
    ]
  },
  // { 
  //   code: 'zh', 
  //   name: 'Chinese', 
  //   flag: '🇨🇳', 
  //   hasTranslation: true, 
  //   isNative: true, 
  //   whisper_language: 'chinese',
  //   supported_fonts: ['noto-sans-sc']
  // },
  { 
    code: 'ja', 
    name: 'Japanese', 
    flag: '🇯🇵', 
    hasTranslation: true, 
    isNative: true, 
    whisper_language: 'japanese',
    supported_fonts: ['noto-sans-jp']
  },
  { 
    code: 'ko', 
    name: 'Korean', 
    flag: '🇰🇷', 
    hasTranslation: true, 
    isNative: true, 
    whisper_language: 'korean',
    supported_fonts: ['noto-sans-kr']
  },
  { 
    code: 'ru', 
    name: 'Russian', 
    flag: '🇷🇺', 
    hasTranslation: true, 
    isNative: true, 
    whisper_language: 'russian',
    supported_fonts: ['noto-sans']
  },
  { 
    code: 'pt', 
    name: 'Portuguese', 
    flag: '🇵🇹', 
    hasTranslation: true, 
    isNative: true, 
    whisper_language: 'portuguese',
    supported_fonts: [
      'poppins-regular', 'poppins-bold', 'poppins-bold-italic',
      'dancing-script', 'oswald', 'playfair-display', 'rubik', 
      'ubuntu', 'kanit', 'bebas-neue', 'anton', 'gravitas-one'
    ]
  },
  { 
    code: 'id', 
    name: 'Indonesian', 
    flag: '🇮🇩', 
    hasTranslation: true, 
    isNative: true, 
    whisper_language: 'indonesian',
    supported_fonts: [
      'noto-sans',
      'dancing-script', 'oswald', 'playfair-display', 'rubik', 
      'ubuntu', 'kanit', 'bebas-neue', 'anton', 'gravitas-one'
    ]
  },
  { 
    code: 'ms', 
    name: 'Malay', 
    flag: '🇲🇾', 
    hasTranslation: true, 
    isNative: true, 
    whisper_language: 'malay',
    supported_fonts: [
      'noto-sans',
      'dancing-script', 'oswald', 'playfair-display', 'rubik', 
      'ubuntu', 'kanit', 'bebas-neue', 'anton', 'gravitas-one'
    ]
  },
 
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
