import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  BoltIcon,
  HeartIcon,
  AdjustmentsHorizontalIcon,
  MoonIcon,
  SunIcon,
  KeyIcon,
  LinkIcon,
  DocumentTextIcon,
  LockClosedIcon,
  FolderIcon,
  ShieldCheckIcon,
  FlagIcon,
  ArrowRightEndOnRectangleIcon,
  PencilIcon,
  ArrowLeftIcon,
  CameraIcon,
} from "@heroicons/react/24/outline";

function Settings() {
  const navigate=useNavigate();
  const [on, setOn] = useState(false);
  const [changebackground, setchangebackground] = useState(false);
  const [systemcolor, setsystemcolor] = useState(false);
  const [profilePopup, setprofilePopup] = useState(false);
  const [logoutPop, setLogoutPop] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [image, setImage] = useState(() => {
    return localStorage.getItem("image") || null;
  });
  const [editedName, setEditedName] = useState(() => {
    return localStorage.getItem("editedName") || "caleboss";
  });
  const [editedEmail, seteditedEmail] = useState(() => {
    return localStorage.getItem("editedEmail") || "caleb2@gmail.com";
  });

  const editName = (e) => {
    setEditedName(e.target.value);
    console.log(editedName);
  };

  const editEmail = (e) => {
    seteditedEmail(e.target.value);
    console.log(editedEmail);
  };

  const saveEdit = () => {
    if (image) {
      localStorage.setItem("image", image);
    }

    localStorage.setItem("editedEmail", editedEmail);
    localStorage.setItem("editedName", editedName);
    setprofilePopup(false);
  };

  const handleLogout = () => {
    setLogoutPop(false); // close popup
    setLoggingOut(true); // show spinner overlay
    setTimeout(() => {
      localStorage.removeItem("geni_active_user"); // clear session
      navigate("/login"); // go to login
    }, 4000); // 4 seconds
  };

  return (
    <>
      {/**for the profile popup */}

      {profilePopup && (
        <>
          <div className="rounded-tl-lg rounded-tr-lg fixed bottom-0 z-20 w-full h-[480px] bg-white shadow-xl">
            <div className="flex justify-center">
              <div className="w-10 h-1 bg-black mt-5 rounded-xl"></div>
            </div>
            {/**profile section */}
            <div className="mt-8 w-full flex justify-center items-center">
              <input
                type="file"
                accept="image/*"
                id="fileInput"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setImage(URL.createObjectURL(file));
                  }
                }}
              />

              <div
                onClick={() => document.getElementById("fileInput").click()}
                className={`${
                  !image
                    ? "relative w-20 rounded-full h-20 bg-violet-400 flex justify-center items-center"
                    : ""
                }`}
              >
                {image ? (
                  <img src={image} className="w-25 h-25 rounded-full" />
                ) : null}
                <span className="font-medium text-3xl text-white">C</span>
                {image ? null : (
                  <div className=" w-6 h-7 rounded-full bg-white absolute right-1 bottom-0">
                    <CameraIcon className="w-6 h-6" />
                  </div>
                )}
              </div>
            </div>
            <div className="p-4 mt-3">
              <form action="">
                <div className="flex flex-col gap-5">
                  <input
                    name={editedName}
                    onChange={editName}
                    type="text"
                    placeholder="Full name"
                    className="pl-5 border-1 border-gray-200 rounded-2xl w-full h-13"
                  />
                  <input
                    onChange={editEmail}
                    type="text"
                    placeholder="Email"
                    className="pl-5 border-1 border-gray-200 rounded-2xl w-full h-13"
                  />
                </div>
              </form>
              <p className="text-center text-sm text-gray-600 mt-8">
                Your profile helps people recognize you.
              </p>
              <div className="flex justify-center">
                <button
                  onClick={saveEdit}
                  className="py-3 px-6 text-sm bg-gray-800 text-white rounded-full mt-6"
                >
                  Save profile
                </button>
              </div>
              <p
                onClick={() => setprofilePopup(false)}
                className="text-center mt-5 font-medium  text-sm text-gray-700"
              >
                cancel
              </p>
            </div>
          </div>
          <motion.div
            onClick={() => setprofilePopup(false)}
            className="fixed inset-0 md:hidden z-1"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        </>
      )}

      <div
        className={`w-full p-4 pb-4 md:w-1/3 ${
          changebackground ? "bg-gray-900 text-white " : "bg-white text-black"
        }`}
      >
        <div>
          <div className="relative w-full h-15 bg-blu-400 flex items-center justify-center">
            <Link to="/">
              <div className="absolute left-0 top-4.5">
                <ArrowLeftIcon className="w-5 h-5" />
              </div>
            </Link>
            <div>
              <span className="text-center text-md font-medium">Settings</span>
            </div>
          </div>

          <div className="flex bg-re-400 gap-4 flex-col items-center mt-5">
            <div
              onClick={() => setprofilePopup(!profilePopup)}
              className="relative rounded-full h-20 w-20 bg-violet-400 flex justify-center items-center"
            >
              {image ? (
                <>
                  <img src={image} className="w-full h-full rounded-full" />
                  <div className="p-1.5 rounded-full absolute  right-1 bottom-0 bg-white shadow-xl">
                    <PencilIcon className="text-gray-600 w-5 h-5 " />
                  </div>
                </>
              ) : (
                <>
                  <span className="text-4xl text-white">c</span>
                </>
              )}
            </div>

            <div className="flex flex-col items-center">
              <h2 className="font-medium text-lg">{editedName}</h2>
              <span className=" text-sm text-gray-700 mt-0">{editedEmail}</span>
            </div>
          </div>

          <Link to="/premium">
            <div className="mt-8 bg-re-500">
              <p className="text-md font-medium text-gray-700">Subscription</p>
              <div className="flex gap-5 mt-8">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <BoltIcon className="w-6 h-6 text-gray-400 " />
                </div>
                <div className="flex-1 h-15 bg-gree-400 flex flex-col gap-1">
                  <h2 className="font-bold text-md">
                    Upgrade to GENI
                    <span
                      className="
           bg-gradient-to-r from-blue-400 via-pink-400 to-blue-500
          bg-[length:300%_300%]
          bg-clip-text text-transparent
          animate-[gradientMove_4s_ease_infinite]
          drop-shadow-[0_0_20px_rgba(255,0,255,0.4)]
          ml-4 text-blue-600"
                    >
                      PRO
                    </span>
                    <style>{`
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
                  </h2>

                  <span className="text-gray-600 text-sm">
                    Unlock advanced features
                  </span>
                </div>
              </div>
            </div>
          </Link>

          <div className="mt-10">
            <p className="text-md font-medium text-gray-700">Appearance</p>
            <div className="flex gap-9 mt-8">
              <div className="flex-1 bg-gree-400 flex gap-7">
                <div className="flex flex-col flex-1 h-22 gap-1">
                  <div className="flex justify-center items-center flex-1 bg-gra-400 border-1 border-gray-300 rounded-xl">
                    <HeartIcon className="w-6 h-6" />
                  </div>
                  <span className="text-center text-sm">For You</span>
                </div>

                <div className="flex flex-col flex-1 h-22 gap-1">
                  <div className="flex justify-center items-center flex-1 h-15 bg-gra-400 border-1 border-gray-300 rounded-xl">
                    <AdjustmentsHorizontalIcon className="w-6 h-6" />
                  </div>
                  <span className="text-center text-sm">System</span>
                </div>

                <div
                  onClick={() => setchangebackground(true)}
                  className="flex flex-col flex-1 h-22 gap-1"
                >
                  <div className="flex justify-center items-center flex-1 h-15 bg-gra-400 border-1 border-gray-300 rounded-xl">
                    <MoonIcon className="w-6 h-6" />
                  </div>
                  <span className="text-center text-sm">Dark</span>
                </div>

                <div
                  onClick={() => setchangebackground(false)}
                  className="flex flex-col flex-1 h-22 gap-1"
                >
                  <div className="flex justify-center items-center flex-1 h-15 bg-gra-400 border-1 border-gray-300 rounded-xl">
                    <SunIcon className="w-6 h-6" />
                  </div>
                  <span className="text-center text-sm">Light</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <p className="text-md font-medium text-gray-700 mb-4">
              AI Data Retention
            </p>
            <div className="flex gap-6 items-center">
              <div className="flex-1">
                <span className="text-gray-700 text-sm">
                  AI Data Retention allows SplinkyAI to use searches to improve
                  AI models.Turn this setting off if you wish to exclude your
                  data from this process.
                </span>
              </div>
              <div
                onClick={() => setOn(!on)}
                className={`w-12 h-7 rounded-full cursor-pointer relative transition-colors duration-300 ${
                  on ? "bg-violet-500" : "bg-gray-300"
                }`}
              >
                <motion.div
                  className={`w-7 h-7 rounded-full absolute top-0 shadow-md ${
                    on
                      ? "bg-white shadow-violet-400/50"
                      : "bg-gray-400 shadow-gray-400/30"
                  }`}
                  layout
                  animate={{ x: on ? 20 : 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
              </div>
            </div>

            <p className="mt-10 text-md font-medium text-gray-700 mt-10">
              Data & Information
            </p>

            <div className="mt-10 flex flex-col gap-1">
              <div className="w-full flex h-15 flex gap-4">
                <LockClosedIcon className="w-5 h-5" />
                <span className="text-sm font-medium text-gray-500">
                  Data Control
                </span>
              </div>

              <div className="w-full flex h-15 flex gap-4">
                <KeyIcon className="w-5 h-5" />
                <span className="text-sm font-medium  text-gray-500">
                  Access Control
                </span>
              </div>
              <div className="w-full flex h-15 flex gap-4">
                <ShieldCheckIcon className="w-5 h-5" />
                <span className="text-sm font-medium  text-gray-500">
                  Privacy
                </span>
              </div>
              <div className="w-full flex h-15 flex gap-4">
                <LinkIcon className="w-5 h-5" />
                <span className="text-sm font-medium  text-gray-500">
                  Shared Links
                </span>
              </div>
            </div>

            <div className="flex flex-col mt-10">
              <div className="w-full flex h-15 flex gap-4">
                <FlagIcon className="w-5 h-5" />
                <span className="text-sm font-medium text-gray-500">
                  Report Issue
                </span>
              </div>

              <div
                onClick={() => setLogoutPop(true)}
                className="w-full flex h-15 flex gap-4"
              >
                <ArrowRightEndOnRectangleIcon className="w-5 h-5 text-red-600" />
                <span className="text-sm font-medium text-red-500 ">
                  Log out
                </span>
              </div>

              {logoutPop && (
                <>
                  <div className=" flex justify-center items-center h-screen fixed inset-0 bg-black/50 flex justify-center items-center z-10">
                    <div className="p-6 fixed bg-white left-6 right-6 h-50 rounded-3xl">
                      <h2 className="text-lg text-black font-medium">
                        Log out ?
                      </h2>
                      <p className="mt-3 text-gray-800 text-sm leading-normal">
                        You'll need to sign back in to keep using Geni
                      </p>
                      <div className="flex gap-4 mt-7 absolute right-10">
                        <button
                        onClick={()=>setLogoutPop(false)} 
                        className="font-medium text-md py-2 px-2">
                          Cancel
                        </button>
                        <button 
                        onClick={handleLogout}
                        className="font-medium text-red-600 text-md">
                          Log out
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {loggingOut && (
                <div className="fixed inset-0 z-30 flex flex-col justify-center items-center bg-black/80">
                  <div className="flex flex-col items-center gap-4">
                   <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <p className="text-white text-lg font-medium">
                      Logging out...
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Settings;
