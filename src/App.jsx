import "./index.css";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Chatwindow from "./Chatwindow";
import { useEffect, useRef, useState } from "react";
import Splashscreen from "./Splashscreen";
import ChatPage from "./ChatPage";
import { motion, AnimatePresence } from "framer-motion";
import { Route, Routes } from "react-router-dom";
import PremiumPage from "./PremiumPage";
import axios from "axios";
function App() {
  const [darkMode, setDarkmode] = useState(false);
  const [selectedImage, setselectedImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState("");
  const [changeIcon, setChangeIcon] = useState(false);
  const [showChatPage, setShowChatPage] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const scrollbarRef = useRef(null);
  const [chats, setChats] = useState([
    { id: crypto.randomUUID(),
       title: "chat1", messages: [] 
      },
       { id: crypto.randomUUID(),
       title: "chat2", messages: [] 
      },
       { id: crypto.randomUUID(),
       title: "chat3", messages: [] 
      },
  ]);


  const [selectedChatId, setSelectedChatId] = useState(chats[0].id);
  const selectedChat = chats.find((chat) => chat.id === selectedChatId);
  useEffect(() => {
    const scrollingbar = scrollbarRef.current;
    if (scrollingbar) scrollingbar.scrollTop = scrollingbar.scrollHeight;
  }, [selectedChat?.messages]);

  const toggleSidebar = () =>
     setSidebarOpen(!sidebarOpen);

  const [iconchange, setIconchange] = useState(false);
  const changeIconTop = () =>
  setIconchange(!iconchange);

  const handleCheck = (e) => {
    const value = e.target.value;
    setInput(value);
    setChangeIcon(value.trim() !== "");
  };

  const handleClick = async () => {
    if (!input.trim() && !selectedImage) return;
    setShowChatPage(true);
    const userInput = input;
    // Add user message to the selected chat
    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === selectedChatId? {
              ...chat,
              messages: [
                ...chat.messages,
                {
                  id: crypto.randomUUID(),
                  sender: "user",
                  message: userInput,
                  image: selectedImage || null,
                  typing: false,
                },
              ],
            }
          : chat
      )
    );
    setInput("");
    setselectedImage(null);
    // Add typing indicator
    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === selectedChatId
          ? {
              ...chat,
              messages: [
                ...chat.messages,
                {
                  id: "chatbot-typing",
                  sender: "chatbot",
                  message: "",
                  typing: true,
                },
              ],
            }
          : chat
      )
    );
    try {
      const res = await axios.post("http://localhost:5000/api/chat", {
        prompt: userInput,
      });
      const botResponse = {
        id: crypto.randomUUID(),
        sender: "chatbot",
        message: res.data.reply,
        typing: false,
      };
      // Replace typing indicator with actual response
      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat.id === selectedChatId
            ? {
                ...chat,
                messages: chat.messages
                  .filter((m) => m.id !== "chatbot-typing")
                  .concat(botResponse),
              }
            : chat
        )
      );
    } catch (err) {
      console.log(err);
      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat.id === selectedChatId
            ? {
                ...chat,
                messages: chat.messages
                  .filter((m) => m.id !== "chatbot-typing")
                  .concat({
                    id: crypto.randomUUID(),
                    sender: "chatbot",
                    message: "Something went wrong. Try again.",
                    typing: false,
                  }),
              }
            : chat
        )
      );
    }
  };
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [darkMode]);

  if (loading) return <Splashscreen />;

  return (
    <div className="w-full h-full bg-white dark:bg-black">
      <Routes>
        <Route
          path="/"
          element={
            <div className="flex h-screen w-screen overflow-x-hidden overflow-y-auto">
              {/* Desktop sidebar */}
              <aside className="hidden w-64 h-screen overflow-y-auto bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 md:flex">
                <Sidebar
                  chats={chats}
                  setSelectedChatId={setSelectedChatId}
                  selectedChatId={selectedChatId}
                  setShowChatPage={setShowChatPage}
                  sidebarOpen={sidebarOpen}
                  setSidebarOpen={setSidebarOpen}
                  setDarkmode={setDarkmode}
                  darkMode={darkMode}
                />
              </aside>
              {/* Mobile sidebar */}
              <AnimatePresence>
                {sidebarOpen && (
                  <>
                    <motion.div
                      className="fixed inset-0 md:hidden"
                      style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
                      onClick={toggleSidebar}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    />
                    <motion.div
                      className={`fixed top-0 left-0 h-full ${
                        iconchange ? "w-full" : "w-78"
                      } bg-gray-50 dark:bg-gray-900 z-50 md:hidden`}
                      initial={{ x: "-40%" }}
                      animate={{ x: 0 }}
                      exit={{ x: "-100%" }}
                      transition={{
                        type: "spring",
                        stiffness: 100,
                        damping: 10,
                      }}
                    >
                      <Sidebar
                        chats={chats}
                        setSelectedChatId={setSelectedChatId}
                        selectedChatId={selectedChatId}
                        setShowChatPage={setShowChatPage}
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                        setDarkmode={setDarkmode}
                        darkMode={darkMode}
                        changeIconTop={changeIconTop}
                        setIconchange={setIconchange}
                        iconchange={iconchange}
                      />
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
              {/* Main content */}
              <div className="flex flex-col flex-1">
                <header className="h-14 bg-white dark:bg-gray-800">
                  <Navbar toggleSidebar={toggleSidebar} />
                </header>
                <div className="bg-blu-500 flex flex-col flex-1">
                  <main className="flex-1 overflow-y-auto bg-white dark:bg-black">
                    {showChatPage ? (
                      <ChatPage
                        scrollbarRef={scrollbarRef}
                        selectedChat={selectedChat}
                        handleClick={handleClick}
                        handleCheck={handleCheck}
                        changeIcon={changeIcon}
                        input={input}
                        setInput={setInput}
                        selectedChatId={selectedChatId}
                        setChats={setChats}
                        selectedImage={selectedImage}
                        setselectedImage={setselectedImage}
                      />
                    ) : (
                      <Chatwindow
                        input={input}
                        setInput={setInput}
                        handleClick={handleClick}
                        handleCheck={handleCheck}
                        changeIcon={changeIcon}
                        setChangeIcon={setChangeIcon}
                        setShowChatPage={setShowChatPage}
                        selectedImage={selectedImage}
                        setselectedImage={setselectedImage}
                      />
                    )}
                  </main>
                  <footer className="h-20 bg-white dark:bg-gray-800">
                    <Footer />
                  </footer>
                </div>
              </div>
            </div>
          }
        />
        <Route path="/premium" element={<PremiumPage />} />
      </Routes>
    </div>
  );
}
export default App;
