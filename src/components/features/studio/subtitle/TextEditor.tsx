import React, { useState, useEffect, useCallback, useMemo } from "react";
import Button from "@/components/common/Button";
import { MdArrowBack, MdCheck, MdClose } from "react-icons/md";
import { BiExport } from "react-icons/bi";
import { TextEditorProps, SubtitleData } from "@/types";
import { Switch } from "@/components/common/Switch"; // Import the existing Switch component
import { Modal } from "@/components/common/Modal";
import { useAtomValue } from "jotai";
import { subscriptionAtom } from "@/store/atoms/subscriptionAtom";
import { SubscriptionPrompt } from "@/components/common/ExportPromoBanner";
import { useRouter } from "next/navigation";

// Memoized EditableWord component
const EditableWord = React.memo(
  ({
    word,
    index,
    isEditing,
    onWordClick,
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
  }
);

EditableWord.displayName = "EditableWord";

// Add a capitalized version of EditableWord component
const EditableCapitalizedWord = React.memo(
  ({
    word,
    index,
    isEditing,
    onWordClick,
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
          {word.toUpperCase()}
        </span>
      </span>
    );
  }
);

EditableCapitalizedWord.displayName = "EditableCapitalizedWord";

// Memoized EditableSegment component for different language subtitles
const EditableSegment = React.memo(
  ({
    segment,
    index,
    isEditing,
    onSegmentClick,
  }: {
    segment: string;
    index: number;
    isEditing: boolean;
    onSegmentClick: (index: number, segment: string) => void;
  }) => {
    if (isEditing) return null;

    return (
      <div
        onClick={() => onSegmentClick(index, segment)}
        className="cursor-pointer relative text-background-text group transition-all duration-200 mb-3 p-2 hover:bg-background hover:rounded-md"
      >
        <span className="block text-lg">{segment}</span>
      </div>
    );
  }
);

EditableSegment.displayName = "EditableSegment";

// Add a capitalized version of EditableSegment component
const EditableCapitalizedSegment = React.memo(
  ({
    segment,
    index,
    isEditing,
    onSegmentClick,
  }: {
    segment: string;
    index: number;
    isEditing: boolean;
    onSegmentClick: (index: number, segment: string) => void;
  }) => {
    if (isEditing) return null;

    return (
      <div
        onClick={() => onSegmentClick(index, segment)}
        className="cursor-pointer relative text-background-text group transition-all duration-200 mb-3 p-2 hover:bg-background hover:rounded-md"
      >
        <span className="block text-lg">{segment.toUpperCase()}</span>
      </div>
    );
  }
);

EditableCapitalizedSegment.displayName = "EditableCapitalizedSegment";

// Memoized EditingForm component
const EditingForm = React.memo(
  ({
    editedWord,
    onWordChange,
    onSave,
    onCancel,
    isMultiline = false,
  }: {
    editedWord: string;
    onWordChange: (value: string) => void;
    onSave: () => void;
    onCancel: () => void;
    isMultiline?: boolean;
  }) => (
    <div
      className={`${
        isMultiline ? "block" : "inline-flex"
      } items-center gap-1 bg-background rounded-lg p-1`}
    >
      {isMultiline ? (
        <textarea
          value={editedWord.toUpperCase()}
          onChange={(e) => onWordChange(e.target.value)}
          autoFocus
          rows={3}
          className="bg-white border border-muted rounded-md px-3 py-1.5 w-full text-background-text focus:outline-none focus:border-primary mb-2"
        />
      ) : (
        <input
          type="text"
          value={editedWord}
          onChange={(e) => onWordChange(e.target.value)}
          autoFocus
          className="bg-white border border-muted rounded-md px-3 py-1.5 min-w-[80px] text-background-text focus:outline-none focus:border-primary"
        />
      )}
      <div className="flex gap-1 justify-end">
        <Button
          onClick={onSave}
          title="Save"
          variant="accent"
          icon={MdCheck}
          iconOnly={true}
          size="sm"
        />
        <Button
          onClick={onCancel}
          title="Cancel"
          variant="primary"
          iconOnly={true}
          icon={MdClose}
          size="sm"
        />
      </div>
    </div>
  )
);

EditingForm.displayName = "EditingForm";

export function TextEditor({
  onNext,
  onPrevious,
  transcription,
  onTranscriptionUpdate,
  isDifferentLanguage = false,
  isCapital = false,
  onCapitalChange,
}: TextEditorProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedWord, setEditedWord] = useState("");
  const [subtitleData, setSubtitleData] = useState<SubtitleData | null>(null);
  const [capitalizeAll, setCapitalizeAll] = useState(isCapital); // Initialize from props
  const [showPromoModal, setShowPromoModal] = useState(false);
  const [noCreditsLeft, setNoCreditsLeft] = useState(false);
  const subscription = useAtomValue(subscriptionAtom);
  const router = useRouter();

  // Sync local state with props
  useEffect(() => {
    setCapitalizeAll(isCapital);
  }, [isCapital]);

  // Notify parent component when capitalization changes
  const handleCapitalChange = (value: boolean) => {
    console.log("Capitalization changed:", value);
    setCapitalizeAll(value);
    if (onCapitalChange) {
      onCapitalChange(value);
    }
  };

  useEffect(() => {
    if (transcription) {
      setSubtitleData(transcription);
    }
  }, [transcription]);

  const handleWordClick = useCallback((index: number, word: string) => {
    setEditingIndex(index);
    setEditedWord(word);
  }, []);

  const handleSegmentClick = useCallback((index: number, segment: string) => {
    setEditingIndex(index);
    setEditedWord(segment);
  }, []);

  const handleWordSave = useCallback(
    (index: number) => {
      if (editedWord.trim() && subtitleData) {
        if (isDifferentLanguage && subtitleData.segments) {
          // Handle segments for different language
          const newSubtitleData = {
            ...subtitleData,
            segments: subtitleData.segments.map((item, i) =>
              i === index ? { ...item, text: editedWord.trim() } : item
            ),
          };

          setSubtitleData(newSubtitleData);
          onTranscriptionUpdate(newSubtitleData);
        } else if (subtitleData.words) {
          // Handle words for same language
          const newSubtitleData = {
            ...subtitleData,
            words: subtitleData.words.map((item, i) =>
              i === index ? { ...item, word: editedWord.trim() } : item
            ),
          };

          setSubtitleData(newSubtitleData);
          onTranscriptionUpdate(newSubtitleData);
        }

        setEditingIndex(null);
        setEditedWord("");
      }
    },
    [editedWord, subtitleData, onTranscriptionUpdate, isDifferentLanguage]
  );

  const handleCancel = useCallback(() => {
    setEditingIndex(null);
    setEditedWord("");
  }, []);

  const contentElements = useMemo(() => {
    if (!subtitleData) return null;

    if (isDifferentLanguage && subtitleData.segments) {
      // Render segments for different language
      return subtitleData.segments.map((item, index) => (
        <React.Fragment key={index}>
          {editingIndex === index ? (
            <EditingForm
              editedWord={editedWord}
              onWordChange={setEditedWord}
              onSave={() => handleWordSave(index)}
              onCancel={handleCancel}
              isMultiline={true}
            />
          ) : capitalizeAll ? (
            <EditableCapitalizedSegment
              segment={item.text}
              index={index}
              isEditing={editingIndex === index}
              onSegmentClick={handleSegmentClick}
            />
          ) : (
            <EditableSegment
              segment={item.text}
              index={index}
              isEditing={editingIndex === index}
              onSegmentClick={handleSegmentClick}
            />
          )}
        </React.Fragment>
      ));
    } else if (subtitleData.words) {
      // Render words for same language
      return subtitleData.words.map((item, index) => (
        <React.Fragment key={index}>
          {editingIndex === index ? (
            <EditingForm
              editedWord={editedWord}
              onWordChange={setEditedWord}
              onSave={() => handleWordSave(index)}
              onCancel={handleCancel}
            />
          ) : capitalizeAll ? (
            <EditableCapitalizedWord
              word={item.word}
              index={index}
              isEditing={editingIndex === index}
              onWordClick={handleWordClick}
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
    }

    return null;
  }, [
    subtitleData,
    editingIndex,
    editedWord,
    handleWordSave,
    handleCancel,
    handleWordClick,
    isDifferentLanguage,
    handleSegmentClick,
    capitalizeAll,
  ]);

  const handleExportClick = () => {
    // Check if user has active subscription
    if (
      subscription.status === "active" ||
      subscription.status === "authenticated"
    ) {
      // Check if user has enough credits
      if (subscription.credit < 1) {
        // No credits left, show modal with credit message
        setNoCreditsLeft(true);
        setShowPromoModal(true);
      } else {
        // User is subscribed and has credits, proceed with export
        onNext();
      }
    } else {
      // User is not subscribed, show promotional modal
      setNoCreditsLeft(false);
      setShowPromoModal(true);
    }
  };

  if (!subtitleData) {
    return (
      <div className="w-full max-w-4xl mx-auto py-6 text-center">
        <p className="text-muted-text">No transcription data available</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto  px-2">
      <div className="flex flex-col sm:flex-row justify-between mb-4">
        <div className="text-left">
          <p className="text-xl lg:text-2xl font-semibold text-background-text mb-2">
            {isDifferentLanguage ? "Text Editor" : "Text Editor"}
          </p>
          <p className="text-muted-text">
            {isDifferentLanguage
              ? "Click on any segment to edit the translated subtitle"
              : "Click on any word to edit the subtitle text"}
          </p>
        </div>
        <div className="flex items-center space-x-2 self-end mt-2 sm:mt-0">
          <span className="text-xs sm:text-sm text-muted-text font-bold">
            CAPITALIZE
          </span>
          <Switch
            checked={capitalizeAll}
            onChange={handleCapitalChange}
            size="lg"
          />
        </div>
      </div>

      <div className="bg-white border border-muted shadow-sm">
        <div className="p-6">
          <div
            className={`min-h-[100px] ${
              isDifferentLanguage ? "space-y-2" : ""
            }`}
          >
            {contentElements}
          </div>
        </div>

        <div className="flex items-center justify-between p-4 border-t border-muted bg-background">
          <Button
            onClick={onPrevious}
            variant="outline"
            icon={MdArrowBack}
            className="py-2 bg-red sm:py-3 px-4  rounded-lg hover:bg-white/5 transition-all duration-300 text-xs sm:text-sm flex items-center  gap-2"
          >
            {" "}
            Back{" "}
          </Button>
          <Button
            onClick={handleExportClick}
            icon={BiExport}
            iconPosition="right"
            className=" py-2 sm:py-3 px-4 bg-gradient-to-r from-primary to-secondary text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-xs sm:text-sm flex items-center justify-center gap-2"
          >
            Export
          </Button>
        </div>
      </div>

      {/* Subscription Promo Modal */}
      <Modal isOpen={showPromoModal} onClose={() => setShowPromoModal(false)}>
        <div className="p-6">
          <SubscriptionPrompt isCreditsExhausted={noCreditsLeft} />

          <div className="mt-6 flex flex-col sm:flex-row justify-end sm:space-x-4 space-y-2 sm:space-y-0">
            {!noCreditsLeft && (
              <Button
                variant="outline"
                onClick={() => {
                  setShowPromoModal(false);
                  // Proceed with export with watermark
                  onNext();
                }}
                icon={BiExport}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Export with Watermark
              </Button>
            )}
            <Button
              onClick={() => router.push("/studio/plans")}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
            >
              Subscribe Now
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
