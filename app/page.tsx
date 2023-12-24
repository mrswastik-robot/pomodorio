'use client'

import {arial} from '@/fonts/font'

import { checkIfFocus, formatTimeLeft, getPercentLeft, getTimeLeft } from "@/lib/utils"
import { useState , useEffect } from "react"

import Navbar from "@/components/Navbar";
import { Separator } from "@/components/ui/separator";
import Timer from '@/components/Timer';

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
      <Navbar />
      <Separator className=" h-1 mt-[4rem] w-full" />

      <div className="flex flex-col items-center justify-center h-screen">
        <div className="flex flex-col items-center justify-center gap-4">
          <Timer 
            isFocus={isFocus}
            // timeLeft={timeLeft}
            formattedTimeLeft={formattedTimeLeft}
            progress={progress}
          />
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
