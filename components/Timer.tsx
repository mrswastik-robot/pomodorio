import React from 'react'

import { CircularProgressbarWithChildren } from 'react-circular-progressbar'

type Props = {
    isFocus: boolean
    // timeLeft: number
    formattedTimeLeft: string
    progress: number
}

const Timer = ({isFocus , formattedTimeLeft , progress}: Props) => {
  return (
    <div className=' md:w-[40rem] md:h-[40rem] w-[20rem] h-[20rem]'>
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
            <div className="flex flex-col items-center justify-center gap-2">
                <p className="md:text-9xl text-5xl font-bold text-white">
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