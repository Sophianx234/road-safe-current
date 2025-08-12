"use client";

import { useEffect, useState } from "react";
import { PiSpiralFill } from "react-icons/pi";
import Image from "next/image";
import { Message } from "../main/ai/page"; // assuming Message = { role: "user" | "ai", content: string }

export default function AiChatInfoCard({
  message,
  isLoading,
  response,
}: {
  message: string;
  isLoading: boolean;
  response: Message[];
}) {
  const [displayedText, setDisplayedText] = useState("");
  const [typing, setTyping] = useState(false);

  // Get the latest AI message content for typing effect
  const latestAI = response.filter((msg) => msg.role === "ai").slice(-1)[0];

  useEffect(() => {
    if (!isLoading && latestAI) {
      const text = latestAI.content;
      if (!text) return;

      setTyping(true);
      setDisplayedText("");

      let index = 0;
      const interval = setInterval(() => {
        setDisplayedText(text.slice(0, index + 1));
        index++;
        if (index >= text.length) {
          clearInterval(interval);
          setTyping(false);
        }
      }, 10);

      return () => clearInterval(interval);
    }
  }, [isLoading, latestAI]);

  return (
    <div className="flex flex-col items-center pt-40 mb-16 bg-white px-4 py-12">
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

        {/* Chat bubbles */}
        <div className="space-y-4">
          {/* Render all messages */}
          {response.map((msg, idx) =>
            msg.role === "user" ? (
              <div key={idx} className="flex justify-end items-start gap-2">
                <div className="bg-blue-500 text-white px-4 py-2 rounded-2xl max-w-[80%] whitespace-pre-wrap">
                  {msg.content}
                </div>
                <Image
                  src="/profile.png" // your profile image path
                  alt="You"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              </div>
            ) : (
              <div key={idx} className="flex items-start gap-2">
                <PiSpiralFill className="size-8 text-gray-800" />
                <div className="bg-gray-100 px-4 py-2 rounded-2xl max-w-[80%] text-gray-800 whitespace-pre-wrap">
                  {idx === response.length - 1 && typing
                    ? displayedText
                    : msg.content}
                  {idx === response.length - 1 && typing && (
                    <span className="inline-flex">
                      <span className="w-1.5 h-1.5 bg-gray-500 rounded-full mx-0.5 animate-bounce"></span>
                      <span className="w-1.5 h-1.5 bg-gray-500 rounded-full mx-0.5 animate-bounce [animation-delay:0.2s]"></span>
                      <span className="w-1.5 h-1.5 bg-gray-500 rounded-full mx-0.5 animate-bounce [animation-delay:0.4s]"></span>
                    </span>
                  )}
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
