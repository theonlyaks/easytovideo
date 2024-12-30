export interface AudioLanguageData {
  code: string;
  country: string;
  default_voice_id: string;
  default_voice_name: string;
  name: string;
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export interface AudioVoice {
  description: string;
  language_code: string;
  name: string;
  source: string;
  tags: Record<string, boolean>;
  url: string;
  voice_id: string;
}

export interface SelectWithPlayProps extends Omit<SelectProps, 'options'> {
  options: (AudioVoice & { label: string; value: string })[];
}

export interface SuggestionItem {
    icon: string;
    text: string;
  }

  export interface SuggestionGroupProps {
    suggestions: SuggestionItem[];
    onSelect: (text: string) => void;
  }
  
