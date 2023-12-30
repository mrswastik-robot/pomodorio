import { DocumentData } from "firebase/firestore";
import React from "react";

import { arial } from "@/fonts/font";
import { User } from "firebase/auth";

type Props = {
  message: DocumentData;
  user: User | null;
  ref: any;

  isFocus: boolean;
};

const MessageContainer = ({ message, user , isFocus }: Props) => {
  return (
    <div>
      {message.author != user?.displayName ? (
        <div className="flex flex-col items-start mb-4">
          <div className={`bg-gray-200 text-black py-2 px-4 rounded-3xl max-w-[90%] ${isFocus ? `bg-gradient-to-r opacity-90 from-red-400/40 to-transparent` : `bg-gradient-to-r opacity-90 from-blue-400/40 to-transparent`}`}>
            <p className={`${arial.className} uppercase font-bold text-xs`}>
              {message.author}
            </p>
            <p className=" md:text-lg break-all ">{message.content}</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-end mb-4">
          <div className="bg-gray-200 text-black py-2 px-4 rounded-3xl max-w-[90%]">
            <p className={`${arial.className} uppercase font-bold text-xs`}>
              {message.author}
            </p>
            <p className=" md:text-lg break-all">{message.content}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageContainer;
