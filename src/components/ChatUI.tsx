/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChatItem } from "./ChatItem";
import { Html } from "@react-three/drei";
import { ControlledInput } from "../ControlledInput";
import { useState, useRef, useEffect } from "react";
const messagesData = [
  {
    id: 1,
    text: "Hello, how are you?",
    sender: "user",
  },
  {
    id: 2,
    text: "Im ok",
    sender: "me",
  },
  {
    id: 3,
    text: "What about you?",
    sender: "user",
  },
  {
    id: 4,
    text: "I'm doing well, thank you!",
    sender: "me",
  },
];
export const ChatUI = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] =
    useState<{ id: number; text: string; sender: string }[]>(messagesData);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      }
    }, 200);
  }, [messages]);

  function handleSend() {
    setMessages([
      ...messages,
      { id: messages.length + 1, text: message, sender: "me" },
    ]);
    setMessage("");
  }
  return (
    <Html transform>
      <div className="max-w-[300px] px-3">
        <div ref={chatContainerRef} className="max-h-[500px] overflow-y-auto flex-col flex gap-2">
          {messages.map((msg, index) => (
            <ChatItem key={msg.id} message={msg} index={index} />
          ))}
        </div>
        <div
          className="flex items-center gap-2 mt-4"
          style={{ pointerEvents: "auto" }}
        >
          <div className="flex-1 px-3 py-1 text-white border border-gray-100 h-fit rounded-2xl">
            <ControlledInput
              className="w-full"
              value={message}
              onChange={(e: any) => setMessage(e.target.value)}
            />
          </div>
          <button
            className="px-2 py-1 bg-white rounded-full cursor-pointer"
            onClick={handleSend}
          >
            Send
          </button>
        </div>
      </div>
    </Html>
  );
};
