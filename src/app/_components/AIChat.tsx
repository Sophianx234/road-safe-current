'use client';

import { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { PiSpiralFill } from 'react-icons/pi';

export default function AiChatInfoCard() {
  const [chatStarted, setChatStarted] = useState(false);
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim() === '') return;
    console.log('Sending message:', message);
    // TODO: integrate AI chat logic here
    setMessage('');
  };

  return (
    <div className="min-h-screen flex items-center pt-40 justify-center bg-white px-4 py-12">
      <div className="max-w-md w-full space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="flex flex-col justify-center items-center">
            <PiSpiralFill className="size-10 text-gray-800" />
            <h1 className="text-xl font-semibold text-gray-900">Capabilities</h1>
          </div>
        </div>

        {/* Capability Cards */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-100 text-gray-800 rounded-xl px-4 py-3 shadow-sm">
            <p>Answers questions on Ghana’s traffic accident history</p>
          </div>
          <div className="bg-gray-100 text-gray-800 rounded-xl px-4 py-3 shadow-sm">
            <p>Predicts accident trends using AI and historical data</p>
          </div>
          <div className="bg-gray-100 text-gray-800 rounded-xl px-4 py-3 shadow-sm">
            <p>Provides real-time statistics and visual insights</p>
          </div>
          <div className="bg-gray-100 text-gray-800 rounded-xl px-4 py-3 shadow-sm">
            <p>Supports follow-up questions and contextual answers</p>
          </div>
        </div>

        {/* Chat Input Area */}
        {chatStarted ? (
          <div className="pt-6 space-y-2">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-600"
                placeholder="Ask the AI something..."
              />
              <button
                onClick={handleSend}
                className="bg-gray-800 text-white px-4 py-2 rounded-full hover:bg-gray-700 transition"
              >
                Send
              </button>
            </div>
            {/* You can show AI response here later */}
          </div>
        ) : (
          <div className="flex justify-center pt-8">
            <button
              onClick={() => setChatStarted(true)}
              className="bg-gray-800 text-white px-4 py-2 rounded-full hover:bg-gray-700 transition flex items-center gap-2"
            >
              <MessageSquare className="size-4" />
              Start Chatting
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
