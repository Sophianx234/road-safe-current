"use client";

import { PiSpiralFill } from "react-icons/pi";

export default function AiChatInfoCard({message,response,isLoading}: { message: string, isLoading:boolean,response:string[] }) {
  

  return (
    <div className=" flex items-center pt-40 justify-center mb-16   bg-white px-4 py-12">
      <div className="max-w-md  w-full space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="flex flex-col justify-center items-center">
            <PiSpiralFill className="size-10 text-gray-800" />
            <h1 className="text-xl font-semibold text-gray-900">
              Capabilities
            </h1>
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
        {response.map((res, i) => (
          <div
            key={i}
            className={`bg-gray-100 ${
              typeof res === "string" && res.toLowerCase().includes("error")
                ? "bg-gray-600 font-medium text-white"
                : ""
            } p-4 rounded-lg text-gray-800 whitespace-pre-wrap`}
          >
            {res}
          </div>
        ))}

        {/* Chat Input Area */}
      </div>
    </div>
  );
}
