'use client'

import {arial} from '@/fonts/font'

import { checkIfFocus, getTimeLeft } from "@/lib/utils"
import { useState } from "react"

import Navbar from "@/components/Navbar";
import { Separator } from "@/components/ui/separator";

// import Image from 'next/image'

export default function Home() {

  const [isFocus , setIsFocus] = useState(() => checkIfFocus());
  const [timeLeft , setTimeLeft] = useState(() => getTimeLeft());


  return (

    <div>
      <Navbar />
      <Separator className=" h-4 my-4" />

      <div className="flex flex-col items-center justify-center h-screen">
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className={` ${arial.className} text-9xl font-bold text-center`}>
            {timeLeft}
          </h1>
          <h2 className="text-4xl font-bold text-center">
            {isFocus ? "Focus" : "Break"}
          </h2>
        </div>
        <div className="flex items-center justify-center gap-4">
          <button className="px-4 py-2 bg-red-600 rounded-lg text-white font-bold text-xl">
            Start
          </button>
          <button className="px-4 py-2 bg-red-600 rounded-lg text-white font-bold text-xl">
            Stop
          </button>
        </div>


      </div>
    </div>

    
  )
}
