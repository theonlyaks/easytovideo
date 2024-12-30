import { MenuItems } from '../../types/interfaces/sidebar';
import { 
  FaMicrophone, 
  FaVolumeUp, 
  FaUserAlt, 
  FaMusic,
  FaRobot,
  FaComments,
  FaPhone,
  FaFolder,
  FaMicrophoneAlt,
  FaVideo,
  FaHeadphones,
  FaWaveSquare,
  FaBrain,
  FaBook,
  FaProductHunt
} from 'react-icons/fa';

export const menuItems: MenuItems = {
  Audio: [
    { icon: FaMusic, label: 'Sound Effects', path: '/studio/text-to-sfx' },
    { icon: FaMicrophone, label: 'Text to Speech', path: '/studio/text-to-speech' },
    { icon: FaBook, label: 'Saved', path: '/studio/library' },
    { icon: FaProductHunt, label: 'Projects', path: '/studio/projects' },

  ],
  CONVERSATIONAL: [
    { icon: FaRobot, label: 'Agents', path: '/studio/agents' },
    { icon: FaComments, label: 'Conversations', path: '/studio/conversations' },
    { icon: FaPhone, label: 'Phone Numbers', path: '/studio/phone-numbers' },
  ],
  WORKFLOWS: [
    { icon: FaFolder, label: 'Projects', path: '/studio/projects' },
    { icon: FaMicrophoneAlt, label: 'Voiceover Studio', path: '/studio/voiceover' },
    { icon: FaVideo, label: 'Dubbing Studio', path: '/studio/dubbing' },
    { icon: FaHeadphones, label: 'Audio Native', path: '/studio/audio-native' },
  ],
  TOOLS: [
    { icon: FaWaveSquare, label: 'Voice Isolator', path: '/studio/voice-isolator' },
    { icon: FaBrain, label: 'AI Speech Classifier', path: '/studio/speech-classifier' },
  ],
};
