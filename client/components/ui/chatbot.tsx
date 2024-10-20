"use client"
import { useState } from 'react';
import axios from 'axios';

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');

  const handleSend = async (): Promise<void> => {
    if (!input.trim()) return;

    const userMessage: Message = { text: input, sender: 'user' };
    setMessages([...messages, userMessage]);

    // Api call
    try {
      const response = await axios.post('http://localhost:8000/bot-response/user/query/', { query: input });
      const botReply: Message = { text: response.data.reply, sender: 'bot' };
      setMessages((prevMessages) => [...prevMessages, botReply]);
    } catch (error) {
      console.error('Error fetching data from the backend:', error);
    }

    setInput('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full cursor-pointer shadow-lg"
      >
        💬
      </div>
      {isOpen && (
        <div className="z-50 text-xs fixed bottom-16 right-6 w-96 h-[40rem] bg-white rounded-lg shadow-lg p-4 border border-gray-300 flex flex-col text-black">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-bold">Kumbura-Bot</h3>
            <button onClick={() => setIsOpen(false)} className="text-gray-500">
              ✕
            </button>
          </div>

          <div className="flex-grow overflow-y-auto mb-4 p-2 border border-gray-200 rounded">
            {messages.length === 0 ? (
              <p>Hello !</p>
            ) : (
              messages.map((message, index) => (
                <div
                  key={index}
                  className={`mb-2 p-2 rounded-lg block ${
                    message.sender === 'user'
                      ? 'self-start text-right'
                      : 'self-end text-left'
                  }`}
                >
                    <div className={`w-auto inline-block p-2 rounded-lg ${
                        message.sender === 'user'
                        ? 'bg-blue-100'
                        : 'bg-gray-100'
                    }`}>

                    {message.text}
                    
                    </div>
                </div>
              ))
            )}
          </div>
          <div className="flex">
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="flex-grow border border-gray-300 rounded p-2 mr-2"
              placeholder="Type a message..."
            />
            <button
            onClick={handleSend}
            className="bg-blue-500 text-white p-2 rounded-lg flex items-center justify-center"
            >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
            >
                <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 12h14M12 5l7 7-7 7"
                />
            </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
