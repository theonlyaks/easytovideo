'use client';

import { useLanguageVoiceSelection } from '@/store/hooks/useLanguageVoiceSelection';
import { useTextToSpeech } from '@/store/hooks/useTextToSpeech';
import { Select } from '@/components/common/Select';
import { SelectWithPlay } from '@/components/common/SelectWithPlay';
import Button from '@/components/common/Button';
import { FiPlayCircle } from 'react-icons/fi';
import { AudioPlayer } from '@/components/common/AudioPlayer';

export function TextToSpeech() {
  const {
    selectedLanguage,
    setSelectedLanguage,
    selectedVoice,
    setSelectedVoice,
    defaultVoiceName,
    languageOptions,
    voiceOptions,
  } = useLanguageVoiceSelection();

  const {
    text,
    setText,
    isLoading,
    error,
    audioUrl,
    isUploading,
    isAdded,
    handleToggleUpload,
    handleGenerate,
  } = useTextToSpeech();

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleGenerate(selectedVoice);
    }
  };

  return (
    <main className="hidden md:block max-w-4xl mx-auto py-12">
      <h1 className="text-2xl font-semibold mb-8">Text to Speech</h1>

      <section className="space-y-6">
        <div className="bg-white rounded-lg border p-4 space-y-4">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyPress}
            className="w-full h-32 outline-none resize-none border-none p-0 bg-transparent"
            placeholder="Enter the text you want to convert to speech... (Press Enter to generate)"
          />

          <div className="flex items-center gap-6 pt-4 border-t">
            <div className="flex-1 flex items-center gap-4">
              <Select
                options={languageOptions}
                value={selectedLanguage}
                onChange={setSelectedLanguage}
                placeholder="Select language..."
                className="min-w-[200px]"
              />
              
              <SelectWithPlay
                options={voiceOptions}
                value={selectedVoice}
                onChange={setSelectedVoice}
                placeholder={defaultVoiceName}
                disabled={!selectedLanguage || voiceOptions.length === 0}
                className="min-w-[200px]"
              />
            </div>

            <Button
              onClick={() => handleGenerate(selectedVoice)}
              isLoading={isLoading}
              size="lg"
              icon={FiPlayCircle}
            >
              Generate
            </Button>
          </div>
        </div>

        {error && <div className="text-red-500 text-sm">{error}</div>}

        <div className="space-y-3">
          {audioUrl && (
            <AudioPlayer
              onAdd={() => handleToggleUpload(0)}
              title="Generated Speech"
              audioUrl={audioUrl}
              isUploading={isUploading[0]}
              isAdded={isAdded[0]}
            />
          )}
        </div>
      </section>
    </main>
  );
}
