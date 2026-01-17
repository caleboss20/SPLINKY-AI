import { ArrowLeftIcon, MinusIcon } from "@heroicons/react/24/outline";
import { CheckIcon } from "@heroicons/react/24/solid";
import { FaCreditCard, FaPaypal, FaMobileAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import mtn from "./assets/Images/mtn.jpg";
import mastercard from "./assets/Images/mastercard.jpg";
import paypal from "./assets/Images/paypal.png";
import visa from "./assets/Images/visa.png";
function PremiumPage() {
  const [paymentpop, setPaymentPop] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [paybuttonload, setPaybuttonload] = useState(false);
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
      setPaybuttonload(false);
      return;
    }
    const handler = window.PaystackPop.setup({
      key: "pk_test_b95228f8d0d6cde069d90ed18f9ddb17d1353674", // public test key
      email: "user@example.com", // replace with dynamic user email
      amount: 30000, // e.g., GH₵ 300 * 100 for kobo
      currency: "GHS",
      channels: ["mobile_money"],
      ref: `${Math.floor(Math.random() * 1000000000) + 1}`, // unique reference
      onClose: () => {
        alert("Payment cancelled");
        setPaybuttonload(false); // Reset button state on cancel
      },
      callback: function (response) {
        alert("Payment successful! Ref: " + response.reference);
        // TODO: update user subscription in Firestore or local storage
        setPaybuttonload(false); // Reset button state after success
        setSelectedMethod(null); // Clear selection
        togglePaymentPop(); // Close payment popup
      },
    });
    handler.openIframe();
  };
  const [methods, setMethods] = useState([
    {
      type: "mobile_money",
      name: "Mobile money",
      description: "Pay with Mobile money",
      image: mtn,
    },
    {
      type: "visa",
      name: "Visa",
      description: "Pay with Visa",
      image: visa,
    },
    {
      type: "paypal",
      name: "Paypal",
      description: "Pay with Paypal",
      image: paypal,
    },
  ]);
  const handlePayClick = () => {
    if (selectedMethod !== "mobile_money") return;
    setPaybuttonload(true);
    handleMoMoPayment();
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
                <div
                  key={index}
                  className="flex flex-col py-4 bg-rd-500 mt-0 mr-2"
                >
                  <div className="flex justify-between">
                    <h2 className="text-gray-600 font-medium text-[12px]">
                      {detail.features}
                    </h2>
                    <div className="flex gap-6">
                      <h2 className="text-gray-600 font-medium">
                        {detail.minus ? (
                          <MinusIcon className="w-5 h-5" />
                        ) : (
                          detail.category
                        )}
                      </h2>
                      <h2 className="text-violet-500 font-medium">
                        {detail.check ? (
                          <CheckIcon className="w-5 h-5 " />
                        ) : (
                          detail.upgrade
                        )}
                      </h2>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex flex-col items-center">
              <p className="font-medium text-sm text-gray-600">
                Restore subscription
              </p>
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
            {paymentpop && (
              <>
                <div
                  onClick={togglePaymentPop}
                  className="fixed inset-0 bg-black/50 md:hidden"
                ></div>
                <div className="rounded-t-2xl pt-3 z-50 fixed bottom-0 left-0 right-0 w-full h-[520px] bg-gray-50 md:hidden">
                  <div className="flex items-center justify-center">
                    <div className="w-10 h-1 bg-gray-300 rounded-xl"></div>
                  </div>
                  <h2 className="font-medium text-md p-6 mt-4">
                    Payment Method
                  </h2>
                  <div className="flex flex-col gap-6 pl-6 pr-6 mt-0">
                    {methods.map((method) => {
                      const isSelected = selectedMethod === method.type;
                      return (
                        <div
                          onClick={() => setSelectedMethod(method.type)}
                          key={method.name}
                          className={`${
                            isSelected
                              ? "border-1 border-green-500 bg-green-50"
                              : "border-1 border-transparent bg-white"
                          } px-4 py-3 flex items-center justify-between rounded-xl bg-[#ffffff] w-full`}
                        >
                          <div className="flex items-center gap-4">
                            <img
                              src={method.image}
                              className="w-12 h-11"
                              alt=""
                            />
                            <div className="flex flex-col">
                              <h2 className="font-medium text-sm text-gray-800">
                                {method.name}
                              </h2>
                              <span className="text-[13px] text-gray-700">
                                {method.description}
                              </span>
                            </div>
                          </div>
                          <div>
                            <input
                              onClick={() => setSelectedMethod(method.type)}
                              checked={isSelected}
                              type="checkbox"
                              className="accent-green-600 w-3.5 h-3.5 mr-3"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="p-6 mt-3">
                    <button
                      onClick={handlePayClick}
                      disabled={
                        selectedMethod !== "mobile_money" || paybuttonload
                      }
                      className={`w-full py-4 rounded-xl text-white font-medium flex items-center justify-center
                        ${
                          selectedMethod === "mobile_money" && !paybuttonload
                            ? "bg-green-700"
                            : "bg-gray-200 cursor-not-allowed"
                        }
                      `}
                    >
                      {paybuttonload ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <div className="ml-5">Authorizing payment...</div>
                        </>
                      ) : (
                        "Pay GHS 300.00"
                      )}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default PremiumPage;
