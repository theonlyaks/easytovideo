import { FiCreditCard, FiZap, FiImage, FiBox, FiSettings, FiServer, FiHeadphones, FiClock } from "react-icons/fi";
import { IconType } from "react-icons";

export interface AuthPromotionItem {
  icon: IconType;
  title: string;
  description: string;
}

export const AUTH_PROMOTION_ITEMS: AuthPromotionItem[] = [
  {
    icon: FiZap,
    title: "One-Click AI Effects",
    description: "Transform your videos instantly with professional AI-powered effects at the click of a button"
  },
  {
    icon: FiZap,
    title: "Smart Effects",
    description: "Access to intelligent effect generation and processing tools"
  },
  {
    icon: FiImage,
    title: "Stock Photos / Videos",
    description: "Access to a comprehensive library of stock media content"
  },
  {
    icon: FiBox,
    title: "AI Generated Images",
    description: "AI images using advanced technology",
  },
  {
    icon: FiSettings,
    title: "Advanced Effects Suite",
    description: "Professional-grade effects and editing capabilities",
  }
];