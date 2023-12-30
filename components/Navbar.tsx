import React, { useEffect , useState } from "react";
import Link from "next/link";

import { ThemeToggler } from "./ThemeToggler";

import {arial} from '@/fonts/font'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { onAuthStateChanged , User} from "firebase/auth";
import { auth } from "@/lib/firebase";
import Image from "next/image";
import userPro from '@/public/userPro.svg'

type Props = {
  isFocus: boolean;
};

const handleLogout = async () => {
  try {
    await auth.signOut();
  } catch (error) {
    console.log(error);
    
  }
}



const Navbar = ({isFocus}: Props) => {

  const[user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth ,(currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className={`fixed inset-x-0 top-0 ${isFocus ? `bg-transparent backdrop-blur-lg` :  `bg-transparent backdrop-blur-lg`} z-[10] h-fit   py-2 `}>
      <div className="flex items-center justify-between h-full gap-2 px-8 mx-auto max-w-7xl">
        <Link href={"/"} className="flex items-center gap-2">
          <p className={` ${arial.className} rounded-lg border-2 border-b-4 border-r-4 border-black px-2 py-1 text-xl font-bold transition-all hover:-translate-y-[2px] md:block dark:border-white`}>
            pomodorio
          </p>
        </Link>

        <div className="flex items-center mt-1">
          {/* <ThemeToggler className=" " /> */}

          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar className="">
                <AvatarFallback className=" uppercase italic font-extrabold text-center items-center justify-center">
                  {user ? (
                  user?.displayName?.slice(0 , 1)
                  ) : (
                    <Image src={userPro} alt="User" fill className=" z-10 "/>
                  )}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>
                {user ? 
                  <span>You are logged in as <span className="italic uppercase font-extrabold">{user?.displayName}</span></span>
                : ("You are not logged in")}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {user ? (<DropdownMenuItem className=" text-red-600" onClick={handleLogout}>Logout</DropdownMenuItem>) : ("")}
        
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
      </div>
    </div>
  );
};

export default Navbar;
