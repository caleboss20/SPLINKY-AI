import {
  PencilSquareIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
  BoltIcon,
  MoonIcon,
  SunIcon,
  ArrowLeftIcon,
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
  showChatPage,
  darkMode,
 
}) {
  const [searchItem, setSearchItem] = useState("");
  const handleSearch = (e) => setSearchItem(e.target.value);
  const filteredChats = chats.filter((chat) =>
    chat.title.toLowerCase().includes(searchItem.trim().toLowerCase())
  );
 
  return (
    <div className=" relative flex flex-col pt-4 pl-3 gap-8 overflow-y-auto md:h-220">
      <div className="flex justify-between items-center pr-3">
        <div className="flex ">
          <div className="items-center border-none outline-none px-7 flex w-full mr-4 rounded-full bg-gray-700 md:hidden">
            {iconchange ? (
              <ArrowLeftIcon className="w-6 h-6 text-gray-300" />
            ) : (
              <div onClick={() => setIconchange(!iconchange)}>
                <MagnifyingGlassIcon className="w-6 h-6 text-gray-300" />
              </div>
            )}
            <input
              onFocus={changeIconTop}
              type="text"
              onChange={handleSearch}
              value={searchItem}
              placeholder="Search"
              className="border-none outline-none px-7 py-3 flex-1 w-full rounded-full bg-gray-00 text-gray-300 text-lg dark:bg-gray-700 dark:text-white"
            />
          </div>
          <BoltIcon className="w-6 h-6 text-black dark:text-white hidden md:flex" />
        </div>
        <div className="mr-2 cursor-pointer">
          {darkMode ? (
            <SunIcon className="w-5 h-5 text-yellow-400" />
          ) : (
            <MoonIcon className="w-5 h-5 text-gray-800" />
          )}
        </div>
      </div>

         <div className="w-full h-30 pl-1 flex flex-col gap-5">
        <div className="flex gap-2 items-center">
          <PencilSquareIcon className="w-5 h-5 text-gray-300" />
          <span className="text-sm text-gray-300">New chat</span>
        </div>
        <div className="flex gap-2 items-center">
          <MagnifyingGlassIcon className="w-5 h-5 text-gray-300" />
          <span className="text-sm text-gray-300">
            Search chats
          </span>
        </div>
        <div className="flex gap-2 items-center">
          <MapPinIcon className="w-5 h-5 text-gray-300" />
          <span className="text-sm text-gray-300">Pin chat</span>
        </div>
      </div>
      <div className="w-full pl-1 flex flex-col gap-5">
        {filteredChats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => {
              setSelectedChatId(chat.id);
              setShowChatPage(true);
            }}
          >
         
            <span className="text-gray-300 ">{chat.title}</span>
          </div>
        ))}
      </div>
      <div className=" h-20 bg-re-500 fixed bottom-0 left-0 w-78 md:w-64"></div>
    </div>
  );
}
export default Sidebar;