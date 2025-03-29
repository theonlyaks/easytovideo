import React, { useMemo, CSSProperties } from 'react';
import { 
  Poppins, 
  Inter, 
  DM_Sans, 
  Noto_Sans,
  Noto_Sans_Devanagari,
  Baloo_Thambi_2, 
  Hind_Guntur, 
  Noto_Sans_Arabic,
  // Noto_Sans_SC, 
  Noto_Sans_JP, 
  Noto_Sans_KR, 
  Noto_Sans_Bengali, 
  Noto_Nastaliq_Urdu, 
  Noto_Sans_Gurmukhi,
  Dancing_Script,
  Oswald,
  Playfair_Display,
  Rubik,
  Ubuntu,
  Kanit,
  Bebas_Neue,
  Anton,
  Gravitas_One
} from "next/font/google";
import { SubtitleThemePreviewProps } from '@/types';
import { useSubtitleAnimation } from '@/store';
import { THEME_CONFIG, BACKGROUND_IMAGE } from '@/constants';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '700'],
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
});

const notoSans = Noto_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
});

const notoSansDevanagari = Noto_Sans_Devanagari({
  subsets: ['devanagari'],
  weight: ['400', '700']
});

const balooThambi = Baloo_Thambi_2({
  subsets: ['tamil'],
  weight: ['400', '700']
});

const hindGuntur = Hind_Guntur({
  subsets: ['telugu'],
  weight: ['400', '700']
});

const notoSansArabic = Noto_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['400', '700']
});

// const notoSansSC = Noto_Sans_SC({
//   subsets: ['latin'],
//   weight: ['400', '700']
// });

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '700']
});

const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '700']
});

const notoSansBengali = Noto_Sans_Bengali({
  subsets: ['bengali'],
  weight: ['400', '700']
});

const notoNastaliqUrdu = Noto_Nastaliq_Urdu({
  subsets: ['arabic'],
  weight: ['400', '700']
});

const notoSansGurmukhi = Noto_Sans_Gurmukhi({
  subsets: ['gurmukhi'],
  weight: ['400', '700']
});

// New English fonts
const dancingScript = Dancing_Script({ subsets: ['latin'], weight: ['400', '700'] });
const oswald = Oswald({ subsets: ['latin'], weight: ['400', '700'] });
const playfairDisplay = Playfair_Display({ subsets: ['latin'], weight: ['400', '700'] });
const rubik = Rubik({ subsets: ['latin'], weight: ['400', '700'] });
const ubuntu = Ubuntu({ subsets: ['latin'], weight: ['400', '700'] });
const kanit = Kanit({ subsets: ['latin'], weight: ['400', '700'] });
const bebasNeue = Bebas_Neue({ subsets: ['latin'], weight: ['400'] });
const anton = Anton({ subsets: ['latin'], weight: ['400'] });
const gravitasOne = Gravitas_One({ subsets: ['latin'], weight: ['400'] });

