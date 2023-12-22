import { type ClassValue, clsx } from "clsx"
import dayjs from "dayjs"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


const FOCUS_TIME_TOTAL = 25 * 60 // 25 minutes
const BREAK_TIME_TOTAL = 5 * 60 // 5 minutes

//first focus : 0-24 , first break: 25-29
//second focus : 30-54 , second break: 55-59

export function getTimeLeft()
{
  const time = dayjs();
  const minute = time.minute();
  const hour = time.hour();

  const isFocus = checkIfFocus();
  const firstHalf = isBetween(0,29,minute);
  const firstFocusEnd = time.set('minute', 25).set('second', 0);
  const firstBreakEnd = time.set('minute', 30).set('second', 0);
  const secondFocusEnd = time.set('minute', 55).set('second', 0);
  const secondBreakEnd = time.set('hour' , hour + 1).set('minute', 0).set('second', 0);

  const activeEnd = firstHalf ? firstFocusEnd : secondFocusEnd;
  const breakEnd = firstHalf ? firstBreakEnd : secondBreakEnd;

  const timeLeft = isFocus ? activeEnd.diff(time, 'second') : breakEnd.diff(time, 'second');

  return timeLeft;
}


export function checkIfFocus()
{
  const time = dayjs();
  const minute = time.minute();
  return isBetween(0,24,minute) || isBetween(30,54,minute);
}

export function isBetween(start: number, end: number, value: number)
{
  return value >= start && value <= end;
}