import { ArrowLeftIcon, BellIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Link } from "react-router-dom";

function Notifications() {
  const [notification, setNotification] = useState([
    {
       title:"Welcome to Geni AI", 
       description:"  Your account is ready.Start asking questions and explloring features",
    },
    {
   title:"Conversation memory activated",
   description:"We'll remember context within this session to give better answers",
    },

]);
  return (
    <div className="p-6">
      <div className="flex justify-between">
        <Link to="/">
          <div className="md:hidden">
            <ArrowLeftIcon className="w-5 h-5 text-black " />
          </div>
        </Link>

        <h2 className="font-medium text-md">All Notifications</h2>
        <div></div>
      </div>

      {notification.length === 0 ? (
        <>
          <div className="w-full h-screen flex flex-col justify-center items-center">
            <div className="rounded-full bg-gray-200 py-2 px-2">
              <BellIcon className="w-7 h-7 text-gray-700" />
            </div>

            <div className="flex flex-col justify-center items-center mt-4 gap-2">
              <h2 className="text-lg font-bold ">Oops! No Notification yet</h2>
              <p className="text-center text-sm">
                Your notification will appear here once you've received them
              </p>
            </div>
          </div>
        </>
      ) : (
        <div className="mt-10 flex flex-col gap-6">
          {notification.map((item) => (
            <div
              className="items-center flex gap-3 w-full rounded-lg py-3 bg-gree-400 pl-3 shadow-lg"
              key={crypto.randomUUID()}
            >
              <div className=" w-12 h-12 rounded-full bg-red-100 flex justify-center items-center">
                <BellIcon className="w-6 h-6 text-red-400" />
              </div>

              <div className="flex-1 flex flex-col gap-1">
                <h2 className="text-sm font-medium">{item.title}</h2>
                <span className="w-45 text-gray-800 text-[12px]">
                {item.description}
                </span>
              </div>

              <div><span className="text-[11px] mr-3 text-gray-700">11:00am</span></div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default Notifications;
