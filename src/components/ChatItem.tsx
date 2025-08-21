/* eslint-disable @typescript-eslint/no-explicit-any */
export const ChatItem = ({ message }: { message: any }) => {
  return (
    <>
      {message.sender !== 'me' ? (
        <div className="relative p-3 h-fit w-fit bg-gray-100/80 rounded-2xl">
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
        <div className="relative p-3 ml-auto text-white w-fit h-fit bg-blue-500/80 rounded-2xl">
          <img
            className="size-[30px] border border-white object-cover rounded-full absolute right-1 top-1"
            src="https://plus.unsplash.com/premium_photo-1672239496290-5061cfee7ebb?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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