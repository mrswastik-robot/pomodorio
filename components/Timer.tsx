import React from 'react'

import { CircularProgressbarWithChildren } from 'react-circular-progressbar'

import {arial} from '@/fonts/font'
import { Rubik } from 'next/font/google'
const rubik = Rubik({subsets: ['latin'], weight: '500'})

type Props = {
    isFocus: boolean
    // timeLeft: number
    formattedTimeLeft: string
    progress: number
}

const Timer = ({isFocus , formattedTimeLeft , progress}: Props) => {
  return (
    <div className={` md:w-[40rem] md:h-[40rem] w-[20rem] h-[20rem] ${rubik.className} `}>
        <CircularProgressbarWithChildren
        value={progress}
        styles={{
            path: {
            stroke: '#fff',
            strokeLinecap: 'butt',
            // transition: 'stroke-dashoffset 0.5s ease 0s',
            // transform: 'rotate(0.25turn)',
            transformOrigin: 'center center',
            },
            trail: {
            stroke: 'none',
            strokeLinecap: 'butt',
            // transform: 'rotate(0.25turn)',
            transformOrigin: 'center center',
            },
        }}
        >
            <div className="flex flex-col items-center justify-center gap-2 mx-auto">
                <p className="md:text-9xl text-5xl font-bold text-white md:w-[21.8rem] w-[8.2rem] text-center" >
                    {formattedTimeLeft}
                </p>
                <p className="md:text-2xl text-xl font-bold text-white">
                    {isFocus ? 'Focus' : 'Break'}
                </p>
            </div>
        </CircularProgressbarWithChildren>
    </div>
  )
}

export default Timer