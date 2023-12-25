import React, { useEffect } from "react";

import { useState } from "react";

import { arial } from "@/fonts/font";

import AuthModal from "./auth-modal";

import { User, onAuthStateChanged } from "firebase/auth";
import {auth, db} from '@/lib/firebase'
import { DocumentData, addDoc, collection, serverTimestamp , orderBy , onSnapshot, query } from "firebase/firestore";

type Props = {
  isFocus: boolean;
};

const Chat = ({ isFocus }: Props) => {

    const [isOpen , setIsOpen] = useState(false);
    const [user , setUser] = useState<User | null>(null);
    const [messages, setMessages] = useState<DocumentData[]>([]);

    //getting all the messages using onSnapshot
    useEffect(() => {
        const unsubscribe = onSnapshot(
          query(collection(db, 'messages'), orderBy('createdAt', 'asc')),
          (snapshot) => {
            const messages = snapshot.docs.map((doc) => ({
              ...doc.data(),
              id: doc.id,
            }));
            setMessages(messages);
          }
        );
        return () => unsubscribe();
    }, [])

    console.log(messages);


    useEffect(() => {
        onAuthStateChanged(auth , (user) => {
            setUser(user);
        });
    }, [])

    async function onSubmitMessage(event: React.SyntheticEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const content = String(formData.get('content'));

        if(!user)
        {
            setIsOpen(true);
        }
        else{
          const doc = await addDoc(collection(db , 'messages'), {
            content,
            createdAt: serverTimestamp(),
            author: user.displayName,
          });

          (event.target as HTMLFormElement).reset();
          document.querySelector(`#${doc.id}`) ?.scrollIntoView({behavior: 'smooth'});

        }
    }

  return (
    <div className="relative md:w-[30rem] md:h-[40rem] w-[20rem] h-[31rem] border-4  rounded-3xl  flex flex-col p-3">

      <AuthModal isOpen={isOpen} setIsOpen={setIsOpen}/>


      <div className=" overflow-y-auto md:h-[35rem] h-[26rem] no-scrollbar">
        {/* Messages from other people (left side) */}
        <div className="flex flex-col items-start mb-4">
          {/* Example message */}
          <div className="bg-gray-200 text-black py-2 px-4 rounded-3xl max-w-[70%]">
            <p>Message from other people</p>
          </div>
          {/* Add more messages here */}
        </div>

        {/* Messages from your side (right side) */}
        <div className="flex flex-col items-end mb-4">
          {/* Example message */}
          <div className="bg-blue-500 py-2 px-4 rounded-3xl max-w-[70%] text-white">
            <p>Your message</p>
          </div>
          {/* Add more messages here */}
        </div>

        {/* Messages from your side (right side) */}
        <div className="flex flex-col items-end mb-4">
          {/* Example message */}
          <div className="bg-blue-500 py-2 px-4 rounded-3xl max-w-[70%] text-white">
            <p>Your message</p>
          </div>
          {/* Add more messages here */}
        </div>
        {/* Messages from your side (right side) */}
        <div className="flex flex-col items-end mb-4">
          {/* Example message */}
          <div className="bg-blue-500 py-2 px-4 rounded-3xl max-w-[70%] text-white">
            <p>Your message</p>
          </div>
          {/* Add more messages here */}
        </div>
        {/* Messages from your side (right side) */}
        <div className="flex flex-col items-end mb-4">
          {/* Example message */}
          <div className="bg-blue-500 py-2 px-4 rounded-3xl max-w-[70%] text-white">
            <p>Your message</p>
          </div>
          {/* Add more messages here */}
        </div>
        {/* Messages from your side (right side) */}
        <div className="flex flex-col items-end mb-4">
          {/* Example message */}
          <div className="bg-blue-500 py-2 px-4 rounded-3xl max-w-[70%] text-white">
            <p>Your message</p>
          </div>
          {/* Add more messages here */}
        </div>
        {/* Messages from your side (right side) */}
        <div className="flex flex-col items-end mb-4">
          {/* Example message */}
          <div className="bg-blue-500 py-2 px-4 rounded-3xl max-w-[70%] text-white">
            <p>Your message</p>
          </div>
          {/* Add more messages here */}
        </div>
        {/* Messages from your side (right side) */}
        <div className="flex flex-col items-end mb-4">
          {/* Example message */}
          <div className="bg-blue-500 py-2 px-4 rounded-3xl max-w-[70%] text-white">
            <p>Your message</p>
          </div>
          {/* Add more messages here */}
        </div>
        {/* Messages from your side (right side) */}
        <div className="flex flex-col items-end mb-4">
          {/* Example message */}
          <div className="bg-blue-500 py-2 px-4 rounded-3xl max-w-[70%] text-white">
            <p>Your message</p>
          </div>
          {/* Add more messages here */}
        </div>
        {/* Messages from your side (right side) */}
        <div className="flex flex-col items-end mb-4">
          {/* Example message */}
          <div className="bg-blue-500 py-2 px-4 rounded-3xl max-w-[70%] text-white">
            <p>Your message</p>
          </div>
          {/* Add more messages here */}
        </div>
        {/* Messages from your side (right side) */}
        <div className="flex flex-col items-end mb-4">
          {/* Example message */}
          <div className="bg-blue-500 py-2 px-4 rounded-3xl max-w-[70%] text-white">
            <p>Your message</p>
          </div>
          {/* Add more messages here */}
        </div>
        {/* Messages from your side (right side) */}
        <div className="flex flex-col items-end mb-4">
          {/* Example message */}
          <div className="bg-blue-500 py-2 px-4 rounded-3xl max-w-[70%] text-white">
            <p>Your message</p>
          </div>
          {/* Add more messages here */}
        </div>
        {/* Messages from your side (right side) */}
        <div className="flex flex-col items-end mb-4">
          {/* Example message */}
          <div className="bg-blue-500 py-2 px-4 rounded-3xl max-w-[70%] text-white">
            <p>Your message</p>
          </div>
          {/* Add more messages here */}
        </div>
        {/* Messages from your side (right side) */}
        <div className="flex flex-col items-end mb-4">
          {/* Example message */}
          <div className="bg-blue-500 py-2 px-4 rounded-3xl max-w-[70%] text-white">
            <p>Your message</p>
          </div>
          {/* Add more messages here */}
        </div>
        {/* Messages from your side (right side) */}
        <div className="flex flex-col items-end mb-4">
          {/* Example message */}
          <div className="bg-blue-500 py-2 px-4 rounded-3xl max-w-[70%] text-white">
            <p>Your message</p>
          </div>
          {/* Add more messages here */}
        </div>
      </div>


        {/* Gradient overlay */}
      <div className="absolute top-0 bg-transparent rounded-3xl left-0 right-0 h-40 bg-gradient-to-b opacity-40 from-gray-100 to-transparent"></div>



      {/* Input box */}
      <form onSubmit={onSubmitMessage} className=" absolute right-1 left-1 bottom-1 border  border-1 border-transparent">
        <div
          className={`flex  items-center ${
            isFocus ? `bg-[#3B3B3B]` : `bg-blue-500`
          } rounded-3xl p-2 `}
        >
          <input
            type="text"
            name="content"
            placeholder="Type your message..."
            className=" w-full flex-grow-0 border bg-[#3B3B3B] rounded-3xl py-2 px-4 mr-2 focus:outline-none border-transparent"
          />
          <button
            className={`${isFocus ? `bg-red-600` : `bg-blue-800`} ${
              arial.className
            } text-gray-800 py-2 px-4 rounded-3xl`}
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chat;
