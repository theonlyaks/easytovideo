import { Preset, DisplayMode, Option } from '@/types/interfaces/subtitle';
import { Roboto, Open_Sans, Lato, Montserrat, Poppins, Noto_Sans } from 'next/font/google';
import { DM_Sans, Inter } from 'next/font/google';

// Define Google Fonts with weights
const roboto = Roboto({ subsets: ['latin'], weight: ['400', '700'] });
const openSans = Open_Sans({ subsets: ['latin'], weight: ['400', '700'] });
const lato = Lato({ subsets: ['latin'], weight: ['400', '700'] });
const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '700'] });
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '700'] });
const notoSans = Noto_Sans({ subsets: ['latin'], weight: ['400', '700'] });
const dmSans = DM_Sans({ subsets: ['latin'], weight: ['400', '700'] });
const inter = Inter({ subsets: ['latin'], weight: ['400', '700'] });

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
};

import { SubtitleTheme } from '@/types/interfaces/subtitle';

export const SUBTITLE_THEMES: SubtitleTheme[] = [
  {
    id: 'single-word',
    name: 'Single Word',
    backgroundColor: 'linear-gradient(45deg, #1f1f1f, #2c2c2c)',
    textColor: '#ffffff',
    fontFamily: 'inter',
    fontWeight: '600',
    fontSize: '32px',
    displayMode: 'single',
    preview: 'Clear and impactful single word display'
  },
  {
    id: 'full-segment',
    name: 'Full Segment',
    backgroundColor: 'linear-gradient(to right, #2c5364, #203a43, #0f2027)',
    textColor: '#ffffff',
    fontFamily: 'inter',
    fontWeight: '500',
    fontSize: '28px',
    displayMode: 'full',
    preview: 'Displays complete subtitle segments'
  },
  {
    id: 'progressive',
    name: 'Progressive',
    backgroundColor: 'linear-gradient(to bottom right, #000428, #004e92)',
    textColor: '#ffffff',
    fontFamily: 'dm-sans',
    fontWeight: '600',
    fontSize: '26px',
    displayMode: 'progressive',
    preview: 'Words fade in as spoken'
  },
  {
    id: 'minimal',
    name: 'Minimal',
    backgroundColor: 'linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.8))',
    textBackgroundColor: 'rgba(255, 255, 255, 0.85)',
    textColor: '#000000',
    fontFamily: 'inter',
    fontWeight: '500',
    fontSize: '22px',
    displayMode: 'multi',
    preview: 'Clean look with semi-transparent background'
  },
  {
    id: 'progressive-highlight',
    name: 'Progressive Highlight',
    backgroundColor: 'linear-gradient(to bottom, #0f0c29, #302b63, #24243e)',
    textColor: '#ffffff',
    fontFamily: 'dm-sans',
    fontWeight: '600',
    fontSize: '26px',
    displayMode: 'highlight',
    preview: 'Shows upcoming words dimmed'
  },
  {
    id: 'word-highlight',
    name: 'Word Highlight',
    backgroundColor: 'transparent',
    textColor: '#ffffff',
    highlightColor: '#ffeb3b',
    textBackgroundColor: 'transparent',
    fontFamily: 'inter',
    fontWeight: '500',
    fontSize: '28px',
    displayMode: 'highlight',
    preview: 'Highlights active word in yellow'
  }
];

export const SAMPLE_SENTENCES = [
  "The early morning",
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
    description: "Select a video from your library or upload a new one"
  },
  {
    step: 2,
    title: "Customize Subtitles",
    description: "Choose position, theme, and edit the text"
  },
  {
    step: 3,
    title: "Create & Share",
    description: "Generate your video with subtitles and share it"
  }
] as const;

export const BACKGROUND_IMAGE = '/subtitle_preview.jpg';
