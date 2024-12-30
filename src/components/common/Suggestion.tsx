
import { SuggestionItem } from '@/types'

export const SuggestionPill: React.FC<SuggestionItem> = ({ icon, text }) => {
    return (
      <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow border border-gray-100">
        <span className="text-gray-500">{icon}</span>
        <span className="text-gray-700 text-sm">{text}</span>
      </button>
    );
  };