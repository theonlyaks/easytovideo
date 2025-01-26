"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { menuItems } from "@/constants/types/sidebar-menu-items";
import { HiMenu, HiX } from "react-icons/hi";
import { useState } from "react";
import { useScrollLock } from "@/store/hooks/useScrollLock";
import { useSession } from "next-auth/react";
import Image from "next/image";

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const { data: session } = useSession();

  useScrollLock(isOpen);

  return (
    <>
      <button
        className={`
          lg:hidden fixed z-50 p-2 text-black bg-white rounded-lg border
          transition-all duration-200 ease-in-out
          ${isOpen ? "top-4 left-[260px]" : "top-4 left-4"}
        `}
        onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <HiX size={20} /> : <HiMenu size={20} />}
      </button>

      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`
          fixed lg:static inset-y-0 left-0 z-40
          w-64 bg-white border-r
          transform transition-transform duration-200 ease-in-out
          h-screen
          flex flex-col
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="flex-1 overflow-y-auto p-4">
          {/* Menu Items */}
          {Object.entries(menuItems).map(([category, items]) => (
            <div key={category} className="mb-8">
              <h3 className="text-sm font-medium text-gray-500 mb-2">
                {category}
              </h3>
              <div className="space-y-1">
                {items.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={`flex items-center px-4 py-2 text-sm rounded-lg transition-colors
                      ${
                        pathname === item.path
                          ? "bg-gray-100 text-gray-900"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                  >
                    <span className="mr-3">{<item.icon size={16} />}</span>
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="sticky bottom-0 bg-white border-t p-4">
          <Link
            href="/studio/account"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-50 border bg-white w-full"
          >
            <div className="min-w-8 w-8 h-8 relative flex-shrink-0">
              <Image
                src={session?.user?.image || "/default-avatar.png"}
                alt="Profile"
                fill
                className="rounded-full object-cover"
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
    </>
  );
}
