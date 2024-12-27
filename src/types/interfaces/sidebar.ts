import { IconType } from 'react-icons';

export interface MenuItem {
  icon: IconType;
  label: string;
  path: string;
}

export interface MenuItems {
  [category: string]: MenuItem[];
}
