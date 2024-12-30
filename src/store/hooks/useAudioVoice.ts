import { useAtom } from 'jotai';
import { audioVoicesAtom } from '@/store';
import { getAudioVoices } from '@/services/studio/audio';

export const useAudioVoice = () => {
  const [audioVoices, setAudioVoices] = useAtom(audioVoicesAtom);

  const fetchAudioVoices = async () => {
    if (audioVoices.length === 0) {
      const voices = await getAudioVoices();
      setAudioVoices(voices);
    }
  };

  return {
    audioVoices,
    fetchAudioVoices,
  };
};


