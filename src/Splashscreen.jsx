import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BoltIcon } from "@heroicons/react/24/outline";
function Splashscreen({ onFinish }) {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      if (onFinish) onFinish(); // call parent to hide splash
    }, 4000); // 2.5s splash
    return () => clearTimeout(timer);
  }, [onFinish]);
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="w-full h-screen bg-white flex flex-col justify-center items-center relative overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5 }}
        >
          {/* Floating / glowing background circle */}
          <motion.div
            className="absolute w-64 h-64 bg-pink-900/10 rounded-full"
            initial={{ scale: 0 }}
            animate={{ scale: 1.2, opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Logo + brand container */}
          <div className="flex flex-col items-center pb-20 gap-5 relative z-10">
            {/* Logo animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5, rotate: 0 }}
              animate={{ opacity: 1, scale: 1, rotate: 360 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              <BoltIcon
                className="w-20 h-20 

              text-violet-500 md:w-30 h-30"
              />
            </motion.div>
            {/* Brand name animation */}
            <motion.h2
              className="text-3xl font-small text-black tracking-wider
               bg-gradient-to-r from-blue-400 via-pink-400 to-blue-500
          bg-[length:300%_300%]
          bg-clip-text text-transparent
          animate-[gradientMove_4s_ease_infinite]
          drop-shadow-[0_0_20px_rgba(255,0,255,0.4)]
              "
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
            >
              SplinKI
            </motion.h2>
          </div>
          {/* Subtle shimmer overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/20 to-white/10"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
export default Splashscreen;
