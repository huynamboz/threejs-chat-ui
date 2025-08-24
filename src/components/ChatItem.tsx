/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

export const ChatItem = ({ message, index = 0 }: { message: any; index?: number }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation with stagger effect based on index
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, (index + 100)); // 150ms delay between each message
    
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <>
      {message.sender !== 'me' ? (
        <div 
          className={`relative p-3 h-fit w-fit bg-gray-100/80 rounded-2xl transition-all duration-500 ease-out transform ${
            isVisible 
              ? 'translate-y-0 opacity-100' 
              : 'translate-y-4 opacity-0'
          }`}
        >
          <img
            className="size-[30px] border border-white object-cover rounded-full absolute left-1 top-1"
            src="https://plus.unsplash.com/premium_photo-1672239496290-5061cfee7ebb?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
          <div className="border-b border-white">
            <p className="ml-6 text-sm text-left">{message.sender}</p>
          </div>
          <p className="mt-2 text-lg">{message.text}</p>
        </div>
      ) : (
        <div 
          className={`relative p-3 ml-auto text-white w-fit h-fit bg-blue-500/80 rounded-2xl transition-all duration-500 ease-out transform ${
            isVisible 
              ? 'translate-y-0 opacity-100' 
              : 'translate-y-4 opacity-0'
          }`}
        >
          <img
            className="size-[30px] border border-white object-cover rounded-full absolute right-1 top-1"
            src="https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
          <div className="border-b border-white">
            <p className="mr-8 text-sm text-right">{message.sender}</p>
          </div>
          <p className="mt-2 text-lg">{message.text}</p>
        </div>
      )}
    </>
  );
}