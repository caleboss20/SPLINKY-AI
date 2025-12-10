import { useState } from "react";
import InputBox from "./InputBox";
import { motion } from "framer-motion";
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
    <div
   
     className="">
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
                  : "bg-gray-700 text-white"
              }`}
            >
              <h2 className="text-xs font-semibold opacity-60 mb-1"></h2>
              {item.typing ? (
                 <div className=" px-4 py-2 rounded-lg w-20 flex items-center justify-center space-x-1">
              {[0, 1, 2,3].map((i) => (
                <motion.span
                  key={i}
                  className="bg-gray-300 rounded-full w-2 h-2"
                  animate={{ y: [0, -3, 0,] }} // bounce up and down
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    repeatType: "loop",
                    delay: i * 0.2, // stagger each dot
                  }}
                />
              ))}
              </div>
              ) : (
                <>
                {item.image &&
                (<img src={item.image} className="w-70 h-90 rounded-xl"/>)}
                {item.message? <span className={`text-sm text-gray-300 ${item.sender==="user"? "bg-gray-600 py-1 px-5 rounded-xl text-gray-300":null}`}>{item.message}</span> :null}
               
                </>
              )}
            </div>
          </div>
        ))}

        
      </div>
      <div className="pb-2 fixed bottom-0 left-0 bg-gray-900 md:overflow-x-hidden pl-2 pr-2 left-0 md:left-105 fixed bottom-0 w-full bg-re-300">
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
