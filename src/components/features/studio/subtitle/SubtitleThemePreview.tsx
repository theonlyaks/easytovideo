import React, { useMemo, CSSProperties } from 'react';
import { Poppins, Inter, DM_Sans, Noto_Sans_Devanagari } from "next/font/google";
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

const notoSansDevanagari = Noto_Sans_Devanagari({
  subsets: ['devanagari'],
  weight: ['400', '700']
});

export function SubtitleThemePreview({ theme, customization }: SubtitleThemePreviewProps) {
  const { displayWords, activeIndex } = useSubtitleAnimation(theme.displayMode);

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
    case 'inter':
      return inter.className;
    case 'dm-sans':
      return dmSans.className;
    case 'noto-sans-devanagari':
      return `${notoSansDevanagari.className} font-normal`;
    default:
      return '';
  }
};
