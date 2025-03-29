import React, { useState, useMemo, useCallback, useEffect, memo } from 'react';
import { HexColorPicker } from "react-colorful";
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
} from 'next/font/google';
import { CUSTOMIZATION_OPTIONS } from '@/constants/types/subtitle';
import { Language } from '@/constants/types/languages';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
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

interface CustomizationPanelProps {
  onFontChange: (font: string) => void;
  onSizeChange: (size: string) => void;
  onColorChange: (color: string) => void;
  selectedFont: string;
  selectedSize: string;
  selectedColor: string;
  isHighlightMode?: boolean;
  targetLanguage?: Language;
}

const ColorPickerComponent = memo(({ color, onChange }: { color: string; onChange: (color: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {isOpen && (
        <div className="absolute z-10">
          <div className="fixed inset-0" onClick={() => setIsOpen(false)} />
          <div onClick={(e) => e.stopPropagation()}>
            <HexColorPicker color={color} onChange={onChange} />
          </div>
        </div>
      )}
      <div
        onClick={() => setIsOpen(true)}
        className="h-10 w-full rounded-md border border-neutral/30 cursor-pointer"
        style={{ backgroundColor: color }}
      />
    </div>
  );
});

export const CustomizationPanel = memo(({
  onFontChange,
  onSizeChange,
  onColorChange,
  selectedFont,
  selectedSize,
  selectedColor,
  isHighlightMode = false,
  targetLanguage
}: CustomizationPanelProps) => {
  const getFontClass = useMemo(() => (fontValue: string) => {
    switch (fontValue) {
      case 'poppins-regular': return `${poppins.className} font-normal`;
      case 'poppins-bold': return `${poppins.className} font-bold`;
      case 'poppins-bold-italic': return `${poppins.className} font-bold italic`;
      case 'noto-sans': return `${notoSans.className} font-normal`;
      case 'noto-sans-devanagari': return `${notoSansDevanagari.className} font-normal`;
      case 'baloo-thambi': return `${balooThambi.className} font-normal`;
      case 'hind-guntur': return `${hindGuntur.className} font-normal`;
      case 'noto-sans-arabic': return `${notoSansArabic.className} font-normal`;
      // case 'noto-sans-sc': return `${notoSansSC.className} font-normal`;
      case 'noto-sans-jp': return `${notoSansJP.className} font-normal`;
      case 'noto-sans-kr': return `${notoSansKR.className} font-normal`;
      case 'noto-sans-bengali': return `${notoSansBengali.className} font-normal`;
      case 'noto-nastaliq-urdu': return `${notoNastaliqUrdu.className} font-normal`;
      case 'noto-sans-gurmukhi': return `${notoSansGurmukhi.className} font-normal`;
      
      // New English font cases
      case 'dancing-script': return `${dancingScript.className} font-normal`;
      case 'oswald': return `${oswald.className} font-normal`;
      case 'playfair-display': return `${playfairDisplay.className} font-normal`;
      case 'rubik': return `${rubik.className} font-normal`;
      case 'ubuntu': return `${ubuntu.className} font-normal`;
      case 'kanit': return `${kanit.className} font-normal`;
      case 'bebas-neue': return `${bebasNeue.className} font-normal`;
      case 'anton': return `${anton.className} font-normal`;
      case 'gravitas-one': return `${gravitasOne.className} font-normal`;
      
      default: return '';
    }
  }, []);

  const availableFonts = useMemo(() => {
    if (!targetLanguage?.supported_fonts) return CUSTOMIZATION_OPTIONS.fonts;
    return CUSTOMIZATION_OPTIONS.fonts.filter(font => 
      targetLanguage.supported_fonts?.includes(font.value)
    );
  }, [targetLanguage]);

  const handleFontChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    onFontChange(e.target.value);
  }, [onFontChange]);

  useEffect(() => {
    if (targetLanguage?.supported_fonts) {
      const isSelectedFontSupported = targetLanguage.supported_fonts.includes(selectedFont);
      if (!isSelectedFontSupported && availableFonts.length > 0) {
        onFontChange(availableFonts[0].value);
      }
    }
  }, [targetLanguage, selectedFont, availableFonts, onFontChange]);

  return (
    <div className="bg-background-paper rounded-lg mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Font Selection */}
        <div>
          <label className="block text-sm font-semibold mb-2">Font Style</label>
          <select
            value={selectedFont}
            onChange={handleFontChange}
            className="w-full p-2 rounded-md border border-neutral/30 bg-background focus:border-primary"
          >
            {availableFonts.map((font) => (
              <option 
                key={font.value} 
                value={font.value}
                className={`${getFontClass(font.value)} ${font.className || ''}`}
              >
                {font.label}
              </option>
            ))}
          </select>
        </div>

        {/* Size Selection */}
        <div>
          <label className="block text-sm font-semibold mb-2">Font Size</label>
          <div className="flex gap-2">
            {CUSTOMIZATION_OPTIONS.sizes.map((size) => (
              <button
                key={size.value}
                onClick={() => onSizeChange(size.value)}
                className={`flex-1 p-2 rounded-md border ${
                  selectedSize === size.value
                    ? 'border-primary bg-primary/10'
                    : 'border-neutral/30'
                }`}
              >
                {size.label}
              </button>
            ))}
          </div>
        </div>

        {/* Color Selection */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            {isHighlightMode ? 'Highlight Color' : 'Text Color'}
          </label>
          <ColorPickerComponent color={selectedColor} onChange={onColorChange} />
        </div>
      </div>
    </div>
  );
});
