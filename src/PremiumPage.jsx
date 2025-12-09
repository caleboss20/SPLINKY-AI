import { ArrowLeftIcon, MinusIcon } from "@heroicons/react/24/outline";
import { CheckIcon } from "@heroicons/react/24/solid";
import { FaCreditCard,FaPaypal,FaMobileAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
function PremiumPage() {
  const [paymentpop, setpaymentpop] = useState(false);
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
  const checkpop = () => {
    setpaymentpop(!paymentpop);
  };

  return (
    <>
      <div className="flex flex-col md:p-10">
        <div className="z-100 pb-35 p-6 w-full bg-white flex flex-col md:">
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
         text-4xl font-medium mb-2"
            >
              SPLINKY
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
              <div
                key={index}
                className="flex flex-col py-4 bg-rd-500 mt-2 mr-2"
              >
                <div className="flex justify-between">
                  <h2 className="text-gray-700 font-medium">
                    {detail.features}
                  </h2>
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
              <button
                onClick={() => setpaymentpop(!paymentpop)}
                className="mb-2 shadow- font-semibold mt-6 px-12 text-lg  rounded-full w-full py-4 bg-black text-white"
              >
                Upgrade to Pro
              </button>
              <p className="text-center mt-3 text-gray-700">
                Renews for GH₵ 300.00/month. Cancel anytime.
              </p>
            </div>

            {/**payment popup */}
            {paymentpop && (
              <>
                <div className="pt-3 z-10 fixed bottom-0 left-0 right-0 w-full h-[420px] bg-white  md:hidden">
                  <h2 className="text-xl font-semibold text-gray-900 ml-4 pt-2">
                    Google Play
                  </h2>
                  <div className="w-full h-[1px] bg-gray-300 mt-3"></div>
                  {/* Content scrollable */}
                  <div className="mt-4 h-[300px] pr-2 overflow-y-auto pl-4">
                    <h3 className="text-lg font-medium">
                      Start by adding a payment method
                    </h3>
                    <p className="text-gray-700 mt-2">
                      Add a payment method to your Google Account to complete
                      your purchase. Your payment information is visible only to
                      Google.
                    </p>
                    <p className="font-medium text-gray-800 mt-4">
                      acaleb888@gmail.com
                    </p>
                    {/* Payment Options */}
                    <div className="flex flex-col gap-3 mt-6">
                      <div className="flex gap-4 items-center w-full py-4 border border-gray-300 rounded-lg px-3">
                       <div><FaCreditCard className="text-blue-800 h-5 w-5"/></div>
                       <span>Credit or Debit Card</span> 
                      </div>
                      <div className="flex gap-4 w-full py-4 border border-gray-300 rounded-lg px-3">
                        <div><FaMobileAlt className="text-blue-800 h-5 w-5"/></div>
                        <span>Mobile Money</span>
                      </div>
                      <div className="flex gap-4 w-full py-4 border border-gray-300 rounded-lg px-3">
                         <div><FaPaypal className="text-blue-800 h-5 w-5"/></div>
                        <span>PayPal</span>
                      </div>
                    </div>
                  </div>
                </div>
                <motion.div
                  onClick={checkpop}
                  className="fixed inset-0 md:hidden"
                  style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default PremiumPage;
