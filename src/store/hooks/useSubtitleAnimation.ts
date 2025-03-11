import { useState, useEffect, useCallback } from 'react';
import { DisplayMode } from '@/types';
import { SAMPLE_SENTENCES, getSampleWords } from '@/constants';
import { THEME_CONFIG } from '@/constants';

export function useSubtitleAnimation(displayMode: DisplayMode) {
  const [displayWords, setDisplayWords] = useState<string[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [sentenceIndex, setSentenceIndex] = useState(0);

  const updateWords = useCallback((words: string[], index: number) => {
    switch (displayMode) {
      case 'single':
        return [words[index]];
      case 'full':
        return words;
      case 'progressive':
      case 'highlight':
        return words;
      case 'multi':
        return words.slice(index, index + 3);
      default:
        return words;
    }
  }, [displayMode]);

  useEffect(() => {
    const currentWords = getSampleWords(sentenceIndex);
    setDisplayWords(updateWords(currentWords, activeIndex));

    const interval = setInterval(() => {
      setActiveIndex(prev => {
        const nextIndex = prev + 1;
        if (nextIndex >= currentWords.length) {
          setSentenceIndex(prevSentence => 
            (prevSentence + 1) % SAMPLE_SENTENCES.length);
          return 0;
        }
        return nextIndex;
      });
    }, displayMode === 'single' 
      ? THEME_CONFIG.animation.singleWordDuration 
      : THEME_CONFIG.animation.multiWordDuration);

    return () => clearInterval(interval);
  }, [displayMode, activeIndex, sentenceIndex, updateWords]);

  return {
    displayWords,
    activeIndex,
    sentenceIndex,
  };
}
