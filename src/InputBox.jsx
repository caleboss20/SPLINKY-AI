import {
  PlusIcon,
  MicrophoneIcon,
  ArrowUpIcon,
  CameraIcon,
  PhotoIcon,
  FolderIcon,
  LightBulbIcon,
  BookOpenIcon,
  CubeIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { motion } from "framer-motion";
function InputBox({
  handleCheck,
  handleClick,
  changeIcon,
  input,
  selectedImage,
  setselectedImage,
}) {
  const [openbox, setOpenBox] = useState(false);
  const handlePopup = () => {
    setOpenBox(false);
  };

  return (
    <>
      <div className="relative w-full pt-16">
        <div className="flex border gap-0 h-15 border-gray-300 pl-4 py-0 pr-8 rounded-full shadow-md md:w-140 border border-gray-300 pl-4 py-0 pr-2 rounded-full shadow-md md:flex items-center">
          {selectedImage && (
            <div className="absolute top-0 w-26 h-14 rounded-lg bg-y-500">
              <img
                src={selectedImage}
                className="relative rounded-lg object-cover h-14 w-full"
                alt=""
              />
              <button onClick={() => setselectedImage(null)}>
                <XMarkIcon className="absolute top-0 right-0 w-6 text-gray-900 h-6" />
              </button>
            </div>
          )}

          {openbox && (
            <>
              <div className=" z-[10000] p-6 fixed bottom-0 left-0 right-0 w-full h-[420px] bg-gray-700 rounded-lg ">
                <div className="flex gap-5 ">
                  <motion.div className="flex-col rounded-xl h-25 flex justify-center items-center flex-1 bg-gray-600">
                    <CameraIcon className="w-8 h-8 text-gray-900" />
                    <span>Camera</span>
                  </motion.div>

                  <div
                    onClick={() => document.getElementById("fileInput").click()}
                    className="flex-col rounded-xl h-25 flex justify-center items-center flex-1 bg-gray-600"
                  >
                    <input
                      type="file"
                      accept="image/*"
                      id="fileInput"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          setselectedImage(URL.createObjectURL(file));
                        }
                      }}
                    />
                    <PhotoIcon className="w-8 h-8 text-gray-900" />
                    <span>Photos</span>
                  </div>
                  <div className="flex-col rounded-xl h-25 flex justify-center items-center flex-1 bg-gray-600">
                    <FolderIcon className="w-8 h-8 text-gray-900" />
                    <span>Files</span>
                  </div>
                </div>
                <div className="w-full h-[0.06px] bg-gray-300 mt-7"></div>
                <div className="flex flex-col mt-8">
                  <div className="items-center gap-4 flex w-full py-3 bg-vioet-400">
                    <div className="">
                      <CubeIcon className="w-7 h-7 text-gray-900" />
                    </div>
                    <div>
                      <p className="text-lg text-black">Create image</p>
                      <span className=" text-gray-900">Visualize anything</span>
                    </div>
                  </div>
                  <div className="items-center gap-4 flex w-full py-3 bg-vioet-400">
                    <div className="">
                      <LightBulbIcon className="w-7 h-7 text-gray-900" />
                    </div>
                    <div>
                      <p className="text-lg text-black">Thinking </p>
                      <span className=" text-gray-900">
                        Think longer for better answers
                      </span>
                    </div>
                  </div>

                  <div className="items-center gap-4 flex w-full py-3 bg-vioet-400">
                    <div className="">
                      <BookOpenIcon className="w-7 h-7 text-gray-900" />
                    </div>
                    <div>
                      <p className="text-lg text-black">Study and learn</p>
                      <span className="text-gray-900">Learn a new concept</span>
                    </div>
                  </div>
                </div>
              </div>

              <motion.div
                onClick={handlePopup}
                className="fixed inset-0 z-[9999] md:hidden"
                style={{ backgroundColor: "rgba(0,0,0,0.1)" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            </>
          )}

          <div onClick={() => setOpenBox(!openbox)}>
            <PlusIcon className="w-5 h-5 text-white" />
          </div>
          <input
            value={input}
            onChange={handleCheck}
            className="
          
            flex-1 text-lg outline-none border-none rounded-lg px-4 py-4 text-white text-lg font-normal "
            placeholder="Ask Splinky"
            type="text"
          />

          <div className="flex gap-4 items-center mr-35 md:mr-4">
            {/* */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleClick}
              className="relative h-8 w-8 rounded-full flex items-center justify-center cursor-pointer"
            >
              {/* Animated glowing border */}
              <div className="absolute -inset-1 rounded-full animate-glow"></div>
              {/* Button background */}
              <div className="relative h-full w-full bg-violet-600 rounded-full flex items-center justify-center">
                {changeIcon ? (
                  <ArrowUpIcon className="w-4 h-4 text-white" />
                ) : (
                  <div className="h-8 w-8 rounded-full flex items-center justify-center gap-0.5">
                    <span className="w-0.5 h-2 bg-white rounded-sm"></span>
                    <span className="w-0.5 h-4 bg-white rounded-sm"></span>
                    <span className="w-0.5 h-2 bg-white rounded-sm"></span>
                    <span className="w-0.5 h-2 bg-white rounded-sm"></span>
                  </div>
                )}
              </div>
            </motion.div>
            <MicrophoneIcon className="w-5 h-5 text-gray-700 text-white" />
          </div>
        </div>
      </div>
    </>
  );
}
export default InputBox;
