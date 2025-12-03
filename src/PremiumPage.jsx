import {
  ArrowLeftIcon,
  MinusIcon,
} from "@heroicons/react/24/outline";
import {  CheckIcon,} from "@heroicons/react/24/solid";
import { Link, } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
function PremiumPage() {
  const [details, setDetails] = useState([
    {
      features: "Features",
      category: "Free",
      upgrade: "Plus",
    },
    {
      features: "Access to SPLINKY-2",
      minus: true,
      check: true,
    },
    {
      features: "Advanced reasoning",
      minus: true,
      check: true,
    },
    {
      features: "More messages and uploads",
      minus: true,
      check: true,
    },
    {
      features: "More image creation",
      minus: true,
      check: true,
    },
    {
      features: "More memory",
      minus: true,
      check: true,
    },
    {
      features: "Early access to new features",
      minus: true,
      check: true,
    },
    {
      features: "Agent mode with deep research",
      minus: true,
      check: true,
    },
  ]);

  return (
    <>
   <div className="flex flex-col md:p-10">
    <div className="z-100 p-6 w-full bg-white flex flex-col md:">
      
      <Link to="/">
      <div className="md:hidden">
        <ArrowLeftIcon className="w-6 h-6 " />
      </div>
      </Link>
      

      <div className="flex flex-col mt-10">
        <motion.h2
         initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
         className="
         text-4xl font-medium mb-2">
          SPLINKY<span className="
           bg-gradient-to-r from-blue-400 via-pink-400 to-blue-500
          bg-[length:300%_300%]
          bg-clip-text text-transparent
          animate-[gradientMove_4s_ease_infinite]
          drop-shadow-[0_0_20px_rgba(255,0,255,0.4)]
          ml-4 text-blue-600">PRO</span>
        </motion.h2>
         <style>{`
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

        <p className="text-gray-700 mt-4">
          Get more access with advanced intelligence and agents
        </p>

        {details.map((detail, index) => (
          <div key={index} className="flex flex-col py-4 bg-rd-500 mt-2 mr-2">
            <div className="flex justify-between">
              <h2 className="text-gray-700 font-medium">{detail.features}</h2>
              <div className="flex gap-6">
                <h2 className="text-gray-700 font-medium">
                  {detail.minus ? (
                    <MinusIcon className="w-5 h-5" />
                  ) : (
                    detail.category
                  )}
                </h2>
                <h2 className=" text-blue-500 font-medium">
                  {detail.check ? (
                    <CheckIcon className="w-5 h-5" />
                  ) : (
                    detail.upgrade
                  )}
                </h2>
              </div>
            </div>
          </div>
        ))}

        <div className=" mt-8 flex flex-col items-center">
            <p className="font-medium">Restore subscription</p>
          <button className="mb-2 shadow- font-semibold mt-6 px-12 text-lg  rounded-full w-full py-4 bg-black text-white">
            Upgrade to Pro
          </button>
          <p className="text-center mt-3 text-gray-700">Renews for GH₵ 300.00/month. Cancel anytime.</p>
        </div>
      </div>
    </div>
    </div>
     </>
  );
  
}
export default PremiumPage;
