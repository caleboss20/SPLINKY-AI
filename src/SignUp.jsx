import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
function SignUp({ users, setUsers }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [creatingStep, setCreatingStep] = useState(0);
  const steps = ["Creating your account...", "Preparing your dashboard...", "Almost done..."];
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSignUp = (e) => {
    e.preventDefault();
    // Simple validation
    if (!formData.name || !formData.email || !formData.password) {
      setError("All fields are required.");
      return;
    }
    // Check if email already exists
    if (users.find(user => user.email === formData.email)) {
      setError("Email is already registered.");
      return;
    }
    // Clear error
    setError("");
    // Push new user to lifted state
    setUsers([...users, formData]);
    // Show creating account overlay
    setIsCreating(true);
    // Animate steps
    let stepIndex = 0;
    const interval = setInterval(() => {
      setCreatingStep(stepIndex);
      stepIndex++;
      if (stepIndex >= steps.length) {
        clearInterval(interval);
        setTimeout(() => {
          navigate("/"); // Redirect to main page
        }, 500);
      }
    }, 1500);
  };
  return (
    <>
      <div className="w-full bg-gray-200 h-screen">
        <div className="w-full bg-gray-900 p-6">
          <div className="w-full">
            <Link to="/">
            <h2 className="font-medium text-gray-400 absolute right-10 text-xl">Skip</h2>
            </Link>
            
          </div>
          <div className="flex flex-col justify-center mt-10">
            <form onSubmit={handleSignUp} className="mt-10">
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
                className="
                  text-center
                  text-4xl font-medium mb-2
                  bg-gradient-to-r from-blue-400 via-pink-400 to-blue-500
                  bg-[length:300%_300%]
                  bg-clip-text text-transparent
                  animate-[gradientMove_4s_ease_infinite]
                  drop-shadow-[0_0_20px_rgba(255,0,255,0.4)]
                  ml-4 text-blue-600
                "
              >
                SplinkyAI
              </motion.h2>
              <style>{`
                @keyframes gradientMove {
                  0% { background-position: 0% 50%; }
                  50% { background-position: 100% 50%; }
                  100% { background-position: 0% 50%; }
                }
              `}</style>
              <div className="flex flex-col gap-6">
                <p className="mt-10 font-medium text-3xl text-gray-400 text-center mb-10">
                  Let's Create your account
                </p>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  type="text"
                  placeholder="Full Name"
                  className="border-gray-400 pl-10 rounded-full w-full h-15 border-1 text-white text-lg"
                />
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
                {error && <p className="text-red-500 text-center">{error}</p>}
                <button
                  type="submit"
                  className="w-full h-15 bg-gray-700 rounded-full mt-4 text-white font-medium text-xl
                    bg-gradient-to-r from-violet-400 via-violet-700 to-blue-800 cursor-pointer"
                >
                  Sign up
                </button>
                <div className="flex items-center mb-4 mt-2">
                  <hr className="flex-1 border-gray-300" />
                  <span className="px-2 text-gray-400 text-md">or</span>
                  <hr className="flex-1 border-gray-300" />
                </div>
                <div className="relative flex justify-center items-center w-full h-15 border-1 border-gray-500 rounded-full ">
                  <FcGoogle className="w-6 h-6 mr-6" />
                  <span className="font-medium text-xl text-gray-500">Sign up with Google</span>
                </div>
                <p className="text-center text-gray-500 text-lg mt-2">
                  Already have an account?{" "}
                  <Link to="/login">
                    <span className="text-gray-300 font-medium ml-2 text-center">Sign in</span>
                  </Link>
                </p>
                <p className="text-center mt-4 text-gray-400 text-sm">
                  By continuing, you agree to SplinkyAI's{" "}
                  <span className="text-gray-200 font-small underline">Terms of Service</span> and{" "}
                  <span className="text-gray-200 font-small underline"> Privacy Policy</span>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* Overlay for creating account */}
      <AnimatePresence>
        {isCreating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.9 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="fixed inset-0 bg-gray-900 flex justify-center items-center backdrop-blur-sm z-50"
          >
            <motion.div
              key={creatingStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
              className="text-white text-2xl font-medium"
            >
              {steps[creatingStep]}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
export default SignUp;