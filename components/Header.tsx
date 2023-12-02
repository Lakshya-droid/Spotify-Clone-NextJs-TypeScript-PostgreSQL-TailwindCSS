"use client"
import { useRouter } from "next/navigation";
import {twMerge} from 'tailwind-merge';
import {RxCaretLeft,RxCaretRight} from 'react-icons/rx';
import {HiHome} from "react-icons/hi"
import {BiSearch} from "react-icons/bi"
import {useSupabaseClient} from '@supabase/auth-helpers-react'

import Button from './Button'

import { FaUserAlt } from "react-icons/fa";
import {toast} from 'react-hot-toast';

interface HeaderProps{
    children: React.ReactNode;
    className?: string;
}

const Header:React.FC<HeaderProps> =(
    {
        children,
        className
    }
) => {
    const router = useRouter();
    const supabaseClient = useSupabaseClient();


    const handleLogout=async()=>{
        const {error} = await supabaseClient.auth.signOut();
        router.refresh();

        if(error){
           toast.error(error.message);
        }
        else{
            toast.success('Logged out')
        }
    }

  return (
    <div className={twMerge(`
      h-fit
      bg-white
      pt-2
      px-3
      pb-2
      from-emerald-800
    `,
     className
    )}
    >
        <div className="
        w-full
        flex
        items-center
        justify-between
        "
        >
            
            <div className="
            flex
            md:hidden
            gap-x-2
            items-center
            ">
              <button
              className="
              rounded-full
              p-2
              bg-white
              flex
              items-center
              justify-center
              hover:opacity-75
              transition
              "
              >
                  <HiHome
                  className="
                  text-black
                  "
                  size={20}
                  />
             </button>
              <button
              className="
              rounded-full
              p-2
              bg-white
              flex
              items-center
              justify-center
              hover:opacity-75
              transition
              "
              >
                  <BiSearch
                  className="
                  text-black
                  "
                  size={20}
                  />
             </button>
            </div>
            <div
            className="
            flex
            justify-between
            items-center
            gap-x-4
            "
            >
            </div>
        </div>
        {children}
    </div>
  )
}

export default Header
