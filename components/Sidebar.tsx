"use client"
// Sidebar.tsx
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import { HiHome, HiChat, HiUserGroup } from 'react-icons/hi';
import { RiContactsBookFill, RiSettings3Fill } from 'react-icons/ri';
import { HiBellAlert } from 'react-icons/hi2';
import { BiSearch } from 'react-icons/bi';

import SidebarItem from './SidebarItem'; // Assuming you have SidebarItem component in the same directory
import { useEffect, useState } from 'react';
import Box from './Box';
import { HiArrowsUpDown } from 'react-icons/hi2';
import { twMerge } from 'tailwind-merge';

interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const routes = useMemo(
    () => [
      {
        icon: HiHome,
        label: 'Dashboard',
        active: pathname === '/home',
        href: '/',
      },
      {
        icon: HiChat,
        label: 'Chats',
        active: pathname === '/chats',
        href: '/',
      },
      {
        icon: HiUserGroup,
        label: 'Groups',
        active: pathname === '/search',
        href: '/search',
      },
      {
        icon: RiContactsBookFill,
        label: 'Contacts',
        active: pathname === '/contacts',
        href: '/',
      },
      {
        icon: HiBellAlert,
        label: 'Logs',
        active: pathname === '/alert',
        href: '/',
      },
      {
        icon: RiSettings3Fill,
        label: 'Settings',
        active: pathname === '/settings',
        href: '/',
      },
    ],
    [pathname]
  );

  return (
    <div
      className={twMerge(`
          flex 
          h-full
      `, 'h-[calc(100%-80px)]')}
    >
      <div
        className={twMerge(`
            md:flex
            flex-col
            gap-y-2
            bg-white
            p-2
            transition-all
            border-r
            border-gray-300
        `, 'md:w-[240px]')}
      >
        <Box>
          <div className="flex flex-col gap-y-4 px-5 py-4">
            {/* Account Information */}
            <div className="flex items-center gap-x-4 mb-4">
              <img
                src="data:image/webp;base64,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"
                alt="Profile Image"
                className="w-8 h-8 rounded-full"
              />
              <div className="flex flex-col flex-grow">
                <div className="text-black font-bold text-lg">Perisckope</div>
                <div className="text-gray-500 text-sm">bharat@haslabs.dev</div>
              </div>
              <div className="flex flex-col">
                <button
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  className="text-white hover:text-gray-300 transition"
                >
                  <HiArrowsUpDown className="text-black" />
                </button>
              </div>
            </div>

            {/* Sidebar Routes (conditionally rendered based on isCollapsed) */}
            {!isCollapsed &&
              routes.map((item, index) => (
                <SidebarItem key={item.label} {...item} />
              ))}

            {/* Collapse Button */}
          </div>
        </Box>
      </div>
      <main className="h-full flex-1 overflow-y-auto py-2">{children}</main>
    </div>
  );
};

export default Sidebar;
