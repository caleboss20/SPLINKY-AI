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
function Sidebar({ changeIconTop, setIconchange, iconchange, setDarkmode, darkMode }) {
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
  const [searchItem, setsearchItem] = useState("");
  const handleSearch = (e) => setsearchItem(e.target.value);
  const filteredHistory = sidebarhistory.filter((msg) =>
    msg.title.toLowerCase().includes(searchItem.trim().toLowerCase())
  );
  // Dark mode toggle
  const toggleDark = () => {
    setDarkmode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };
  return (
    <div className="relative flex flex-col pt-4 pl-3 gap-8 overflow-y-auto md:h-220">
      <div className="flex justify-between items-center pr-3">
        <div className="flex">
          <div className="items-center border-none outline-none px-7 flex w-full mr-4 rounded-full bg-gray-200 md:hidden">
            {iconchange ? <ArrowLeftIcon className="w-6 h-6 text-gray-700" /> : <div onClick={() => setIconchange(!iconchange)}><MagnifyingGlassIcon className="w-6 h-6 text-gray-700" /></div>}
            <input
              onFocus={changeIconTop}
              type="text"
              onChange={handleSearch}
              value={searchItem}
              placeholder="Search"
              className="border-none outline-none px-7 py-3 flex-1 w-full rounded-full bg-gray-200 text-gray-900 text-lg dark:bg-gray-700 dark:text-white"
            />
          </div>
          <BoltIcon className="w-6 h-6 text-black dark:text-white hidden md:flex" />
        </div>
        <div onClick={toggleDark} className="mr-2 cursor-pointer">
          {darkMode ? <SunIcon className="w-5 h-5 text-yellow-400" /> : <MoonIcon className="w-5 h-5 text-gray-800" />}
        </div>
      </div>
      <div className="w-full h-30 pl-1 flex flex-col gap-5">
        <div className="flex gap-2 items-center">
          <PencilSquareIcon className="w-5 h-5 text-black dark:text-white" />
          <span className="text-sm text-black dark:text-white">New chat</span>
        </div>
        <div className="flex gap-2 items-center">
          <MagnifyingGlassIcon className="w-5 h-5 text-black dark:text-white" />
          <span className="text-sm text-black dark:text-white">Search chats</span>
        </div>
        <div className="flex gap-2 items-center">
          <MapPinIcon className="w-5 h-5 text-black dark:text-white" />
          <span className="text-sm text-black dark:text-white">Pin chat</span>
        </div>
      </div>
      <div className="w-full pl-1 flex flex-col gap-5">
        {filteredHistory.map((item, index) => (
          <div key={index}>
            <span className="text-black dark:text-white">{item.title}</span>
          </div>
        ))}
      </div>
      <div className="bg-white dark:bg-gray-800 w-78 justify-between left-0 right-0 bottom-0 h-14 fixed pl-3 flex items-center gap-3 md:w-64">
        <div className="flex gap-2 items-center">
          <div className="cursor-pointer w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
            <span className="text-[12px]">CA</span>
          </div>
          <div className="flex flex-col text-black dark:text-white">
            <h2 className="text-sm">Caleb Antwi</h2>
            <span className="text-sm">Free</span>
          </div>
        </div>
        <Link to="/premium">
          <button className="text-black dark:text-white bg-white dark:bg-gray-700 text-sm border py-1 rounded-full px-3 border-gray-300 dark:border-gray-600 font-medium cursor-pointer">
            Upgrade
          </button>
        </Link>
      </div>
    </div>
  );
}
export default Sidebar;