import React, { useEffect  , useRef} from "react";

import { useState } from "react";

import { arial } from "@/fonts/font";

import AuthModal from "./auth-modal";

import { User, onAuthStateChanged } from "firebase/auth";
import {auth, db} from '@/lib/firebase'
import { DocumentData, addDoc, collection, serverTimestamp , orderBy , onSnapshot, query } from "firebase/firestore";
import MessageContainer from "./MessageContainer";

type Props = {
  isFocus: boolean;
};

const Chat = ({ isFocus }: Props) => {

    const [isOpen , setIsOpen] = useState(false);
    const [user , setUser] = useState<User | null>(null);
    const [messages, setMessages] = useState<DocumentData[]>([]);

    const [inputValue , setInputValue] = useState('')       //send  button disable krne k liye

    const messagesEndRef = useRef<HTMLDivElement>(null);

  

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

    // console.log(messages);


    useEffect(() => {
        onAuthStateChanged(auth , (user) => {
            setUser(user);
        });
    }, [])
    // console.log(user);

     // Scroll to the latest message when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  

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
          // document.querySelector(`#${doc.id}`) ?.scrollIntoView({behavior: 'smooth'});

          setInputValue('');         //send button disable krne k liye

        }
    }

    //send button disable krna hain agar khuch inputbox me type hi ni kiya
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
      }

  const isInputEmpty = inputValue.trim().length === 0;

  return (
    <div className={`relative md:w-[33rem] md:h-[45rem] w-[20rem] h-[31rem] border-4  rounded-3xl  flex flex-col p-3 ${isFocus ? `blur-sm cursor-not-allowed` :  `blur-0`} `}>

      <AuthModal isOpen={isOpen} setIsOpen={setIsOpen}/>


      <div className=" overflow-y-auto md:h-[40rem] h-[25.5rem] no-scrollbar">
        {messages.map((message, index) => (
          <MessageContainer key={message.id} message={message} user={user} isFocus={isFocus}
          ref={index === messages.length - 1 ? messagesEndRef : null}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>


        {/* Gradient overlay */}
      <div className="absolute top-0 bg-transparent rounded-3xl left-0 right-0 h-40 bg-gradient-to-b opacity-40 from-gray-100 to-transparent"></div>



      {/* Input box */}
      <form onSubmit={onSubmitMessage} className=" absolute right-1 left-1 bottom-1 border  border-1 border-transparent">
        <div
          className={`flex  items-center ${
            isFocus ? `bg-[#3B3B3B]` : `bg-blue-600`
          } rounded-3xl p-2 `}
        >
          <input
            type="text"
            name="content"
            placeholder="Type your message..."
            autoComplete="off"
            disabled={isFocus}
            className={` w-full flex-grow-0 border ${isFocus ? `bg-[#3B3B3B] cursor-not-allowed` : `bg-blue-600`}  text-white rounded-3xl py-2 px-4 mr-2 focus:outline-none border-transparent`}
            onChange={handleInputChange}
          />
          <button
            className={`${isFocus ? `bg-red-600` : `bg-blue-800 text-white`} ${
              arial.className
            } text-gray-800 py-2 px-4 rounded-3xl disabled:text-gray-800/50`}
            disabled={isInputEmpty}
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chat;
