"use client";
import AiChatInfoCard from "@/app/_components/AIChat";
import { MessageSquare } from "lucide-react";
import { useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import { BeatLoader } from "react-spinners";

export type Message = {
  role: "user" | "ai";
  content: string;
};
function AiPage() {
  const [chatStarted, setChatStarted] = useState(false);
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState<Message[]>([
    {
      role: "ai",
      content:
        "Welcome to the AI Chat! Ask me anything about traffic accidents in Ghana.",
    },
  ]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (message.trim() === "") return;
    setLoading(true);
    const userMessage = message;
  setMessage("");

    // Add user's message
    setResponse((prev) => [...prev, { role: "user", content: userMessage }]);
    
    try {
      const res = await fetch("/api/query-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: userMessage }),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        const answerText = data.answer || "No answer received";
        
        // Add AI's answer
        setResponse((prev) => [...prev, { role: "ai", content: answerText }]);
      } else {
        setResponse((prev) => [
          ...prev,
          { role: "ai", content: data.error || "Something went wrong" },
        ]);
      }
    } catch (err) {
      console.error(err);
      setResponse((prev) => [
        ...prev,
        { role: "ai", content: "Error fetching from API" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col -mt-32 relative overflow-hidden w-full z-0  justify-between  bg-white">
      {/* Chat display */}

      <AiChatInfoCard
        message={message}
        response={response}
        isLoading={loading}
      />

      {/* Fixed input bar */}

      <div className="fixed bottom-0 bg-white inset-x-0 w-full  items-center flex justify-center pt-0 p-4">
        {chatStarted ? (
          <div>
            <div className="flex items-center  w-lg mx-auto translate-x-10 relative justify-center    ">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="flex-1 px-6  h-full w-full py-4 rounded-full border bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-600"
                placeholder="Ask the AI something..."
              />
              <button
                onClick={handleSend}
                disabled={loading}
                className="bg-gray-800 absolute right-2 flex justify-center items-center text-white p-3 rounded-full hover:bg-gray-700 transition"
              >
                {loading ? <BeatLoader size={8} color="#fff" /> : <FaArrowUp />}
              </button>
            </div>
            <p className="text-center text-xs pt-2 ml-8">
              RoadSafe can make mistakes. Check important info.
            </p>
          </div>
        ) : (
          <div className="flex justify-center translate-x-8 w-full">
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

export default AiPage;
