import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { LockClosedIcon } from "@heroicons/react/24/outline";

// 🔐 AUTH
// import { signInWithGoogle } from "./Config/Auth";


// adjust path if needed

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginStep, setLoginStep] = useState(0);

  const steps = ["Just a moment...", "Signing you in...", "Almost ready..."];

  useEffect(() => {
    const activeUser = localStorage.getItem("geni_active_user");
    if (activeUser) {
      // navigate("/");
    }
  }, [navigate]);

  const getStoredUsers = () => {
    const stored = localStorage.getItem("geni_users");
    return stored ? JSON.parse(stored) : [];
  };

  const setActiveUser = (user) => {
    localStorage.setItem(
      "geni_active_user",
      JSON.stringify({ name: user.name, email: user.email })
    );
  };

  const isValidEmail = (email) => {
    const allowedDomains = ["gmail.com", "yahoo.com", "outlook.com", "icloud.com"];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return false;
    const domain = email.split("@")[1].toLowerCase();
    return allowedDomains.includes(domain);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // 📧 EMAIL / PASSWORD LOGIN (UNCHANGED)
  const handleSignIn = (e) => {
    e.preventDefault();
    const email = formData.email.trim().toLowerCase();
    const password = formData.password;

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    if (!isValidEmail(email)) {
      setError(
        "Please enter a valid email address (e.g., Gmail, Yahoo, Outlook, iCloud)."
      );
      return;
    }

    const storedUsers = getStoredUsers();
    const user = storedUsers.find((u) => u.email === email);

    if (!user) {
      setError("Account not found. Please sign up first.");
      return;
    }

    if (user.password !== password) {
      setError("Incorrect password. Please try again.");
      return;
    }

    setError("");
    setIsLoggingIn(true);
    setLoginStep(0);
    setActiveUser(user);

    let stepIndex = 0;
    const interval = setInterval(() => {
      setLoginStep(stepIndex);
      stepIndex++;
      if (stepIndex >= steps.length) {
        clearInterval(interval);
        setTimeout(() => navigate("/"), 500);
      }
    }, 1500);
  };

  // 🔐 GOOGLE LOGIN (ADDED)
  const handleGoogleLogin = async () => {
    try {
      setError("");
      setIsLoggingIn(true);
      setLoginStep(0);

      const user = await signInWithGoogle();

      localStorage.setItem(
        "geni_active_user",
        JSON.stringify(user)
      );

      let stepIndex = 0;
      const interval = setInterval(() => {
        setLoginStep(stepIndex);
        stepIndex++;
        if (stepIndex >= steps.length) {
          clearInterval(interval);
          setTimeout(() => navigate("/"), 500);
        }
      }, 1500);
    } catch (err) {
      setIsLoggingIn(false);
      setError("Google sign-in failed. Please try again.");
    }
  };

  return (
    <>
      {/* RESPONSIVE WRAPPER */}
      <div className="min-h-screen flex justify-center px-4">
        <div className="w-full max-w-md">
          {/* ORIGINAL UI BELOW — UNCHANGED */}
          <div className="w-full bg-gray-00">
            <div className="w-full bg-gray-00 p-5">
              <div className="flex flex-col justify-center mt-5">
                <form onSubmit={handleSignIn} className="mt-0">
                  <div className="flex items-center justify-center gap-3">
                    <motion.h2
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1.5 }}
                      className="text-center text-2xl font-medium mb-2
                        bg-gradient-to-r from-blue-400 via-pink-400 to-blue-500
                        bg-[length:300%_300%]
                        bg-clip-text text-transparent
                        animate-[gradientMove_4s_ease_infinite]"
                    >
                      Geni AI
                    </motion.h2>
                  </div>

                  <div className="flex flex-col gap-6">
                    <p className="mt-4 font-medium text-lg text-gray-700 text-center mb-4">
                      Log into your account
                    </p>

                    <input
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      type="text"
                      placeholder="Email"
                      className="border-gray-200 pl-5 rounded-full w-full py-3 border-1 text-black text-md outline-none"
                    />

                    <input
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      type="password"
                      placeholder="Password"
                      className="outline-none text-black text-md border-gray-200 pl-5 rounded-full w-full py-3 border-1"
                    />

                    {error && (
                      <div className="flex gap-2 ml-3 items-center">
                        <LockClosedIcon className="w-4 h-3 text-red-500" />
                        <p className="text-red-500 text-[12px]">{error}</p>
                      </div>
                    )}

                    <button
                      type="submit"
                      className="w-full py-3 bg-gray-700 rounded-full mt-4 text-white font-medium text-md bg-gradient-to-r from-gray-800 via-black to-gray-800"
                    >
                      Sign in
                    </button>

                    <div className="flex items-center mb-4 mt-2">
                      <hr className="flex-1 border-gray-300" />
                      <span className="px-2 text-gray-400 text-sm">or</span>
                      <hr className="flex-1 border-gray-300" />
                    </div>

                    {/* ✅ SAME UI — JUST ADDED onClick */}
                    <div
                      onClick={handleGoogleLogin}
                      className="relative flex justify-center items-center w-full py-3 border-1 border-gray-500 rounded-full cursor-pointer"
                    >
                      <FcGoogle className="w-6 h-6 mr-6" />
                      <span className="font-medium text-md text-gray-600">
                        Continue with Google
                      </span>
                    </div>

                    <p className="text-center text-gray-500 text-sm mt-2">
                      Don't have an account?
                      <Link to="/signup">
                        <span className="text-gray-800 font-medium ml-2">
                          Sign up
                        </span>
                      </Link>
                    </p>

                    <p className="p-5 text-center mt-4 text-gray-900 text-[11px]">
                      By continuing, you agree to GENI AI's{" "}
                      <span className="text-gray-600 underline">
                        Terms of Service
                      </span>{" "}
                      and{" "}
                      <span className="text-gray-600 underline">
                        Privacy Policy
                      </span>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* LOGIN OVERLAY (UNCHANGED) */}
      <AnimatePresence>
        {isLoggingIn && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.9 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 flex justify-center items-center bg-black/80"
          >
            <div className="flex flex-col items-center gap-4 text-white">
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span className="text-sm">{steps[loginStep]}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Login;
