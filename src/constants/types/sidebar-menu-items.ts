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
  FaRegClosedCaptioning,
  FaHeadphones,
  FaWaveSquare,
  FaBrain,
  FaBook,
  FaProductHunt,
  FaChartLine,
  FaFire,
  FaStore,
  FaDatabase,
  FaPaypal,
  FaCreditCard,
  FaStar,
  FaAlignLeft
} from 'react-icons/fa';

export const menuItems: MenuItems = {
  WORKFLOWS: [
    { icon: FaFolder, label: 'Projects', path: '/studio/projects' },
    // { icon: FaDatabase, label: 'Storage', path: '/studio/storage' }
  ],
  // Audio: [
  //   { icon: FaMusic, label: 'Sound Effects', path: '/studio/text-to-sfx' },
  //   { icon: FaMicrophone, label: 'Text to Speech', path: '/studio/text-to-speech' },
  // ],
  Video: [
    { icon: FaVideo, label: 'Speech to Visuals', path: '/studio/effects' },
    { icon: FaAlignLeft, label: 'Subtitle', path: '/studio/subtitle' },
    // { icon: FaComments, label: 'Conversations', path: '/studio/conversations' },
    // { icon: FaPhone, label: 'Phone Numbers', path: '/studio/phone-numbers' },
  ],
  // FLOWS: [
  //   { icon: FaMicrophoneAlt, label: 'Voiceover Studio', path: '/studio/voiceover' },
  //   { icon: FaVideo, label: 'Dubbing Studio', path: '/studio/dubbing' },
  //   { icon: FaHeadphones, label: 'Audio Native', path: '/studio/audio-native' },
  // ],
  // TOOLS: [
  //   { icon: FaCreditCard, label: 'Account', path: '/studio/account' },
  //   { icon: FaStar, label: 'Plans', path: '/studio/plans' }
  // ],
};
