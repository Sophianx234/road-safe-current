"use client";

import { useEffect, useState } from "react";
import { PiSpiralFill } from "react-icons/pi";

export default function AiChatInfoCard({
  message,
  isLoading,
  response,
}: {
  message: string;
  isLoading: boolean;
  response: string[];
}) {
  const [displayedText, setDisplayedText] = useState("");
  const [typing, setTyping] = useState(false);

useEffect(() => {
  if (!isLoading && response.length > 0) {
    const latest = response[response.length - 1] || "";
    if (!latest) return;

    setDisplayedText("");
    setTyping(true);

    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText(latest.slice(0, index + 1));
      index++;
      if (index >= latest.length) {
        clearInterval(interval);
        setTyping(false);
      }
    }, 10);

    return () => clearInterval(interval);
  }
}, [isLoading, response]);


  return (
    <div className="flex items-center pt-40 justify-center mb-16 bg-white px-4 py-12">
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

        {/* AI Response */}
        {response.length > 0 && (
          <div className="bg-gray-100 p-4 rounded-lg text-gray-800 whitespace-pre-wrap">
            {displayedText}
            {typing && (
              <span className="inline-flex">
                <span className="w-1.5 h-1.5 bg-gray-500 rounded-full mx-0.5 animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-gray-500 rounded-full mx-0.5 animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 bg-gray-500 rounded-full mx-0.5 animate-bounce [animation-delay:0.4s]"></span>
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
