import { FiMusic, FiVideo, FiHeadphones, FiPlay } from "react-icons/fi";
import { IconType } from "react-icons";

export interface AuthPromotionItem {
  icon: IconType;
  title: string;
  description: string;
}

export const AUTH_PROMOTION_ITEMS: AuthPromotionItem[] = [
  {
    icon: FiMusic,
    title: "Transform Your Ideas Into Sound",
    description: "Generate custom sound effects for your videos, games, and creative projects in seconds"
  },
  {
    icon: FiVideo,
    title: "Perfect for Content Creators",
    description: "Enhance your videos with unique and professional sound effects"
  },
  {
    icon: FiHeadphones,
    title: "High Quality Audio",
    description: "Create studio-quality sound effects powered by AI technology"
  },
  {
    icon: FiPlay,
    title: "Quick and Easy",
    description: "Generate sound effects in seconds with simple text descriptions"
  }
];
