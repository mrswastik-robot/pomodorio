"use client";

import React, { useEffect } from "react";

import { useState } from "react";

import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import { Button } from "./ui/button";

import { arial } from "@/fonts/font";
import { Rubik } from "next/font/google";
const rubik = Rubik({ subsets: ["latin"], weight: "500" });

import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

// import { Dialog } from './ui/dialog'

import Image from "next/image";
import play from '@/public/play.svg'
import pauseSVG from '@/public/pause.svg'
import settings from '@/public/settings.svg'
import settingsPro from '@/public/settingsPro.svg'

type Props = {
  isFocus: boolean;
  // timeLeft: number
  formattedTimeLeft: string;
  progress: number;

  pause: boolean;
  togglePause: () => void;
  resumeTimer: () => void;

  resetTimer: () => void;
  setNewFocusTime: (newFocusTime: string) => void;
  setNewBreakTime: (newBreakTime: string) => void;

  setProgress: (progress: number) => void;

  newFocusTime: string;
  newBreakTime: string;
};

const Timer = ({isFocus, formattedTimeLeft, progress, pause, togglePause, resumeTimer , resetTimer , setNewBreakTime , setNewFocusTime , setProgress , newFocusTime , newBreakTime}: Props) => {


  const [goalFocus, setGoalFocus] = useState(25);
  const [goalBreak, setGoalBreak] = useState(5);

  function onClickFocus(adjustment: number) {
    setGoalFocus(Math.max(5, Math.min(55, goalFocus + adjustment)));
  }

  function onClickBreak(adjustment: number) {
    setGoalBreak(Math.max(5, Math.min(55, goalBreak + adjustment)));
  }

  useEffect(() => {
    if(newFocusTime && newBreakTime)
    {
      resetTimer();
    }
  }, [newFocusTime , newBreakTime ]);

  function handleSubmit()
  {
    setNewFocusTime(goalFocus.toString());
    setNewBreakTime(goalBreak.toString());

    setProgress(0);


    // resetTimer();
  }

  return (
    <div
      className={` md:w-[40rem] md:h-[43rem] w-[20rem] h-[20rem] items-center justify-center  ${rubik.className} `}
    >
      <div className=" md:h-[40rem] ">
        <CircularProgressbarWithChildren
          value={progress}
          styles={{
            path: {
              stroke: "#fff",
              strokeLinecap: "round",
              strokeWidth: "5",
              transition: 'stroke-dashoffset 0.5s ease 0s',
              transform: 'rotate(0.01turn)',
              transformOrigin: "center center",
            },
            trail: {
              stroke: "none",
              // strokeLinecap: "butt",
              transform: 'rotate(0.01turn)',
              transformOrigin: "center center",
            },
          }}
        >
          <div className="flex flex-col items-center justify-center gap-2 mx-auto">
            <p className="md:text-9xl text-5xl font-bold text-white md:w-[21.5rem] w-[8.1rem]  text-center">
              {formattedTimeLeft}
            </p>
            <p className="md:text-2xl text-xl font-bold text-white">
              {isFocus ? "Focus" : "Break"}
            </p>
          </div>
        </CircularProgressbarWithChildren>
      </div>

      <div className=" md:h-[3rem] mt-7  flex items-center justify-center gap-3">
        {pause ? (
          <Button
            onClick={resumeTimer}
            className=" bg-white hover:bg-gray-200 h-full w-full text-black rounded-full"
          >
            <Image src={play} width={40} height={40} alt="play" />
          </Button>
        ) : (
          <Button
            onClick={togglePause}
            className=" bg-white hover:bg-gray-200 h-full w-full text-black rounded-full"
          >
            <Image src={pauseSVG} width={40} height={40} alt="pause" />
          </Button>
        )}

        <div className=" w-full h-full">
          <Drawer>
            <DrawerTrigger asChild className=" w-full h-full">
              <Button variant="outline" className="bg-white hover:bg-gray-200 h-full w-full text-black rounded-full">
                <Image src={settingsPro}  alt="edit" width={40} height={20} className="  "/>
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <div className="mx-auto w-full max-w-sm">
                <DrawerHeader>
                  <DrawerTitle>Move Goal</DrawerTitle>
                  <DrawerDescription>
                    Set your Focus and Break timers.
                  </DrawerDescription>
                </DrawerHeader>

                {/* Focus k liye input */}
                <div className="p-4 pb-0">
                  <div className="flex items-center justify-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 shrink-0 rounded-full"
                      onClick={() => onClickFocus(-5)}
                      disabled={goalFocus <= 5}
                    >
                      <MinusIcon className="h-4 w-4" />
                      <span className="sr-only">Decrease</span>
                    </Button>
                    <div className="flex-1 text-center">
                      <div className="text-7xl font-bold tracking-tighter">
                        {goalFocus}
                      </div>
                      <div className="text-[0.70rem] uppercase text-muted-foreground">
                        Focus Time
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 shrink-0 rounded-full"
                      onClick={() => onClickFocus(5)}
                      disabled={goalFocus >= 55}
                    >
                      <PlusIcon className="h-4 w-4" />
                      <span className="sr-only">Increase</span>
                    </Button>
                  </div>
                </div>

                {/* Break k liye input */}
                <div className="p-4 pb-0">
                  <div className="flex items-center justify-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 shrink-0 rounded-full"
                      onClick={() => onClickBreak(-5)}
                      disabled={goalBreak <= 5}
                    >
                      <MinusIcon className="h-4 w-4" />
                      <span className="sr-only">Decrease</span>
                    </Button>
                    <div className="flex-1 text-center">
                      <div className="text-7xl font-bold tracking-tighter">
                        {goalBreak}
                      </div>
                      <div className="text-[0.70rem] uppercase text-muted-foreground">
                        Break Time
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 shrink-0 rounded-full"
                      onClick={() => onClickBreak(5)}
                      disabled={goalBreak >= 55}
                    >
                      <PlusIcon className="h-4 w-4" />
                      <span className="sr-only">Increase</span>
                    </Button>
                  </div>
                </div>


                <DrawerFooter>
                  <DrawerClose asChild>
                    <div className="  flex-row w-full space-y-2">
                      <Button onClick={handleSubmit} className=" w-full">Submit</Button>
                      <Button variant="outline" className=" w-full">Cancel</Button>
                    </div>
                    
                  </DrawerClose>
                </DrawerFooter>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </div>
  );
};

export default Timer;
