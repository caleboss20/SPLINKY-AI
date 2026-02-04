import { ArrowLeftIcon, BellIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Link } from "react-router-dom";
// Helper to create a notification (BEST PRACTICE)
const createNotification = (title, description) => ({
  id: crypto.randomUUID(),
  title,
  description,
  time: new Date()
    .toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
    .toLowerCase(),
});
function Notifications() {
  const [notifications, setNotifications] = useState([
    // createNotification(
    //   "Welcome to Geni AI",
    //   "Your account is ready. Start asking questions and exploring features"
    // ),
    // createNotification(
    //   "Conversation memory activated",
    //   "We'll remember context within this session to give better answers"
    // ),
  ]);
  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <Link to="/" className="md:hidden">
          <ArrowLeftIcon className="w-5 h-5 text-black" />
        </Link>
        <h2 className="font-medium text-md">All Notifications</h2>
        <div />
      </div>
      {/* Empty State */}
      {notifications.length === 0 ? (
        <div className="w-full h-screen flex flex-col justify-center items-center">
          <div className="rounded-full bg-gray-200 p-2">
            <BellIcon className="w-7 h-7 text-gray-700" />
          </div>
          <div className="flex flex-col justify-center items-center mt-4 gap-2">
            <h2 className="text-lg font-bold">Oops! No Notification yet</h2>
            <p className="text-center text-sm text-gray-600">
              Your notifications will appear here once you've received them
            </p>
          </div>
        </div>
      ) : (
        /* Notification List */
        <div className="mt-10 flex flex-col gap-6">
          {notifications.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3 w-full rounded-lg py-3 pl-3 shadow-lg"
            >
              <div className="w-12 h-12 rounded-full bg-red-100 flex justify-center items-center">
                <BellIcon className="w-6 h-6 text-red-400" />
              </div>
              <div className="flex-1 flex flex-col gap-1">
                <h2 className="text-[13px] font-medium">{item.title}</h2>
                <span className="text-gray-800 text-[11px]">
                  {item.description}
                </span>
              </div>
              <span className="text-[11px] mr-3 text-gray-700">
                {item.time}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default Notifications;