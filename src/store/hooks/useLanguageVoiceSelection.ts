import { useState, useEffect, useMemo } from 'react';
import { useAudioLanguage } from '@/store';
import { useAudioVoice } from '@/store';
import type { AudioLanguageData, AudioVoice } from '@/types';

export const useLanguageVoiceSelection = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');
  const [selectedVoice, setSelectedVoice] = useState<string>('');
  const [defaultVoiceName, setDefaultVoiceName] = useState<string>('');
  
  const { audioLanguages, fetchAudioLanguages } = useAudioLanguage();
  const { audioVoices, fetchAudioVoices } = useAudioVoice();

  useEffect(() => {
    fetchAudioLanguages();
    fetchAudioVoices();
  }, []);

  useEffect(() => {
    if (audioLanguages.length > 0 && audioVoices.length > 0) {
        console.log("Asdada",audioVoices)
      if (!selectedLanguage) {
        const initialLang = audioLanguages[0];
        setSelectedLanguage(initialLang.code);
        setSelectedVoice(initialLang.default_voice_id);
        setDefaultVoiceName(initialLang.default_voice_name);
      } else {
        const currentLang = audioLanguages.find(lang => lang.code === selectedLanguage);
        if (currentLang) {
          setSelectedVoice(currentLang.default_voice_id);
          setDefaultVoiceName(currentLang.default_voice_name);
        }
      }
    }
  }, [audioLanguages, audioVoices, selectedLanguage]);

  const languageOptions = useMemo(() => 
    audioLanguages.map((lang: AudioLanguageData) => ({
      value: lang.code,
      label: `${lang.name}`,
    }))
  , [audioLanguages]);

  const voiceOptions = useMemo(() => 
    audioVoices
      .filter((voice: AudioVoice) => voice.language_code === selectedLanguage)
      .map((voice: AudioVoice) => ({
        ...voice,
        value: voice.voice_id,
        label: voice.name,
      }))
  , [audioVoices, selectedLanguage]);

  // New effect to set first voice option when options change
  useEffect(() => {
    if (voiceOptions.length > 0 && !voiceOptions.some(v => v.value === selectedVoice)) {
      const firstVoice = voiceOptions[0];
      setSelectedVoice(firstVoice.value);
      setDefaultVoiceName(firstVoice.label);
    }
  }, [voiceOptions]);

  return {
    selectedLanguage,
    setSelectedLanguage,
    selectedVoice,
    setSelectedVoice,
    defaultVoiceName,
    languageOptions,
    voiceOptions,
  };
};
