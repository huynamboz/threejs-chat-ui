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
  const [isReplying, setIsReplying] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop =
          chatContainerRef.current.scrollHeight;
      }
    }, 200);
  }, [messages]);

  async function handleSend() {
    if (!message.trim()) return; // Don't send empty messages
    
    setMessages([
      ...messages,
      { id: messages.length + 1, text: message, sender: "me" },
    ]);
    setMessage("");
    setIsReplying(true);
    try {
      const response = await fetch(import.meta.env.VITE_API_URL + "/completion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "openai/gpt-oss-20b",
          messages: [
            ...messages.map((msg) => ({
              role: msg.sender === "me" ? "user" : "assistant",
              content: msg.text,
            })),
            {
              role: "user",
              content: message,
            },
          ],
        }),
      });
      const data = await response.json();
      const output = data.completion;
      setMessages([
        ...messages,
        { id: messages.length + 1, text: message, sender: "me" },
        { id: messages.length + 2, text: output, sender: "user" },
      ]);
      setIsReplying(false);
    } catch (error) {
      console.error(error);
      setIsReplying(false);
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  return (
    <Html transform>
      <div className="max-w-[300px] px-3">
        <div
          ref={chatContainerRef}
          className="max-h-[500px] overflow-y-auto flex-col flex gap-2"
        >
          {messages.map((msg, index) => (
            <ChatItem key={msg.id} message={msg} index={index} />
          ))}
          {isReplying && (
            <ChatItem
              message={{
                id: messages.length + 1,
                text: "Replying...",
                sender: "user",
              }}
              index={messages.length}
            />
          )}
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
              onKeyDown={handleKeyDown}
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
