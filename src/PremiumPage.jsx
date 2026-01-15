import { ArrowLeftIcon, MinusIcon } from "@heroicons/react/24/outline";
import { CheckIcon } from "@heroicons/react/24/solid";
import { FaCreditCard, FaPaypal, FaMobileAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
function PremiumPage() {
  const [paymentpop, setPaymentPop] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [details, setDetails] = useState([
    { features: "Features", category: "Free", upgrade: "Plus" },
    { features: "Access to GENI-2", minus: true, check: true },
    { features: "Advanced reasoning", minus: true, check: true },
    { features: "More messages and uploads", minus: true, check: true },
    { features: "More image creation", minus: true, check: true },
    { features: "More memory", minus: true, check: true },
    { features: "Early access to new features", minus: true, check: true },
    { features: "Agent mode with deep research", minus: true, check: true },
  ]);
  const togglePaymentPop = () => setPaymentPop(!paymentpop);
  // Dynamically load Paystack script
  useEffect(() => {
    if (!document.getElementById("paystack-script")) {
      const script = document.createElement("script");
      script.id = "paystack-script";
      script.src = "https://js.paystack.co/v1/inline.js";
      script.async = true;
      script.onload = () => setScriptLoaded(true);
      document.body.appendChild(script);
    } else {
      setScriptLoaded(true);
    }
  }, []);
  // Handle Paystack Mobile Money payment
  const handleMoMoPayment = () => {
    if (!window.PaystackPop) {
      alert("Payment system is loading. Please try again in a moment.");
      return;
    }
    const handler = window.PaystackPop.setup({
      key: "pk_test_b95228f8d0d6cde069d90ed18f9ddb17d1353674", // public test key
      email: "user@example.com", // replace with dynamic user email
      amount: 30000, // e.g., GH₵ 300 * 100 for kobo
      currency: "GHS",
      channels: ["mobile_money"],
      ref: `${Math.floor(Math.random() * 1000000000) + 1}`, // unique reference
      onClose: () => alert("Payment cancelled"),
      callback: function(response) {
        alert("Payment successful! Ref: " + response.reference);
        // TODO: update user subscription in Firestore or local storage
      },
    });
    handler.openIframe();
  };

  return (
    <>
      <div className="flex flex-col md:p-10">
        <div className="z-100 pb-5 p-6 w-full bg-white flex flex-col md:">
          <Link to="/">
            <div className="md:hidden">
              <ArrowLeftIcon className="w-6 h-6 text-white " />
            </div>
          </Link>
          <div className="flex flex-col mt-0">
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
              className="text-3xl font-medium mb-2 text-gray-900"
            >
              GENI
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
            <p className="text-gray-800 mt-4">
              Get more access with advanced intelligence and agents
            </p>

            <div className="flex flex-col">
                 {details.map((detail, index) => (
              <div key={index} className="flex flex-col py-4 bg-rd-500 mt-0 mr-2">
                <div className="flex justify-between">
                  <h2 className="text-gray-600 font-medium text-[12px]">{detail.features}</h2>
                  <div className="flex gap-6">
                    <h2 className="text-gray-600 font-medium">
                      {detail.minus ? <MinusIcon className="w-5 h-5" /> : detail.category}
                    </h2>
                    <h2 className="text-violet-500 font-medium">
                      {detail.check ? <CheckIcon className="w-5 h-5 " /> : detail.upgrade}
                    </h2>
                  </div>
                </div>
              </div>
            ))}
            </div>
           
            <div className="mt-4 flex flex-col items-center">
              <p className="font-medium text-sm text-gray-600">Restore subscription</p>
              <button
                onClick={togglePaymentPop}
                className="mb-2 shadow font-semibold mt-4 px-12 text-sm rounded-full w-full py-3 bg-gray-900 text-white"
              >
                Upgrade to Pro
              </button>
              <p className="text-sm text-center mt-3 text-gray-700">
                Renews for GH₵ 300.00/month. Cancel anytime.
              </p>
            </div>
            {/* Payment Popup */}
            {paymentpop && (
              <>
                <div className="pt-3 z-10 fixed bottom-0 left-0 right-0 w-full h-[420px] bg-white md:hidden">
                  <h2 className="text-xl font-semibold text-gray-900 ml-4 pt-2">Google Play</h2>
                  <div className="w-full h-[1px] bg-gray-300 mt-3"></div>
                  <div className="mt-4 h-[300px] pr-2 overflow-y-auto pl-4">
                    <h3 className="text-lg font-medium">Start by adding a payment method</h3>
                    <p className="text-gray-700 mt-2">
                      Add a payment method to your Google Account to complete your purchase. Your payment information is visible only to Google.
                    </p>
                    <p className="font-medium text-gray-800 mt-4">acaleb888@gmail.com</p>
                    {/* Payment Options */}
                    <div className="flex flex-col gap-3 mt-6">
                      <div
                        onClick={handleMoMoPayment}
                        className="flex gap-4 items-center w-full py-4 border border-gray-300 rounded-lg px-3 cursor-pointer hover:bg-gray-100"
                      >
                        <div><FaMobileAlt className="text-blue-800 h-5 w-5" /></div>
                        <span>Mobile Money</span>
                      </div>
                      <div className="flex gap-4 items-center w-full py-4 border border-gray-300 rounded-lg px-3 cursor-not-allowed opacity-50">
                        <div><FaCreditCard className="text-blue-800 h-5 w-5" /></div>
                        <span>Credit or Debit Card</span>
                      </div>
                      <div className="flex gap-4 items-center w-full py-4 border border-gray-300 rounded-lg px-3 cursor-not-allowed opacity-50">
                        <div><FaPaypal className="text-blue-800 h-5 w-5" /></div>
                        <span>PayPal</span>
                      </div>
                    </div>
                  </div>
                </div>
                <motion.div
                  onClick={togglePaymentPop}
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