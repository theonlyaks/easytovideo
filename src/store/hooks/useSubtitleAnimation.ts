import { useState, useEffect, useCallback } from 'react';
import { DisplayMode } from '@/types';
import { SAMPLE_SENTENCES, getSampleWords } from '@/constants';
import { THEME_CONFIG } from '@/constants';
import { Language } from '@/constants/types/languages';

export function useSubtitleAnimation(displayMode: DisplayMode, targetLanguage?: Language) {
  const [displayWords, setDisplayWords] = useState<string[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [sentenceIndex, setSentenceIndex] = useState(0);

  const updateWords = useCallback((words: string[], index: number) => {
    switch (displayMode) {
      case 'single':
        return [words[index]];
      case 'full':
        return words;
      case 'group_progressive_active':
      case 'highlight':
        return words;
      case 'multi':
        return words.slice(index, index + 3);
      default:
        return words;
    }
  }, [displayMode]);

  useEffect(() => {
    // Use language-specific sample words if a target language is provided
    const languageCode = targetLanguage?.code;
    const currentWords = getSampleWords(sentenceIndex, languageCode);
    setDisplayWords(updateWords(currentWords, activeIndex));

    const interval = setInterval(() => {
      setActiveIndex(prev => {
        const nextIndex = prev + 1;
        if (nextIndex >= currentWords.length) {
          setSentenceIndex(0); // Reset to beginning of sentence
          return 0;
        }
        return nextIndex;
      });
    }, displayMode === 'single' 
      ? THEME_CONFIG.animation.singleWordDuration 
      : THEME_CONFIG.animation.multiWordDuration);

    return () => clearInterval(interval);
  }, [displayMode, activeIndex, sentenceIndex, updateWords, targetLanguage]);

  return {
    displayWords,
    activeIndex,
    sentenceIndex,
  };
}
