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
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

function Navbar({toggleSidebar}) {
  return (
    <div className="pl-2 pr-2 mt-2 justify-between flex items-center h-full  bg-re-100 bg-whit ">
      <div
        className="bg-white shadow-md p-2 rounded-full block md:hidden lg:hidden xl:hidden 2xl:hidden"
        onClick={toggleSidebar}
      >
        <Bars2Icon className="w-6 h-6" />
      </div>

      <div className="ml-2 flex justify-center items-center gap-1 hidden md:flex ">
        <h2 className="text-xl">SplinKI</h2>
        <ChevronDownIcon className="w-4 h-4 text-gray-400 " />
      </div>
        <Link to="/premium">
        <div className=" px-3 py-2 flex bg-gray-200 cursor-pointer rounded-full md:bg-violet-100 flex gap-2 items-center">
        <BoltIcon className="w-4 h-4 text-gray-500 md:text-violet-500" />
        <h2 className="hidden text-gray-700 md:flex text-violet-700 font-medium ">
          Upgrade to Go
        </h2>
        <h2 className="flex text-gray-500 md:hidden md:text-violet-700 font-medium">
          Get Plus
        </h2>
      </div>
        </Link>
      

      <div className="bg-white shadow-md px-4 py-2 rounded-full flex gap-6 items-center md:flex shadow-none bg-none">
        <UserIcon className="w-6 h-6 md:w-4 h-4" />
        <ChatBubbleLeftRightIcon className="w-6 h-6 md:w-4 h-4" />
      </div>
    </div>
  );
}
export default Navbar;
