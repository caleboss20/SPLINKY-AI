import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XMarkIcon,SparklesIcon } from "@heroicons/react/24/outline";
import InputBox from "./InputBox";
import { Link } from "react-router-dom";
function Chatwindow({
  input,
  setInput,
  changeIcon,
  handleCheck,
  handleClick,
  messages,
}) {
  let fullText = "Hello I'm Splinky AI";
  const [displayedText, setDisplayedText] = useState("");
  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      setDisplayedText(fullText.slice(0, currentIndex + 1)); // take substring from 0 to current index
      currentIndex++;
      if (currentIndex === fullText.length) {
        clearInterval(interval); // stop when all letters displayed
      }
    }, 120); // typing speed in ms
    return () => clearInterval(interval);
  }, []);

  let welcome = "Hi I'm Splinky AI";
  const [displayedwelcome, setDisplayedwelcome] = useState("");
  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      setDisplayedwelcome(welcome.slice(0, currentIndex + 1)); // take substring from 0 to current index
      currentIndex++;
      if (currentIndex === welcome.length) {
        clearInterval(interval); // stop when all letters displayed
      }
    }, 120); // typing speed in ms
    return () => clearInterval(interval);
  }, []);

  const [showPopup, setShowPopup] = useState(true);
  return (
    <>
      <div className="flex justify-center space-y-4 p-4 bg-yello-400 h-full ">
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
            <div className="flex gap-3 items-center">
              {displayedwelcome}
            <SparklesIcon className="w-6 h-6 mt-1
             bg-gradient-to-r from-blue-400 via-pink-400 to-blue-500
          bg-[length:300%_300%]
          bg-clip-text text-violet-500
          animate-[gradientMove_4s_ease_infinite]
          drop-shadow-[0_0_20px_rgba(255,0,255,0.4)]
            " />
            
            </div>
            
          </motion.h2>
          <style>{`
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

          <div className="fixed bottom-1 left-0 pl-2 pr-2 w-full bg-rd-300 md:flex justify-center items-center md:relative">
            <InputBox
              handleCheck={handleCheck}
              handleClick={handleClick}
              changeIcon={changeIcon}
              messages={messages}
              input={input}
            />
          </div>

          <AnimatePresence>
            {showPopup && (
              <motion.div
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 1 }}
                className="absolute bottom-22 px-4 py-4 rounded- h-80 bg-vilet-500 md:hidden"
              >
                <div className="relative rounded-lg bg-white px-9 py-6 shadow-lg bg">
                  <div
                    className="absolute right-4"
                    onClick={() => setShowPopup(!showPopup)}
                  >
                    <XMarkIcon className="w-6 h-6 " />
                  </div>
                  <p className="text-[17px] font-small text-gray-700 leading-base">
                    You've hit the free plan limit for SPLINKY-1. Responses will
                    use another model until your limit resets in 1 hour,or get
                    splinKY Pro.
                  </p>
                  <Link to="/premium">
                    <button className="shadow- font-semibold mt-6 px-12 text-lg  rounded-full w-full py-3 bg-blue-100 text-blue-500">
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
