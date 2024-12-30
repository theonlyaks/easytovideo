import {SuggestionGroupProps } from '@/types';
import { SuggestionPill } from './Suggestion';

export const SuggestionGroup: React.FC<SuggestionGroupProps> = ({
  suggestions,
  onSelect,
}) => {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {suggestions.map((suggestion, index) => (
        <div key={index} onClick={() => onSelect(suggestion.text)}>
          <SuggestionPill {...suggestion} />
        </div>
      ))}
    </div>
  );
};
