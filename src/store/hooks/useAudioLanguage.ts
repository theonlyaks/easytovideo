import { useAtom } from 'jotai';
import { audioLanguagesAtom } from '@/store';
import { getAudioLanguages } from '@/services/studio/audio';

export const useAudioLanguage = () => {
  const [audioLanguages, setAudioLanguages] = useAtom(audioLanguagesAtom);

  const fetchAudioLanguages = async () => {
    // Only fetch if we don't have any languages loaded
    if (audioLanguages.length === 0) {
      const languages = await getAudioLanguages();
      setAudioLanguages(languages);
    }
  };

  return {
    audioLanguages,
    fetchAudioLanguages,
  };
};
