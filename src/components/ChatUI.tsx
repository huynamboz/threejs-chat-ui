import { ChatItem } from "./ChatItem"

export const ChatUI = ({ messages }) => {
  return (
    <div className="max-h-[500px] overflow-y-auto flex-col flex gap-2">
      {messages.map((msg) => (
          <ChatItem key={msg.id} message={msg} />
      ))}
    </div>
  )
}