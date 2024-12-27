"use client";

import { useState } from 'react';
import { generateSpeech } from '@/services/studio/text-to-speech';

export function TextToSpeech() {
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    setIsLoading(true);
    try {
      const response = await generateSpeech(text);
      console.log('Speech generated:', response);
    } catch (error) {
      console.error('Failed to generate speech:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto space-y-4">
        <p className="text-3xl">Text to Speech</p>
        <div className="bg-white rounded-3xl p-8 shadow-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full h-32 p-4 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              placeholder="Enter the text you want to convert to speech..."
            />
            <div className="flex items-center justify-between">
              <button
                type="submit"
                disabled={isLoading || !text.trim()}
                className="bg-black text-white rounded-full p-4 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800 transition-colors">
                {isLoading ? 'Processing...' : 'Submit'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
