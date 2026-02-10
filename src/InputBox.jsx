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
        <div className="flex border gap-0 h-15 border-gray-300 pl-3 py-0 pr-8 rounded-full shadow-md md:w-140 border border-gray-300 pl-4 py-0 pr-2 rounded-full shadow-md md:flex items-center">
          {selectedImage && (
            <div className="absolute top-0 w-26 h-14 rounded-lg bg-y-500">
              <img
                src={selectedImage}
                className="relative rounded-lg object-cover h-14 w-full"
                alt=""
              />
              <button onClick={() => setselectedImage(null)}>
                <XMarkIcon className="absolute top-0 right-0.5 w-5 text-white h-6" />
              </button>
            </div>
          )}

          {openbox && (
            <>
              <div className=" z-[10000] p-6 fixed bottom-20 left-5 right-10 h-[320px] bg-white rounded-2xl ">
                <div className="flex gap-5 flex-col overflow-x">
                  <div className="flex flex-col gap-8">
                    <div
                      onClick={() =>
                        document.getElementById("fileInput").click()
                      }
                      className="flex gap-3 rounded-xl h-22 flex items-center flex-1 "
                    >
                      <input
                        type="file"
                        accept="image/*"
                        id="fileInput"
                        className="hidden text-black"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            setselectedImage(URL.createObjectURL(file));
                          }
                        }}
                      />
                      <div className="py-2 px-2 bg-gray-100 rounded-full">
                        <PhotoIcon className="w-6 h-6 text-gray-900" />
                      </div>

                      <span className="text-md">Photos</span>
                    </div>

                    <div
                      onClick={() =>
                        document.getElementById("fileInput").click()
                      }
                      className="flex gap-3 rounded-xl h-22 flex items-center flex-1 "
                    >
                      <input
                        type="file"
                        accept="image/*"
                        id="fileInput"
                        className="hidden text-black"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            setselectedImage(URL.createObjectURL(file));
                          }
                        }}
                      />
                      <div className="py-2 px-2 bg-gray-100 rounded-full">
                        <CameraIcon className="w-6 h-6 text-gray-900" />
                      </div>

                      <span>Camera</span>
                    </div>

                    <div
                      onClick={() =>
                        document.getElementById("fileInput").click()
                      }
                      className="flex gap-3 rounded-xl h-22 flex items-center flex-1 "
                    >
                      <input
                        type="file"
                        accept="image/*"
                        id="fileInput"
                        className="hidden text-black"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            setselectedImage(URL.createObjectURL(file));
                          }
                        }}
                      />
                      <div className="py-2 px-2 bg-gray-100 rounded-full">
                        <FolderIcon className="w-6 h-6 text-gray-900" />
                      </div>

                      <span>Files</span>
                    </div>

                    <div className="flex gap-3 rounded-xl h-22 flex items-center flex-1 ">
                      <div className="py-2 px-2 bg-gray-100 rounded-full">
                        <LightBulbIcon className="w-6 h-6 text-gray-900" />
                      </div>

                      <span>Thinking</span>
                    </div>
                  </div>
                </div>
              </div>

              <motion.div
                onClick={handlePopup}
                className="fixed inset-0 z-[9999] md:hidden"
                style={{ backgroundColor: "rgba(0,0,0,0.03)" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            </>
          )}

          <div onClick={() => setOpenBox(!openbox)}>
            <PlusIcon className="w-5 h-5 text-black" />
          </div>
          <input
            value={input}
            onChange={handleCheck}
            className="
          
             text-md outline-none w-50 rounded-lg px-4 py-4 text-black text-lg font-normal "
            placeholder="Ask Geni"
            type="text"
          />

          <div className="flex-1 flex gap-6 items-center mr-35 md:mr-4">
            {/* */}
            <MicrophoneIcon className="w-5 h-5 text-gray-700 text-black" />
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleClick}
              className="relative h-8 w-8 rounded-full flex items-center justify-center cursor-pointer"
            >
              {/* Animated glowing border */}
              <div className="absolute -inset-1 rounded-full animate-glow"></div>
              {/* Button background */}
              <div className="relative h-full w-full bg-gray-800 rounded-full flex items-center justify-center">
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
          </div>
        </div>
      </div>
    </>
  );
}
export default InputBox;