export function SubtitleThemePreview({ theme, customization, targetLanguage}: SubtitleThemePreviewProps) {
  const { displayWords, activeIndex } = useSubtitleAnimation(theme.displayMode, targetLanguage);

  const styles = useMemo(() => ({
    container: {
      backgroundColor: THEME_CONFIG.background.defaultColor,
      minHeight: THEME_CONFIG.containerSize.minHeight,
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      position: 'relative',
      overflow: 'hidden',
      isolation: 'isolate',
    } as CSSProperties,
    background: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '100%',
      height: '100%',
      objectFit: 'cover' as const,
      zIndex: -1,
      opacity: THEME_CONFIG.background.imageOpacity,
    } as CSSProperties,
    overlay: {
      position: 'absolute',
      inset: 0,
      backgroundColor: `rgba(0, 0, 0, ${THEME_CONFIG.overlay.opacity})`,
      zIndex: -1,
    } as CSSProperties,
    textContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '0.25rem',
      justifyContent: 'center',
      ...(theme.id === 'group_with_background' ? {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',  // Changed from 0.75 to 0.1
        padding: '0.75rem 1.5rem',
        borderRadius: '0.5rem',
        backdropFilter: `blur(${THEME_CONFIG.overlay.blur})`,
        color: '#FFFFFF'
      } : {
        textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
      })
    } as CSSProperties
  }), [theme.id]);

  const getWordStyle = (index: number): CSSProperties => {
    const baseStyle: CSSProperties = {
      color: theme.id === 'group_with_background' 
        ? (customization?.color || theme.textColor)
        : (theme.id === 'highlight_group' // Changed from 'word-highlight'
          ? theme.textColor
          : (customization?.color || theme.textColor)),
      fontSize: `${customization?.size || theme.fontSize}px`, // Add px here
    };

    if (theme.id === 'highlight_group') { // Changed from 'word-highlight'
      return {
        ...baseStyle,
        color: index === activeIndex 
          ? (customization?.color || theme.highlightColor) // Use customization color for highlight
          : theme.textColor,
        transition: 'color 0.3s ease',
      };
    }

    if (theme.displayMode === 'group_progressive_active') {
      return {
        ...baseStyle,
        opacity: index <= activeIndex ? 1 : 0,
        visibility: index <= activeIndex ? 'visible' : 'hidden',
      } as CSSProperties;
    }

    if (theme.displayMode === 'highlight' && theme.id !== 'highlight_group') {
      return {
        ...baseStyle,
        opacity: index <= activeIndex ? 1 : 0.3,
        visibility: 'visible',
      } as CSSProperties;
    }

    return baseStyle;
  };

  return (
    <div style={styles.container} className="rounded-lg overflow-hidden">
      <img src={BACKGROUND_IMAGE} alt="" style={styles.background} />
      <div style={styles.overlay} />
      <div style={styles.textContainer}>
        {displayWords.map((word, index) => (
          <span
            key={`${word}-${index}`}
            className={getFontClass(customization?.font || theme.fontFamily)}
            style={getWordStyle(index)}
          >
            {word}
          </span>
        ))}
      </div>
    </div>
  );
}

const getFontClass = (fontValue: string) => {
  switch (fontValue) {
    case 'poppins-regular':
      return `${poppins.className} font-normal`;
    case 'poppins-bold':
      return `${poppins.className} font-bold`;
    case 'poppins-bold-italic':
      return `${poppins.className} font-bold italic`;
    case 'noto-sans':
      return `${notoSans.className} font-normal`;
    case 'inter':
      return inter.className;
    case 'dm-sans':
      return dmSans.className;
    case 'noto-sans-devanagari':
      return `${notoSansDevanagari.className} font-normal`;
    case 'baloo-thambi':
      return `${balooThambi.className} font-normal`;
    case 'hind-guntur':
      return `${hindGuntur.className} font-normal`;
    case 'noto-sans-arabic':
      return `${notoSansArabic.className} font-normal`;
    // case 'noto-sans-sc':
    //   return `${notoSansSC.className} font-normal`;
    case 'noto-sans-jp':
      return `${notoSansJP.className} font-normal`;
    case 'noto-sans-kr':
      return `${notoSansKR.className} font-normal`;
    case 'noto-sans-bengali':
      return `${notoSansBengali.className} font-normal`;
    case 'noto-nastaliq-urdu':
      return `${notoNastaliqUrdu.className} font-normal`;
    case 'noto-sans-gurmukhi':
      return `${notoSansGurmukhi.className} font-normal`;
    
    // New English font cases
    case 'dancing-script':
      return `${dancingScript.className} font-normal`;
    case 'oswald':
      return `${oswald.className} font-normal`;
    case 'playfair-display':
      return `${playfairDisplay.className} font-normal`;
    case 'rubik':
      return `${rubik.className} font-normal`;
    case 'ubuntu':
      return `${ubuntu.className} font-normal`;
    case 'kanit':
      return `${kanit.className} font-normal`;
    case 'bebas-neue':
      return `${bebasNeue.className} font-normal`;
    case 'anton':
      return `${anton.className} font-normal`;
    case 'gravitas-one':
      return `${gravitasOne.className} font-normal`;
    default:
      return '';
  }
};
