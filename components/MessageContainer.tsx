import { DocumentData } from 'firebase/firestore';
import React from 'react'

type Props = {
    message: DocumentData;
}

const MessageContainer = ({message}: Props) => {
  return (
    <div>
        {/* Messages from other people (left side) */}
        <div className="flex flex-col items-start mb-4">
          {/* Example message */}
          <div className="bg-gray-200 text-black py-2 px-4 rounded-3xl max-w-[70%]">
            <p>{message.content}</p>
          </div>
          {/* Add more messages here */}
        </div>

        {/* Messages from your side (right side) */}
        {/* <div className="flex flex-col items-end mb-4"> */}
          {/* Example message */}
          {/* <div className="bg-blue-500 py-2 px-4 rounded-3xl max-w-[70%] text-white"> */}
            {/* <p>Your message</p> */}
          {/* </div> */}
          {/* Add more messages here */}
        {/* </div> */}
        
    </div>
  )
}

export default MessageContainer