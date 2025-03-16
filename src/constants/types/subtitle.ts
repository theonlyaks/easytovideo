import { Preset, DisplayMode, Option } from '@/types/interfaces/subtitle';
import { Roboto, Open_Sans, Lato, Montserrat, Poppins, Noto_Sans } from 'next/font/google';
import { DM_Sans, Inter } from 'next/font/google';
import { Noto_Sans_Devanagari } from 'next/font/google';

// Define Google Fonts with weights
const roboto = Roboto({ subsets: ['latin'], weight: ['400', '700'] });
const openSans = Open_Sans({ subsets: ['latin'], weight: ['400', '700'] });
const lato = Lato({ subsets: ['latin'], weight: ['400', '700'] });
const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '700'] });
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '700'] });
const notoSans = Noto_Sans({ subsets: ['latin'], weight: ['400', '700'] });
const dmSans = DM_Sans({ subsets: ['latin'], weight: ['400', '700'] });
const inter = Inter({ subsets: ['latin'], weight: ['400', '700'] });
const notoSansDevanagari = Noto_Sans_Devanagari({ subsets: ['devanagari'], weight: ['400', '700'] });

export const MAX_SUBTITLE_DURATION = 300; // 5 minutes in seconds
export const MIN_SUBTITLE_DURATION = 3; // minimum 3 seconds

export const PRESETS: Preset[] = [
  {
    name: 'Clean & Modern',
    backgroundColor: '#FFFFFF80',
    textColor: '#000000',
    fontFamily: 'roboto',
    fontWeight: '400',
    fontSize: '40px',
    wordMode: 'multi',
  },
  {
    name: 'Bold Impact',
    backgroundColor: '#000000CC',
    textColor: '#FFFFFF',
    fontFamily: 'montserrat',
    fontWeight: '700',
    fontSize: '48px',
    wordMode: 'single',
  },
  {
    name: 'Gentle Flow',
    backgroundColor: '#81b29aCC',
    textColor: '#FFFFFF',
    fontFamily: 'noto-sans',
    fontWeight: '400',
    fontSize: '32px',
    wordMode: 'single',
  },
  {
    name: 'Vibrant Pop',
    backgroundColor: '#e07a5fE6',
    textColor: '#FFFFFF',
    fontFamily: 'poppins',
    fontWeight: '700',
    fontSize: '40px',
    wordMode: 'multi',
  },
  {
    name: 'Sleek Pro',
    backgroundColor: '#2a2522CC',
    textColor: '#FFFFFF',
    fontFamily: 'lato',
    fontWeight: '400',
    fontSize: '40px',
    wordMode: 'multi', // Changed from 'highlight' to 'multi'
  },
];

export const FONT_OPTIONS: Option[] = [
  { label: 'Roboto', value: 'roboto' },
  { label: 'Open Sans', value: 'open-sans' },
  { label: 'Lato', value: 'lato' },
  { label: 'Montserrat', value: 'montserrat' },
  { label: 'Poppins', value: 'poppins' },
  { label: 'Noto Sans', value: 'noto-sans' },
  { label: 'DM Sans', value: 'dm-sans' },
  { label: 'Inter', value: 'inter' },
];

export const FONT_WEIGHTS: Option[] = [
  { label: 'Regular', value: '400' },
  { label: 'Bold', value: '700' },
];

export const FONT_SIZES: Option[] = [
  { label: 'Small (24pt)', value: '32px' },
  { label: 'Medium (30pt)', value: '40px' },
  { label: 'Large (36pt)', value: '48px' },
];

export const DISPLAY_MODES: DisplayMode[] = ['single', 'multi']; // Removed 'highlight'

export const FONTS = {
  roboto,
  'open-sans': openSans,
  lato,
  montserrat,
  poppins,
  'noto-sans': notoSans,
  'dm-sans': dmSans,
  inter,
  'noto-sans-devanagari': notoSansDevanagari,
};

export const CUSTOMIZATION_OPTIONS = {
  fonts: [
    { label: 'Poppins Regular', value: 'poppins-regular', className: 'font-normal' },
    { label: 'Poppins Bold', value: 'poppins-bold', className: 'font-bold' },
    { label: 'Poppins Bold Italic', value: 'poppins-bold-italic', className: 'font-bold italic' },
    { label: 'Noto Sans Devanagari', value: 'noto-sans-devanagari', className: 'font-normal' }
  ],
  sizes: [
    { label: 'Small', value: '24' },     // Removed px
    { label: 'Regular', value: '32' },    // Removed px
    { label: 'Large', value: '40' }       // Removed px
  ]
} as const;

