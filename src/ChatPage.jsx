import { useState } from "react";
import InputBox from "./InputBox";
import { motion } from "framer-motion";
import WaveTypingIndicator from "./Components/WaveTypingIndicator";
function ChatPage({
  messages,
  setMessages,
  input,
  setInput,
  changeIcon,
  handleCheck,
  handleClick,
  scrollbarRef,
  selectedImage,
  setselectedImage,
  selectedChatId,
  setChats,
  selectedChat,
}) {
  return (
    <>
    <div>
      <div
      ref={scrollbarRef}
      className="mt-5 flex flex-col justify-center space-y-4 p-4 mb-30">
        {selectedChat?.messages.map((item) => (
          <div
            key={item.id}
            className={`w-full flex ${
              item.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`p-4 rounded-xl ${
                item.sender === "user"
                  ? "text-black"
                  : "bg-white text-white"
              }`}
            >
              <h2 className="text-xs font-semibold opacity-60 mb-1"></h2>
              {item.typing ? (
                <WaveTypingIndicator />
              ) : (
                <>
                {item.image &&
                (<img src={item.image} className="w-50 h-50 rounded-xl"/>)}
                {item.message? <span className={`text-sm text-gray-900 ${item.sender==="user"? "bg-gray-100 py-2 px-5 rounded-xl text-gray-900":null}`}>{item.message}</span> :null}
              
                </>
              )}
            </div>
          </div>
        ))}
       
      </div>
      {/*the div containing the input on chat page*/}
      <div className="h-34 pb-2 fixed bottom-0 left-0 bg-white md:overflow-x-hidden pl-2 pr-2 left-0 md:left-105 fixed bottom-0 w-full bg-re-300">
        <InputBox
          handleCheck={handleCheck}
          handleClick={handleClick}
          changeIcon={changeIcon}
          input={input}
          selectedImage={selectedImage}
          setselectedImage={setselectedImage}
        />
      </div>
    </div>
    </>
  );
}
export default ChatPage;