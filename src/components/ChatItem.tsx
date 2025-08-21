export const ChatItem = ({ message }) => {
  return (
    <>
      {message.sender !== 'me' ? (
        <div className="relative h-fit w-fit p-3 bg-gray-100/80 rounded-2xl">
          <img
            className="size-[30px] border border-white object-cover rounded-full absolute left-1 top-1"
            src="https://plus.unsplash.com/premium_photo-1672239496290-5061cfee7ebb?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
          <div className="border-b border-white">
            <p className="text-left ml-6 text-sm">{message.sender}</p>
          </div>
          <p className="mt-2 text-lg">{message.text}</p>
        </div>
      ) : (
        <div className="relative w-fit ml-auto text-white h-fit p-3 bg-blue-500/80 rounded-2xl">
          <img
            className="size-[30px] border border-white object-cover rounded-full absolute right-1 top-1"
            src="https://plus.unsplash.com/premium_photo-1672239496290-5061cfee7ebb?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
          <div className="border-b border-white">
            <p className="text-right text-sm mr-8">{message.sender}</p>
          </div>
          <p className="mt-2 text-lg">{message.text}</p>
        </div>
      )}
    </>
  );
}