import { SubtitleTheme } from '@/types/interfaces/subtitle';

export const SUBTITLE_THEMES: SubtitleTheme[] = [
  {
    id: 'one_word',
    name: 'Single Word',
    backgroundColor: 'linear-gradient(45deg, #1f1f1f, #2c2c2c)',
    textColor: '#ffffff',
    fontFamily: 'poppins',
    fontWeight: '600',
    fontSize: '32',  // Removed px
    displayMode: 'single' as DisplayMode,
    preview: 'Clear and impactful single word display'
  },
  {
    id: 'word_group',
    name: 'Full Segment',
    backgroundColor: 'linear-gradient(to right, #2c5364, #203a43, #0f2027)',
    textColor: '#ffffff',
    fontFamily: 'inter',
    fontWeight: '500',
    fontSize: '28',  // Removed px
    displayMode: 'full' as DisplayMode,
    preview: 'Displays complete subtitle segments',
  },
  {
    id: 'word_group_segment',
    name: 'Full Segment',
    backgroundColor: 'linear-gradient(to right, #2c5364, #203a43, #0f2027)',
    textColor: '#ffffff',
    fontFamily: 'inter',
    fontWeight: '500',
    fontSize: '28',  // Removed px
    displayMode: 'full' as DisplayMode,
    preview: 'Displays complete subtitle segments',
    is_different_language_support: true  // Only this theme supports different language
  },
  {
    id: 'group_progressive_active',
    name: 'Progressive',
    backgroundColor: 'linear-gradient(to bottom right, #000428, #004e92)',
    textColor: '#ffffff',
    fontFamily: 'dm-sans',
    fontWeight: '600',
    fontSize: '26',  // Removed px
    displayMode: 'group_progressive_active' as DisplayMode,
    preview: 'Words fade in as spoken'
  },
  {
    id: 'group_with_background',
    name: 'Minimal',
    backgroundColor: 'linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.8))',
    textBackgroundColor: 'rgba(255, 255, 255, 0.85)',
    textColor: '#000000',
    fontFamily: 'inter',
    fontWeight: '500',
    fontSize: '22',  // Removed px
    displayMode: 'multi' as DisplayMode,
    preview: 'Clean look with semi-transparent background'
  },
  {
    id: 'group_progressive_fade',
    name: 'Progressive Highlight',
    backgroundColor: 'linear-gradient(to bottom, #0f0c29, #302b63, #24243e)',
    textColor: '#ffffff',
    fontFamily: 'dm-sans',
    fontWeight: '600',
    fontSize: '26',  // Removed px
    displayMode: 'highlight' as DisplayMode,
    preview: 'Shows upcoming words dimmed'
  },
  {
    id: 'highlight_group', // Changed from 'word-highlight'
    name: 'Word Highlight',
    backgroundColor: 'transparent',
    textColor: '#ffffff',
    highlightColor: '#ffeb3b',
    textBackgroundColor: 'transparent',
    fontFamily: 'inter',
    fontWeight: '500',
    fontSize: '28',  // Removed px
    displayMode: 'highlight' as DisplayMode,
    preview: 'Highlights active word in yellow'
  }
].map(theme => ({
  ...theme,
  fontSize: String(theme.fontSize).replace('px', ''),
  is_different_language_support: theme.is_different_language_support || false
}));

export const SAMPLE_SENTENCES = [
  "I You Me",
  "we were all asleep"
];

export const getSampleWords = (sentenceIndex: number) => 
  SAMPLE_SENTENCES[sentenceIndex].split(' ');

export const THEME_CONFIG = {
  containerSize: {
    minHeight: '160px',
  },
  animation: {
    singleWordDuration: 800,
    multiWordDuration: 1200,
  },
  overlay: {
    opacity: 0.5,
    blur: '4px',
  },
  background: {
    imageOpacity: 0.7,
    defaultColor: '#1a1a1a',
  }
} as const;

export const DEMO_STEPS = [
  {
    step: 1,
    title: "Upload Your Video",
    description: "Pick any video from your library or add a fresh one – it’s that easy!"
  },
  {
    step: 2,
    title: "Customize Subtitles",
    description: "Set the style, position, and tweak the text to make it pop."
  },
  {
    step: 3,
    title: "Create & Share",
    description: "Hit generate, grab your subtitled video, and share it fast!"
  }
] as const;

export const BACKGROUND_IMAGE = '/subtitle_preview.jpg';
