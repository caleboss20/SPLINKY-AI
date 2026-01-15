import {
  Bars3Icon,
  Bars2Icon,
  PencilSquareIcon,
  PlusIcon,
  TrashIcon,
  MicrophoneIcon,
  EllipsisHorizontalIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  ChatBubbleLeftRightIcon,
  UserIcon,
  SparklesIcon,
  BoltIcon,
  Cog6ToothIcon
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

function Navbar({toggleSidebar}) {
  return (
    <div className="pl-2 pr-2 pb-3 mt-2 justify-between flex items-center h-full ">
      <div
        className="bg-white shadow-xl p-2 rounded-full block md:hidden lg:hidden xl:hidden 2xl:hidden"
        onClick={toggleSidebar}
      >
        <Bars2Icon className="w-6 h-6 text-gray-600" />
      </div>

      <div className="ml-2 flex justify-center items-center gap-1 hidden md:flex ">
        <h2 className="text-xl md:text-gray-300">Geni</h2>
        <ChevronDownIcon className="w-4 h-4 text-gray-400 " />
      </div>
        <Link to="/premium">
        <div className=" px-3 py-2 flex bg-white cursor-pointer rounded-full md:bg-violet-100 flex gap-1 items-center">
        <BoltIcon className="w-4 h-4 text-gray-400 md:text-violet-500" />
        <h2 className="hidden text-gray-700 md:flex text-violet-700 font-medium ">
          Upgrade to Go
        </h2>
        <h2 className="text-sm bg-gradient-to-r from-blue-400 via-pink-400 to-blue-500
          bg-[length:400%_300%]
          bg-clip-text text-transparent
          animate-[gradientMove_3s_ease_infinite]
          drop-shadow-[0_0_20px_rgba(255,0,255,0.6)] ml-2 flex text-gray-400 md:hidden md:text-violet-700 font-medium">
          Get <span className="ml-1">Pro</span>
        </h2>
          <style>{`
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
      </div>
        </Link>
      

      <div className="bg-white shadow-md px-4 py-2 rounded-full flex gap-4 items-center md:flex shadow-none bg-none">
        <UserIcon className="w-5 h-5 text-gray-700 md:w-4 h-4" />
        <Link to="/settings">
        <Cog6ToothIcon className="w-5 h-5 text-gray-700 md:w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
export default Navbar;
