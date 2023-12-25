import React from 'react';

type Props = {};

const Chat = (props: Props) => {
  return (
    <div className="w-96 h-96 border rounded-md overflow-y-auto flex flex-col p-4">
      {/* Messages from other people (left side) */}
      <div className="flex flex-col items-start mb-4">
        {/* Example message */}
        <div className="bg-gray-200 py-2 px-4 rounded-lg max-w-[70%]">
          <p>Message from other people</p>
        </div>
        {/* Add more messages here */}
      </div>

      {/* Messages from your side (right side) */}
      <div className="flex flex-col items-end mb-4">
        {/* Example message */}
        <div className="bg-blue-500 py-2 px-4 rounded-lg max-w-[70%] text-white">
          <p>Your message</p>
        </div>
        {/* Add more messages here */}
      </div>

      {/* Input box */}
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Type your message..."
          className="w-full border rounded-md py-2 px-4 mr-2 focus:outline-none"
        />
        <button className="bg-blue-500 text-white py-2 px-4 rounded-md">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
