'use client'

import {arial} from '@/fonts/font'

import { checkIfFocus, formatTimeLeft, getPercentLeft, getTimeLeft } from "@/lib/utils"
import { useState , useEffect } from "react"

import Navbar from "@/components/Navbar";
import Timer from '@/components/Timer';
import Chat from '@/components/Chat';

// import Image from 'next/image'

export default function Home() {

  const [isFocus , setIsFocus] = useState(() => checkIfFocus());
  const [timeLeft , setTimeLeft] = useState(() => getTimeLeft());

  const formattedTimeLeft = formatTimeLeft(timeLeft);
  const progress = getPercentLeft(timeLeft , isFocus);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft());
      setIsFocus(checkIfFocus());

      document.title = isFocus ? `Focus - ${formattedTimeLeft}` : `Break - ${formattedTimeLeft}`;

    }, 900);
    return () => clearInterval(interval);
  } , [isFocus , formattedTimeLeft])


  return (

    <div className={` ${checkIfFocus() ? 'bg-red-600' : 'bg-blue-400'}`}>
      <Navbar isFocus={isFocus}/>
      {/* <Separator className="  w-full" /> */}

      <div className="flex  items-center justify-center max-w-7xl mx-auto  h-screen">
        <div className={`flex  items-center ${isFocus ? `justify-center` : `justify-between`} gap-24 w-full px-8 `}>
          <Timer 
            isFocus={isFocus}
            // timeLeft={timeLeft}
            formattedTimeLeft={formattedTimeLeft}
            progress={progress}
          />
          <Chat />
          {/* {isFocus ? null : <Chat />} */}

        </div>
        <div className="flex items-center justify-center gap-4">
          {/* <button className="px-4 py-2 bg-red-600 rounded-lg text-white font-bold text-xl">
            Start
          </button>
          <button className="px-4 py-2 bg-red-600 rounded-lg text-white font-bold text-xl">
            Stop
          </button> */}
        </div>


      </div>
    </div>

    
  )
}
