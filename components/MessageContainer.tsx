import { DocumentData } from "firebase/firestore";
import React from "react";

import { arial } from "@/fonts/font";
import { User } from "firebase/auth";

type Props = {
  message: DocumentData;
  user: User | null;
  ref: any;
};

const MessageContainer = ({ message, user }: Props) => {
  return (
    <div>
      {message.author != user?.displayName ? (
        <div className="flex flex-col items-start mb-4">
          <div className="bg-gray-200 text-black py-2 px-4 rounded-3xl max-w-[70%]">
            <p className={`${arial.className} uppercase font-bold text-xs`}>
              {message.author}
            </p>
            <p className=" md:text-lg ">{message.content}</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-end mb-4">
          <div className="bg-gray-200 text-black py-2 px-4 rounded-3xl max-w-[70%]">
            <p className={`${arial.className} uppercase font-bold text-xs`}>
              {message.author}
            </p>
            <p className=" md:text-lg ">{message.content}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageContainer;
