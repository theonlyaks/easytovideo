"use client";
import { useTextToSfx } from "@/store";
import { useAudioManagement } from "@/store";
import Button from "@/components/common/Button";
import { FiPlayCircle, FiClock, FiCopy, FiZap } from "react-icons/fi";
import { AudioPlayer } from "@/components/common/AudioPlayer";
import { Switch } from "@/components/common/Switch";
import { Tooltip } from "@/components/common/Tooltip";
import { SuggestionGroup } from "@/components/common/SuggestionGroup";
import { SPECIAL_EFFECT_SUGGESTIONS_LIST } from "@/constants";
import { auth } from "@/lib/common/firebase";
import { useState, useEffect } from "react";

export function TextToSfx() {
  const userId = auth.currentUser?.uid;
  const [audioFiles, setAudioFiles] = useState<Array<{ url: string, fileName: string }>>([]);

  const {
    text,
    setText,
    duration,
    setDuration,
    isAutoDuration,
    setIsAutoDuration,
    isLoading,
    audioUrls,
    error,
    handleGenerateTextToSfx,
    totalVariations,
    setTotalVariations,
  } = useTextToSfx();

  useEffect(() => {
    const newAudioFiles = audioUrls
      .filter((url): url is string => url !== null)
      .map((url, index) => ({
        url,
        fileName: `audio_${index}_${Date.now()}.mp3`
      }));
    setAudioFiles(newAudioFiles);
  }, [audioUrls]);

  const { isUploading, isAdded, handleToggleUpload } = useAudioManagement(
    audioFiles,
    userId || ''
  );

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleGenerateTextToSfx();
    }
  };

  const handleSuggestionSelect = (suggestionText: string) => {
    setText(suggestionText);
  };

  return (
    <main className="hidden md:block max-w-4xl mx-auto py-12">
      <h1 className="text-2xl font-semibold mb-8">Sound Effects</h1>

      <section className="space-y-6">
    
        <div className="bg-white rounded-lg border p-4 space-y-4">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyPress}
            className="w-full h-32 outline-none resize-none border-none p-0 bg-transparent"
            placeholder="Describe the sound you want to generate... (Press Enter to generate)"
          />

          <div className="flex items-center gap-6 pt-4 border-t">
            <Tooltip content="Automatically determine the optimal duration for your audio">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <FiZap className="text-gray-500 w-4 h-4" />
                  <Switch
                    checked={isAutoDuration}
                    onChange={setIsAutoDuration}
                    size="md"
                  />
                </div>
                <span className="text-gray-600">Auto</span>
              </div>
            </Tooltip>

            {!isAutoDuration && (
              <Tooltip content="Choose duration between 0.5 and 22 seconds">
                <div className="flex items-center gap-2">
                  <FiClock className="text-gray-500 w-4 h-4" />
                  <input
                    type="number"
                    min="0.5"
                    max="22"
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    className="w-14 p-1 rounded-md border bg-gray-50"
                  />
                  <span className="text-gray-600">seconds</span>
                </div>
              </Tooltip>
            )}

            <Tooltip content="Number of variations to generate">
              <div className="flex items-center gap-2">
                <FiCopy className="text-gray-500 w-4 h-4" />
                <input
                  type="number"
                  min="1"
                  max="4"
                  value={totalVariations}
                  onChange={(e) =>
                    setTotalVariations(
                      Math.min(4, Math.max(1, Number(e.target.value)))
                    )
                  }
                  className="w-14 p-1 rounded-md border bg-gray-50"
                />
                <span className="text-gray-600">variations</span>
              </div>
            </Tooltip>

            <Button
              onClick={handleGenerateTextToSfx}
              isLoading={isLoading}
              size="lg"
              icon={FiPlayCircle}
              className="ml-auto"
            >
              Generate
            </Button>
          </div>
        </div>

        {error && <div className="text-red-500 text-sm">{error}</div>}
        
        {!audioUrls.some(url => url !== null) && (
          <SuggestionGroup
            suggestions={SPECIAL_EFFECT_SUGGESTIONS_LIST}
            onSelect={handleSuggestionSelect}
          />
        )}
        
        <div className="space-y-3">
          {audioFiles.map(
            (audio, index) => (
              <AudioPlayer
                key={index}
                onAdd={() => handleToggleUpload(index)}
                title={`Audio ${index + 1}`}
                audioUrl={audio.url}
                isUploading={isUploading[index]}
                isAdded={isAdded[index]}
              />
            )
          )}
        </div>
      </section>
    </main>
  );
}
