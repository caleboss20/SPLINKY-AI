import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/outline";
import InputBox from "./InputBox";
import { Link, useNavigate } from "react-router-dom";
function Chatwindow({
  input,
  setInput,
  changeIcon,
  handleCheck,
  handleClick,
  messages,
  selectedImage,
  setselectedImage,
}) {
  const navigate = useNavigate();
  // -------------------
  // AUTH GUARD
  // -------------------
  useEffect(() => {
    const activeUser = localStorage.getItem("geni_active_user");
    if (!activeUser) {
      navigate("/login"); // Not logged in → redirect to login
    }
  }, [navigate]);
  // -------------------
  // TYPING EFFECT FOR HEADER
  // -------------------
  let fullText = "Hello I'm Geni AI";
  const [displayedText, setDisplayedText] = useState("");
  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      setDisplayedText(fullText.slice(0, currentIndex + 1));
      currentIndex++;
      if (currentIndex === fullText.length) clearInterval(interval);
    }, 120);
    return () => clearInterval(interval);
  }, []);
  let welcome = "Hi I'm Geni AI";
  const [displayedwelcome, setDisplayedwelcome] = useState("");
  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      setDisplayedwelcome(welcome.slice(0, currentIndex + 1));
      currentIndex++;
      if (currentIndex === welcome.length) clearInterval(interval);
    }, 180);
    return () => clearInterval(interval);
  }, []);
  // -------------------
  // POPUP STATE
  // -------------------
  const [showPopup, setShowPopup] = useState(true);
  return (
    <>
      <div className="flex justify-center space-y-4 p-4 h-full mt-0 ">
        <div className="flex flex-col gap-10 items-center mb-55 justify-center md:mt-30 ">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className=" hidden md:block text-3xl
             bg-gradient-to-r from-blue-400 via-pink-400 to-blue-500
          bg-[length:300%_300%]
          bg-clip-text text-transparent
          animate-[gradientMove_4s_ease_infinite]
          drop-shadow-[0_0_20px_rgba(255,0,255,0.4)]
            "
          >
            {displayedText}
          </motion.h2>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-3xl text-3xl font-medium
             bg-gradient-to-r from-blue-400 via-pink-400 to-blue-500
          bg-[length:300%_300%]
          bg-clip-text text-transparent
          animate-[gradientMove_4s_ease_infinite]
          drop-shadow-[0_0_20px_rgba(255,0,255,0.4)]
           
            md:hidden"
          >
            <div className="flex gap-3 items-center text-5xl">
              {displayedwelcome}
            </div>
          </motion.h2>
          <style>{`
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
          `}</style>
          <div className="fixed bottom-0.5 left-0 pl-2 pr-2 w-full md:flex justify-center items-center md:relative">
            <InputBox
              handleCheck={handleCheck}
              handleClick={handleClick}
              changeIcon={changeIcon}
              messages={messages}
              input={input}
              selectedImage={selectedImage}
              setselectedImage={setselectedImage}
            />
          </div>
          <AnimatePresence>
            {showPopup && (
              <motion.div
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4 }}
                className="z-[1] absolute bottom-3 px-4 py-4 rounded- h-80  md:hidden"
              >
                <div className="relative rounded-2xl bg-gray-150 blur-40 px-9 py-6 shadow-[0_4px_24px_rgba(0,0,0,0.08)] bg">
                  <div
                    className="absolute right-2 top-4"
                    onClick={() => setShowPopup(!showPopup)}
                  >
                    <XMarkIcon className="w-4 h-4 text-gray-700 " />
                  </div>
                  <p className="text-[13px] text-gray-700 leading-base">
                    You've hit the free plan limit for SPLINKY-1. Responses will
                    use another model until your limit resets in 1 hour, or get
                    Splinky Pro.
                  </p>
                  <Link to="/premium">
                    <button className="shadow-sm font-medium active:scale-[0.98] transition mt-6 px-12 text-sm  rounded-full w-full py-3 bg-black text-white">
                      Upgrade to Pro
                    </button>
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
export default Chatwindow;