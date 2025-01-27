"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { menuItems } from "@/constants/types/sidebar-menu-items";
import { HiMenu, HiX } from "react-icons/hi";
import { useState, memo } from "react";
import { useScrollLock } from "@/store/hooks/useScrollLock";
import { useSession } from "next-auth/react";
import Image from "next/image";

const MenuItem = memo(({ item, isActive, onClick }: {
  item: typeof menuItems[keyof typeof menuItems][0],
  isActive: boolean,
  onClick: () => void
}) => (
  <Link
    href={item.path}
    onClick={onClick}
    className={`flex items-center px-4 py-2 text-sm rounded-lg transition-colors
      ${isActive ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-50"}`}
  >
    <span className="mr-3" aria-hidden="true">
      <item.icon size={16} />
    </span>
    {item.label}
  </Link>
));
MenuItem.displayName = 'MenuItem';

const MenuGroup = memo(({ category, items, activePathname, onItemClick }: {
  category: string,
  items: typeof menuItems[keyof typeof menuItems],
  activePathname: string,
  onItemClick: () => void
}) => (
  <div className="mb-8">
    <h3 className="text-sm font-medium text-gray-500 mb-2">{category}</h3>
    <div className="space-y-1">
      {items.map((item) => (
        <MenuItem
          key={item.path}
          item={item}
          isActive={activePathname === item.path}
          onClick={onItemClick}
        />
      ))}
    </div>
  </div>
));
MenuGroup.displayName = 'MenuGroup';

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  useScrollLock(isOpen);

  const handleClose = () => setIsOpen(false);

  return (
    <>
      <button
        className={`
          lg:hidden fixed z-50 p-2 text-black bg-white rounded-lg border
          transition-all duration-200 ease-in-out
          ${isOpen ? "top-4 left-[260px]" : "top-4 left-4"}
        `}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
      >
        {isOpen ? <HiX size={20} /> : <HiMenu size={20} />}
      </button>

      <div
        className={`
          fixed lg:static inset-y-0 left-0 z-40
          w-64 bg-white border-r
          transform transition-transform duration-200 ease-in-out
          h-screen flex flex-col
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
        aria-hidden={!isOpen}
      >
        <div className="flex-1 overflow-y-auto p-4">
          {Object.entries(menuItems).map(([category, items]) => (
            <MenuGroup
              key={category}
              category={category}
              items={items}
              activePathname={pathname}
              onItemClick={handleClose}
            />
          ))}
        </div>

        <div className="sticky bottom-0 bg-white border-t p-4">
          <Link
            href="/studio/account"
            onClick={handleClose}
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-50 border bg-white w-full"
          >
            <div className="min-w-8 w-8 h-8 relative flex-shrink-0">
              <Image
                src={session?.user?.image || "/default-avatar.png"}
                alt={`${session?.user?.name || 'User'}'s profile`}
                fill
                sizes="32px"
                className="rounded-full object-cover"
                priority={false}
              />
            </div>
            <div className="flex-grow min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate max-w-[150px]">
                {session?.user?.name || "User"}
              </p>
              <p className="text-xs text-left text-gray-500">Settings</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Backdrop - using CSS instead of conditional rendering */}
      <div 
        className={`lg:hidden fixed inset-0 bg-black/50 z-30 transition-opacity duration-200
          ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={handleClose}
        aria-hidden="true"
      />
    </>
  );
}
