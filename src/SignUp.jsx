import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
function SignUp({ users, setUsers }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [creatingStep, setCreatingStep] = useState(0);
  const steps = [
    "Creating your account...",
    "Preparing your dashboard...",
    "Almost done...",
  ];
  // -------------------------
  // STRICT VALIDATION HELPERS
  // -------------------------
  const isValidEmail = (email) => {
    // allow ONLY gmail.com for now
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return gmailRegex.test(email);
  };
  const getStoredUsers = () => {
    const stored = localStorage.getItem("geni_users");
    return stored ? JSON.parse(stored) : [];
  };
  const saveUserToStorage = (user) => {
    const existingUsers = getStoredUsers();
    localStorage.setItem(
      "geni_users",
      JSON.stringify([...existingUsers, user])
    );
  };
  // -------------------------
  // HANDLERS
  // -------------------------
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSignUp = async (e) => {
    e.preventDefault();
    const name = formData.name.trim();
    const email = formData.email.trim().toLowerCase();
    const password = formData.password;
    // STRICT CLIENT VALIDATION
    if (!name || !email || !password) {
      setError("All fields are required.");
      return;
    }
    if (!isValidEmail(email)) {
      setError("Please use a valid gmail address.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    const existingUsers = getStoredUsers();
    const emailExists = existingUsers.some((user) => user.email === email);
    if (emailExists) {
      setError("Email is already registered.");
      return;
    }
    // Passed all checks
    setError("");
    setIsCreating(true);
    setCreatingStep(0);
    // Save user (mock backend)
    const newUser = { name, email, password };
    saveUserToStorage(newUser);
    setUsers((prev) => [...prev, newUser]);
    // Animate overlay steps
    let stepIndex = 0;
    const interval = setInterval(() => {
      setCreatingStep(stepIndex);
      stepIndex++;
      if (stepIndex >= steps.length) {
        clearInterval(interval);
        setTimeout(() => navigate("/"), 500);
      }
    }, 1500);
  };
  // -------------------------
  // UI (UNCHANGED)
  // -------------------------
  return (
    <>
      <div className="w-full bg-white">
        <div className="w-full bg-white p-6">
          <div className="w-full">
            <Link to="/">
              <h2 className="font-medium text-gray-800 absolute right-10 text-md">
                Skip
              </h2>
            </Link>
          </div>
          <div className="flex flex-col justify-center mt-2">
            <form onSubmit={handleSignUp} className="mt-10">
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
                className="
                text-center text-2xl font-medium mb-2 

          bg-gradient-to-r from-blue-400 via-pink-400 to-blue-500
          bg-[length:300%_300%]
          bg-clip-text text-transparent
          animate-[gradientMove_4s_ease_infinite]
          drop-shadow-[0_0_20px_rgba(255,0,255,0.4)]"
              >
                Geni AI
              </motion.h2>
              <style>{`
                @keyframes gradientMove {
                  0% { background-position: 0% 50%; }
                  50% { background-position: 100% 50%; }
                  100% { background-position: 0% 50%; }
                }
              `}</style>
              <p className="mt-3 font-medium text-lg text-gray-700 text-center mb-10">
                Let's create your account
              </p>
              <div className="flex flex-col gap-4.5">
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  type="text"
                  placeholder="Full Name"
                  className="border-gray-200 pl-5 rounded-full outline-none w-full py-3 border-1 text-black text-md"
                />
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="text"
                  placeholder="Email"
                  className="border-gray-200 pl-5 rounded-full w-full py-3 outline-none border-1 text-black text-md"
                />
                <input
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  type="password"
                  placeholder="Password"
                  className="text-black text-md border-gray-200 pl-5 rounded-full outline-none w-full py-3 border-1"
                />
                {error && (
                  <p className="text-red-500 text-left ml-3 text-sm">{error}</p>
                )}
                <button
                  type="submit"
                  disabled={isCreating}
                  className="w-full py-3 bg-gray-700 rounded-full mt-4 text-white font-medium text-md bg-gradient-to-r from-gray-800 via-black to-gray-800"
                >
                  Sign up
                </button>
                <div className="flex items-center mb-4 mt-2">
                  <hr className="flex-1 border-gray-300" />
                  <span className="px-2 text-gray-400 text-sm">or</span>
                  <hr className="flex-1 border-gray-300" />
                </div>
                <div className="relative flex justify-center items-center w-full py-3 border-1 border-gray-500 rounded-full ">
                  <FcGoogle className="w-5 h-5 mr-6" />
                  <span className="font-medium text-md text-gray-500">
                    Continue with Google
                  </span>
                </div>
                <p className="text-center text-gray-500 text-md mt-0">
                  Already have an account?{" "}
                  <Link to="/login">
                    <span className="text-gray-900 font-medium ml-2 text-center">
                      Sign in
                    </span>
                  </Link>
                </p>
                <p className="text-center mt-4 text-gray-900 text-[11px]">
                  By continuing, you agree to GENI AI's{" "}
                  <span className="text-gray-600 font-small underline">
                    Terms of Service
                  </span>{" "}
                  and{" "}
                  <span className="text-gray-600 font-small underline">
                    Privacy Policy
                  </span>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* Overlay */}
      <AnimatePresence>
        {isCreating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.9 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="fixed inset-0 bg-black/80 flex justify-center items-center backdrop-blur-sm z-50"
          >
            <motion.div
              key={creatingStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
              className="flex flex-col items-center gap-4 text-white text-2xl font-medium"
            >
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span className="text-sm">{steps[creatingStep]}</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
export default SignUp;
