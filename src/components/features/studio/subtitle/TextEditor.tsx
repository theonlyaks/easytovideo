import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Button from "@/components/common/Button";
import { MdArrowBack, MdCheck, MdClose } from "react-icons/md";
import { BiExport } from 'react-icons/bi';
import { TextEditorProps, SubtitleData } from '@/types';

// Memoized EditableWord component
const EditableWord = React.memo(({ 
  word, 
  index, 
  isEditing, 
  onWordClick 
}: { 
  word: string; 
  index: number; 
  isEditing: boolean; 
  onWordClick: (index: number, word: string) => void;
}) => {
  if (isEditing) return null;
  
  return (
    <span
      onClick={() => onWordClick(index, word)}
      className="cursor-pointer inline relative text-background-text group transition-all duration-200"
    >
      <span className="inline text-lg group-hover:bg-background group-hover:px-2 group-hover:rounded-md transition-all duration-200">
        {word}
      </span>
    </span>
  );
});

EditableWord.displayName = 'EditableWord';

// Memoized EditingForm component
const EditingForm = React.memo(({ 
  editedWord, 
  onWordChange, 
  onSave, 
  onCancel 
}: { 
  editedWord: string; 
  onWordChange: (value: string) => void; 
  onSave: () => void; 
  onCancel: () => void;
}) => (
  <div className="inline-flex items-center gap-1 bg-background rounded-lg p-1">
    <input
      type="text"
      value={editedWord}
      onChange={(e) => onWordChange(e.target.value)}
      autoFocus
      className="bg-white border border-muted rounded-md px-3 py-1.5 min-w-[80px] text-background-text focus:outline-none focus:border-primary"
    />
    <Button
      onClick={onSave}
      title="Save"
      variant='accent'
      icon={MdCheck}
      iconOnly={true}
      size="sm"
    />
    <Button
      onClick={onCancel}
      title="Cancel"
      variant='primary'
      iconOnly={true}
      icon={MdClose}
      size="sm"
    />
  </div>
));

EditingForm.displayName = 'EditingForm';

export function TextEditor({
  onNext,
  onPrevious,
  transcription,
  onTranscriptionUpdate
}: TextEditorProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedWord, setEditedWord] = useState("");
  const [subtitleData, setSubtitleData] = useState<SubtitleData | null>(null);

  useEffect(() => {
    if (transcription) {
      setSubtitleData(transcription);
    }
  }, [transcription]);

  const handleWordClick = useCallback((index: number, word: string) => {
    setEditingIndex(index);
    setEditedWord(word);
  }, []);

  const handleWordSave = useCallback((index: number) => {
    if (editedWord.trim() && subtitleData) {
      const newSubtitleData = {
        ...subtitleData,
        words: subtitleData.words.map((item, i) =>
          i === index ? { ...item, word: editedWord.trim() } : item
        )
      };
      
      setSubtitleData(newSubtitleData);
      onTranscriptionUpdate(newSubtitleData);
      setEditingIndex(null);
      setEditedWord("");
    }
  }, [editedWord, subtitleData, onTranscriptionUpdate]);

  const handleCancel = useCallback(() => {
    setEditingIndex(null);
    setEditedWord("");
  }, []);

  const wordElements = useMemo(() => {
    if (!subtitleData) return null;

    return subtitleData.words.map((item, index) => (
      <React.Fragment key={index}>
        {editingIndex === index ? (
          <EditingForm
            editedWord={editedWord}
            onWordChange={setEditedWord}
            onSave={() => handleWordSave(index)}
            onCancel={handleCancel}
          />
        ) : (
          <EditableWord
            word={item.word}
            index={index}
            isEditing={editingIndex === index}
            onWordClick={handleWordClick}
          />
        )}
        {index < subtitleData.words.length - 1 && <span> </span>}
      </React.Fragment>
    ));
  }, [subtitleData, editingIndex, editedWord, handleWordSave, handleCancel, handleWordClick]);

  if (!subtitleData) {
    return (
      <div className="w-full max-w-4xl mx-auto py-6 text-center">
        <p className="text-muted-text">No transcription data available</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto py-8 px-2">
      <h2 className="text-xl sm:text-3xl font-semibold text-background-text mb-2">
        Subtitle Editor
      </h2>
      <p className="text-muted-text mb-6">
        Click on any word to edit the subtitle text
      </p>

      <div className="bg-white rounded-lg border border-muted shadow-sm">
        <div className="p-6">
          <div className="min-h-[100px]">
            {wordElements}
          </div>
        </div>

        <div className="flex items-center justify-between p-4 border-t border-muted bg-background">
          <Button
            size='lg'
            onClick={onPrevious}
            variant='outline'
            className="flex items-center gap-2"
          >
            <MdArrowBack /> Back
          </Button>
          <Button
            size='lg'
            onClick={onNext}
            className="flex items-center gap-2 text-secondary"
          >
            Export<BiExport/>
          </Button>
        </div>
      </div>
    </div>
  );
}
