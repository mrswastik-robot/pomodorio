"use client";

import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Timer from "@/components/Timer";
import Chat from "@/components/Chat";
import { Button } from "@/components/ui/button";

export default function Home() {
  const INITIAL_FOCUS_TIME = 1 * 60;
  const INITIAL_BREAK_TIME = 2 * 60;

  const [initialMode, setInitialMode] = useState(true); // true = focus, false = break
  const [isFocus, setIsFocus] = useState(false);
  const [focusTime, setFocusTime] = useState(INITIAL_FOCUS_TIME);
  const [breakTime, setBreakTime] = useState(INITIAL_BREAK_TIME);
  const [timeLeft, setTimeLeft] = useState(focusTime);
  const [formattedTimeLeft, setFormattedTimeLeft] = useState("25:00");
  const [progress, setProgress] = useState(0);
  const [pause, setPause] = useState(true);
  const [savedTime, setSavedTime] = useState(0);
  const [timerResumed, setTimerResumed] = useState(false);

  const [newFocusTime, setNewFocusTime] = useState('');
  const [newBreakTime, setNewBreakTime] = useState('');


  const timer = useRef<NodeJS.Timeout | null>(null);
  let minutes = Math.floor(timeLeft / 60);

  const startTimer = (time: number) => {
    let seconds = 0;
    timer.current = setInterval(() => {
      if (time > 0 && !pause) {
        setFormattedTimeLeft(
          `${minutes < 10 ? `0${minutes}` : minutes}:${
            seconds < 10 ? `0${seconds}` : seconds
          }`
        );
        setProgress(100 - (time / (isFocus ? focusTime : breakTime)) * 100);
        setTimeLeft(time);
        time--;

        minutes = Math.floor(time / 60);
        seconds = time % 60;
      } else {
        clearInterval(timer.current!);
        if (!pause) {
          setIsFocus(!isFocus);
          setTimeLeft(isFocus ? breakTime : focusTime);
          startTimer(isFocus ? breakTime : focusTime);
        }
      }
    }, 1000);
  };

  useEffect(() => {
    setTimeLeft(isFocus ? focusTime : breakTime);

    if (!pause && timerResumed) {
      startTimer(timeLeft);
    }

    return () => {
      if (timer.current) {
        clearInterval(timer.current);
      }
    };
  }, [isFocus, focusTime, breakTime, pause, timerResumed]);

  const togglePause = () => {
    setPause(prevPause => {
      if (!prevPause) {
        setSavedTime(timeLeft);
        setTimerResumed(true);
      }
      return !prevPause;
    });
  };

  const resumeTimer = () => {
    if (!timerResumed) {
      setInitialMode(false);
      setIsFocus(true); // Start in focus mode
      setTimeLeft(focusTime);
      setTimerResumed(true);
    } else {
      setTimeLeft(savedTime);
    }
    setPause(false);
  };

  const resetTimer = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (newFocusTime && newBreakTime) {
      setFocusTime(parseInt(newFocusTime, 10) * 60);
      setBreakTime(parseInt(newBreakTime, 10) * 60);
      setTimeLeft(isFocus ? parseInt(newFocusTime, 10) * 60 : parseInt(newBreakTime, 10) * 60);
      setFormattedTimeLeft(`${newFocusTime}:00`);
      setPause(true);
      setSavedTime(0);
      setTimerResumed(false);
      setInitialMode(true);
      setIsFocus(false);
    }
  };
  

  
  return (
    // <div className={` ${isFocus ? "bg-red-600" : "bg-blue-400"}`}>
    <div className={` ${initialMode ? "bg-[#418B8B]" : `${isFocus ? 'bg-red-600' : 'bg-blue-400'}`}`}>
      <Navbar isFocus={isFocus} />
      <div className="flex items-center justify-center max-w-7xl mx-auto md:h-screen">
        <div className={`flex flex-col md:flex-row space-y-6 justify-center mt-5 md:mt-0 md:mb-0 items-center ${isFocus ? "justify-center" : "md:justify-between"} mx-auto gap-24 w-full px-8`}>
          <Timer
            isFocus={isFocus}
            formattedTimeLeft={formattedTimeLeft}
            progress={progress}
          />
          <Chat isFocus={isFocus} />
        </div>
        <div className="flex items-center justify-center gap-4">
          {pause ? (
            <Button onClick={resumeTimer}>Resume</Button>
          ) : (
            <Button onClick={togglePause}>Pause</Button>
          )}

<form onSubmit={resetTimer}>
          <input
            placeholder="focus time"
            value={newFocusTime}
            onChange={(e) => setNewFocusTime(e.target.value)}
          />

          <input
            placeholder="break time"
            value={newBreakTime}
            onChange={(e) => setNewBreakTime(e.target.value)}
          />

          <button type="submit">Set</button>
        </form>
        </div>
      </div>
    </div>
  );
}
