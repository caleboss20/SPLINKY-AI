import { PlusIcon, MicrophoneIcon,ArrowUpIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
function InputBox({handleCheck,handleClick,changeIcon,messages,input}) {
  return (
    <div className="flex border gap-2 h-15 border-gray-300 pl-4 py-0 pr-2 rounded-full shadow-md md:w-140 border border-gray-300 pl-4 py-0 pr-2 rounded-full shadow-md md:flex items-center">
          <div>
            <PlusIcon className="w-5 h-5" />
          </div>
          <input
            value={input}
            onChange={handleCheck}
            className="flex-1 text-lg outline-none border-none rounded-lg px-4 py-4 text-black text-sm font-normal"
            placeholder="Ask SplinKI"
            type="text"/>
            
          <div className="flex gap-4 items-center">
            <MicrophoneIcon className="w-5 h-5" />
            <div onClick={handleClick} className=" h-8 w-8 bg-black rounded-full items-center justify-center flex gap-0.5 cursor-pointer ">
              {changeIcon?
              <ArrowUpIcon className="w-4 h-4 text-white"/>
              :
              <div className="h-8 w-8 bg-black rounded-full items-center justify-center flex gap-0.5 cursor-pointer">  
              <span className="w-0.5 h-2 bg-white rounded-sm "></span>
              <span className="w-0.5 h-4 bg-white rounded-sm "></span>
              <span className="w-0.5 h-2 bg-white rounded-sm "></span>
              <span className="w-0.5 h-2 bg-white rounded-sm "></span>
              </div>
              }
              
              
            </div>
          </div>
    </div>
  );
}
export default InputBox;
