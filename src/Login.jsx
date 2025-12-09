import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import {EyeSlashIcon,EyeIcon,LockClosedIcon} from "@heroicons/react/24/outline"


function Login({users}) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginStep, setLoginStep] = useState(0);
  const steps = ["Preparing your dashboard...", "Signing you in...", "Almost ready..."];
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSignIn = (e) => {
    e.preventDefault();
    const user = users.find((u) => u.email === formData.email);
    if (!user) {
      setError("Account not found. Please sign up first.");
      return;
    }
    if (user.password !== formData.password) {
      setError("Invalid credentials. Please try again.");
      return;
    }
    // Clear error and start login overlay
    setError("");
    setIsLoggingIn(true);
    // Step animation
    let stepIndex = 0;
    const interval = setInterval(() => {
      setLoginStep(stepIndex);
      stepIndex++;
      if (stepIndex >= steps.length) {
        clearInterval(interval);
        // Redirect after steps complete
        setTimeout(() => {
          navigate("/");
        }, 500);
      }
    }, 1500);
  };
  return (
    <>
      <div className="w-full bg-gray-900 h-screen">
        <div className="w-full bg-gray-900 p-6">
          <div className="w-full">
            <h2 className="font-medium text-gray-400 absolute right-10 text-xl"></h2>
          </div>
          <div className="flex flex-col justify-center mt-10 ">
            <form onSubmit={handleSignIn} className="mt-10">
              <div className="flex items-center justify-center gap-3">
                <motion.h2
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.5 }}
                  className="text-center text-4xl font-medium mb-2 bg-gradient-to-r from-blue-400 via-pink-400 to-blue-500 bg-[length:300%_300%] bg-clip-text text-transparent animate-[gradientMove_4s_ease_infinite] drop-shadow-[0_0_20px_rgba(255,0,255,0.4)] ml-4 text-blue-600"
                >
                  SplinkyAI
                </motion.h2>
              </div>
              <style>{`
                @keyframes gradientMove {
                  0% { background-position: 0% 50%; }
                  50% { background-position: 100% 50%; }
                  100% { background-position: 0% 50%; }
                }
              `}</style>
              <div className="flex flex-col gap-6">
                <p className="mt-10 font-medium text-3xl text-gray-400 text-center mb-10">
                  Log into your account
                </p>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="text"
                  placeholder="Email"
                  className="border-gray-400 pl-10 rounded-full w-full h-15 border-1 text-white text-lg"
                />
                <input
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  type="password"
                  placeholder="Password"
                  className="text-white text-lg border-gray-400 pl-10 rounded-full w-full h-15 border-1"
                />
                {error && 
                <div className="flex gap-2 ml-3">
                <span><LockClosedIcon className="w-6 h-6 text-red-500"/></span>
                 <p className="text-red-500 text-center">{error}</p>
                 </div>
                 }
                <button
                  type="submit"
                  className="w-full h-15 bg-gray-700 rounded-full mt-4 text-white font-medium text-xl bg-gradient-to-r from-gray-800 via-black to-gray-800 cursor-pointer"
                >
                  Sign in
                </button>
                <div className="flex items-center mb-4 mt-2">
                  <hr className="flex-1 border-gray-300" />
                  <span className="px-2 text-gray-400 text-md">or</span>
                  <hr className="flex-1 border-gray-300" />
                </div>
                <div className="relative flex justify-center items-center w-full h-15 border-1 border-gray-500 rounded-full">
                  <FcGoogle className="w-6 h-6 mr-6" />
                  <span className="font-medium text-xl text-gray-500">Sign in with Google</span>
                </div>
                <p className="text-center text-gray-500 text-lg mt-2">
                  Don't have an account?{" "}
                  <Link to="/signup">
                    <span className="text-gray-300 font-medium ml-2 text-center">Sign up</span>
                  </Link>
                </p>
                <p className="text-center mt-4 text-gray-400 text-sm">
                  By continuing, you agree to SplinkyAI's{" "}
                  <span className="text-gray-200 font-small underline">Terms of Service</span> and{" "}
                  <span className="text-gray-200 font-small underline">Privacy Policy</span>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* Smooth login overlay with steps */}
      <AnimatePresence>
        {isLoggingIn && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.9 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="fixed inset-0 bg-gray-900 flex justify-center items-center backdrop-blur-sm z-50"
          >
            <motion.div
              key={loginStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
              className="text-white text-2xl font-medium"
            >
              {steps[loginStep]}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
export default Login;