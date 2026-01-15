import {
  PencilSquareIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
  BoltIcon,
  MoonIcon,
  SunIcon,
  ArrowLeftIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { Link } from "react-router-dom";
function Sidebar({
  chats = [],
  setSelectedChatId,
  selectedChatId,
  setShowChatPage,
  changeIconTop,
  setIconchange,
  iconchange,
  darkMode,
  handleNewChat,
  deletechats,

 
}) {
  const [searchItem, setSearchItem] = useState("");
  const handleSearch = (e) => setSearchItem(e.target.value);
  const filteredChats = chats.filter((chat) =>
    chat.title.toLowerCase().includes(searchItem.trim().toLowerCase())
  );
 
 
  return (
    <div className=" relative flex flex-col pt-4 pl-0 gap-8 overflow-y-auto md:h-220">
      <div className="flex justify-between items-center pr-3">
        <div className="flex ml-3">
          <div className="items-center border-none outline-none px-7 flex w-full mr-4 rounded-full bg-gray-100 md:hidden">
            {iconchange ? (
              <ArrowLeftIcon className="w-6 h-6 text-black" />
            ) : (
              <div onClick={() => setIconchange(!iconchange)}>
                <MagnifyingGlassIcon className="w-5 h-5 text-gray-500" />
              </div>
            )}
            <input
              onFocus={changeIconTop}
              type="text"
              onChange={handleSearch}
              value={searchItem}
              placeholder="Search"
              className="border-none outline-none px-7 py-3 flex-1 w-full rounded-full  text-gray-800 text-sm"
            />
          </div>
          <BoltIcon className="w-6 text-gray-900 h-6 hidden md:flex " />
        </div>
        <div className="mr-2 cursor-pointer md:mr-0 ">
          {darkMode ? (
            <MoonIcon className="w-5 h-5 md:text-gray-300" />
          ) : (
            <SunIcon className="w-5 h-5 text-gray-600 md:text-gray-300" />
          )}
        </div>
      </div>

         <div className="w-full h-30 pl-5 flex flex-col gap-5 mb-3">
        <div 
        onClick={handleNewChat}
        className="flex gap-2 items-center">
          <PencilSquareIcon className="w-5 h-5 text-gray-700" />
          <span className="text-sm text-gray-700">New chat</span>
        </div>
        <div className="flex gap-2 items-center">
          <MagnifyingGlassIcon className="w-5 h-5 text-gray-700" />
          <span className="text-sm text-gray-700">
            Search chats
          </span>
        </div>
       
         <div
         onClick={deletechats}
          className="flex gap-2 items-center ">
          <TrashIcon className="w-5 h-5 text-gray-700" />
          <span className="text-sm text-gray-700">Delete All chat</span>
        </div>
      </div>
      <div className="w-full pl-5 flex flex-col gap-5">
        {filteredChats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => {
              setSelectedChatId(chat.id);
              setShowChatPage(true);
            }}
          >
           <div className={`${selectedChatId===chat.id? "bg-gray-100 py-2 px-4":""}`}>
            <span className="text-gray-700 text-sm">{chat.title}</span>

           </div>
            
          </div>
        ))}
      </div>
      <div className=" h-20 bg-re-500 fixed bottom-0 left-0 w-78 md:w-64"></div>
    </div>
  );
}
export default Sidebar;