"use client";
import {usePathname} from 'next/navigation'
import { useMemo } from 'react';
import {HiHome,HiChat,HiUserGroup} from 'react-icons/hi';
import { RiContactsBookFill,RiSettings3Fill } from "react-icons/ri";
import { HiBellAlert } from "react-icons/hi2";
import {BiSearch} from 'react-icons/bi';
import { Song } from '@/types';
import SidebarItem from './SidebarItem'; './SidebarItem';
import { useEffect, useState } from "react";
import Box from './Box';
import Library from './Library';
import usePlayer from '@/hooks/usePlayer';
import { twMerge } from 'tailwind-merge';

interface SidebarProps{
    children: React.ReactNode;
    songs:Song[]
}


const Sidebar: React.FC<SidebarProps> = ({children, songs}) => {
    const pathname = usePathname();
    const player = usePlayer();
    const [isCollapsed, setIsCollapsed] = useState(false);

  

    const routes = useMemo(()=>[
        {
          icon: HiHome,
          label:'Dashboard',
          active:pathname === '/',
          href: '/',
        },
        {
            icon:HiChat,
            label:'Chats',
            active: pathname === '/search1',
            href:'/'
        }
        ,
        {
            icon:HiUserGroup,
            label:'Groups',
            active: pathname === '/search2',
            href:'/'
        }
        ,
        {
            icon:RiContactsBookFill,
            label:'Contacts',
            active: pathname === '/search4',
            href:'/'
        }
        ,
        {
            icon:HiBellAlert,
            label:'Logs',
            active: pathname === '/search5',
            href:'/search'
        }
        ,
        {
            icon:RiSettings3Fill,
            label:'Settings',
            active: pathname === '/search',
            href:'/search'
        }
    ],[pathname]);
    return (
      <div
        className={twMerge(`
          flex 
          h-full
        `, player.activeId && 'h-[calc(100%-80px)]')}
      >
        <div
          className={twMerge(`
            md:flex
            flex-col
            gap-y-2
            bg-black
            p-2
            transition-all
          `, 'md:w-[300px]')}
        >
          <Box>
            <div className='flex flex-col gap-y-4 px-5 py-4'>
              {/* Account Name */}
              <div className="text-white font-bold text-lg mb-4">Your Account Name</div>
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="text-white hover:text-gray-300 transition"
              >
                {isCollapsed ? 'Expand' : 'Collapse'}
              </button>
  
              {/* Sidebar Routes (conditionally rendered based on isCollapsed) */}
              {!isCollapsed &&
                routes.map((item, index) => (
                  <SidebarItem key={item.label} {...item} />
                ))}
  
              {/* Collapse Button */}
              
            </div>
          </Box>
        
        </div>
        <main className='h-full flex-1 overflow-y-auto py-2'>
          {children}
        </main>
      </div>
    );
  };
  
  export default Sidebar;