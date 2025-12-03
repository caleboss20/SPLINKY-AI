import {
  Bars3Icon,
  Bars2Icon,
  PencilSquareIcon,
  PlusIcon,
  TrashIcon,
  ArrowUpIcon,
  MicrophoneIcon,
  MagnifyingGlassIcon,
  EllipsisHorizontalIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  ChatBubbleLeftRightIcon,
  UserIcon,
  SparklesIcon,
  MapPinIcon,
  BoltIcon,
  MoonIcon,
  SunIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
function Sidebar({ sidebarOpen, setSidebarOpen,changeIconTop,setIconchange,iconchange }) { 
  const [sidebarhistory, setSidebarhistory] = useState([
    { title: "Git force push advice" },
    { title: "Chinese speaking lesson" },
    { title: "Explain linkedin job" },
    { title: "salary for react developer" },
    { title: "Advice on Golang" },
    { title: "Learning to code young" },
    { title: "Fixing code errors" },
    { title: "Vercel import error fix" },
  ]);
  return (
    <>
      <div
        className={` relative flex flex-col pt-4 pl-3 gap-8 overflow-y-auto md:h-220`}>
        <div className={`flex justify-between bg-red-00 items-center pr-3`}>
          <div className="flex">
            <div className="items-center border-none outline-none px-7 flex w-full mr-4 rounded-full bg-gray-200 md:hidden">
              {iconchange ? (
                <ArrowLeftIcon className="w-6 h-6 text-gray-700" />
              ) : (
                <div onClick={()=>setIconchange(!iconchange)}><MagnifyingGlassIcon className="w-6 h-6 text-gray-700" /></div>
              )}

              <input
                onFocus={changeIconTop}
                type="text"
                placeholder="Search"
                className="border-none outline-none px-7 py-3 flex-1 w-full rounded-full bg-gray-200 text-gray-900 text-lg"
              />
              
            </div>
            <BoltIcon className="w-6 h-6 text-black hidden md:flex" />
          </div>
          <div className="mr-2 cursor-pointer">
            <MoonIcon className="w-5 h-5 text-black" />
          </div>
        </div>

        <div className="w-full h-30 bg-re-500 pl-1 flex flex-col gap-5">
          <div className="flex gap-2 items-center">
            <PencilSquareIcon className="w-5 h-5 text-black" />
            <span className="text-sm text-black">New chat</span>
          </div>

          <div className="flex gap-2 items-center">
            <MagnifyingGlassIcon className="w-5 h-5 text-black" />
            <span className="text-sm text-black">Search chats</span>
          </div>

          <div className="flex gap-2 items-center">
            <MapPinIcon className="w-5 h-5 text-black" />
            <span className="text-sm text-black">Pin chat</span>
          </div>
        </div>

        <div className="w-full h-50 bg--500 pl-1 flex flex-col gap-5">
          {/**for each item on the sidebar search history */}
          {sidebarhistory.map((item, index) => {
            return (
              <div key={index}>
                <span className="text-black">{item.title}</span>
              </div>
            );
          })}

          {/**end each item */}
        </div>

        <div className="w-64 justify-between left-0 right-0 bottom-0 h-14 fixed bg-viole-500 pl-1 flex items-center pl-3 gap-3">
          <div className="flex gap-2 items-center">
            <div className="cursor-pointer w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
              <span className="text-[12px]">CA</span>
            </div>
            <div className="flex flex-col text-black">
              <h2 className="text-sm">Caleb Antwi</h2>
              <span className="text-sm">Free</span>
            </div>
          </div>

          <div className="mr-5 ">
            <button className="text-black bg-white text-sm border-1 py-1 rounded-full px-3 border-gray-300 font-medium cursor-pointer">
              Upgrade
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default Sidebar;
