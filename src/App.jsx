import "./index.css";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Chatwindow from "./Chatwindow";
import { useEffect, useRef, useState } from "react";
import Splashscreen from "./Splashscreen";
import ChatPage from "./ChatPage";
import { motion, AnimatePresence } from "framer-motion";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import PremiumPage from "./PremiumPage";
import axios from "axios";
import Settings from "./Settings";
import Login from "./Login";
import SignUp from "./SignUp";

function App() {
  // Fake user array with Caleb
  const [users,setUsers] = useState([
    { name: "Caleb", email: "caleboss@gmail.com", password: "Caleb" },
    // you can add more fake users here
  ]);

  const [selectedImage, setselectedImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState("");
  const [changeIcon, setChangeIcon] = useState(false);
  const [showChatPage, setShowChatPage] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const scrollbarRef = useRef(null);
  const [chats, setChats] = useState([
    { id: crypto.randomUUID(), title: "", messages: [] },

    { id: crypto.randomUUID(), title: "", messages: [] },

    { id: crypto.randomUUID(), title: "", messages: [] },
  ]);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [iconchange, setIconchange] = useState(false);

  const selectedChat = chats.find((chat) => chat.id === selectedChatId);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const changeIconTop = () => setIconchange(!iconchange);
 
  const handleCheck = (e) => {
    const value = e.target.value;
    setInput(value);
    setChangeIcon(value.trim() !== "");
  };


  //handle a new chat clicked//
  const handleNewChat=()=>{
    const addchat={
      id:crypto.randomUUID(),
      title:"",
      messages:[]
    }
    setChats((prev)=>[addchat,...prev]);
    setSelectedChatId(addchat.id);
    setShowChatPage(true);
  }

   //deleting all chats//
  const deletechats=()=>{
    const copychat=[...chats];
    copychat.splice(copychat,copychat.length);
    setChats(copychat);
    
  }
   
 const handleClick = async () => {
  // 1️⃣ Do nothing if no input and no image



  if (!input.trim() && !selectedImage) return;


 const summarizeMessage = (text) => {
      if (!text) return "New Chat";
      // Lowercase & remove punctuation
      const cleanText = text.toLowerCase().replace(/[^\w\s]/g, "");
      // Split into words
      const words = cleanText.split(/\s+/);
      // Stopwords / filler words for professionals
      const stopwords = new Set([
        "the",
        "is",
        "in",
        "at",
        "of",
        "a",
        "an",
        "and",
        "or",
        "to",
        "can",
        "you",
        "i",
        "it",
        "for",
        "on",
        "with",
        "that",
        "this",
        "are",
        "be",
        "as",
        "by",
        "from",
        "please",
        "hey",
        "hi",
        "charlie",
        "mr",
        "mrs",
        "have",
        "been",
      ]);
      // Filter out stopwords
      const keywords = words.filter((word) => !stopwords.has(word));
      // Optional: pick top 5 keywords (or all if shorter)
      const summary = keywords.slice(0, 5).join(" ");
      // Capitalize first letter
      return summary.charAt(0).toUpperCase() + summary.slice(1);
    };




  // 2️⃣ Ensure a chat exists


  let chatId = selectedChatId;
  if (!chatId) {
    const newChat = {
      id: crypto.randomUUID(),
      title: "New Chat",
      messages: []
    };
    setChats(prev => [newChat,...prev ]); // add to chats
    setSelectedChatId(newChat.id);       // select it
    chatId = newChat.id;                 // use immediately
  }

  // 3️⃣ Show the chat page
  setShowChatPage(true);


  // 4️⃣ Add user message
  const userMessage = {
    id: crypto.randomUUID(),
    sender: "user",
    message: input,
    image: selectedImage || null,
    typing: false
  };
  setChats(prevChats =>
    prevChats.map(chat =>
      chat.id === chatId
        ? {
            ...chat,
            messages: [...chat.messages, userMessage],
            title: summarizeMessage(input) // optional: update title dynamically
          }
        : chat
    )
  );
  // 5️⃣ Reset input & image
  setInput("");
  setselectedImage(null);
  // 6️⃣ Add typing indicator for bot
  setChats(prevChats =>
    prevChats.map(chat =>
      chat.id === chatId
        ? {
            ...chat,
            messages: [...chat.messages, { id: "chatbot-typing", sender: "chatbot", message: "", typing: true }]
          }
        : chat
    )
  );
  // 7️⃣ Call API to get bot response
  try {
    const res = await axios.post("http://localhost:5000/api/chat", { prompt: userMessage.message });
    const botResponse = {
      id: crypto.randomUUID(),
      sender: "chatbot",
      message: res.data.reply,
      typing: false
    };
    // Replace typing indicator with actual response
    setChats(prevChats =>
      prevChats.map(chat =>
        chat.id === chatId
          ? { ...chat, messages: chat.messages.filter(m => m.id !== "chatbot-typing").concat(botResponse) }
          : chat
      )
    );
  } catch (err) {
    console.log(err);
    // fallback message if API fails
    setChats(prevChats =>
      prevChats.map(chat =>
        chat.id === chatId
          ? { ...chat, messages: chat.messages.filter(m => m.id !== "chatbot-typing").concat({
              id: crypto.randomUUID(),
              sender: "chatbot",
              message: "Hi Caleb👋, how are you feeling today?",
              typing: false
            }) }
          : chat
      )
    );
  }
};

  // Splashscreen
  const navigate=useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 5000);
     navigate("/login");
    return () => clearTimeout(timer);
  }, []);
  // Dark mode

  if (loading) return <Splashscreen />;
  return (
    <div className="w-full  ">
      <Routes>
        <Route
          path="/"
          element={
            <div className="bg-gray-900 flex h-screen w-screen overflow-x-hidden overflow-y-auto">
              {/* Desktop sidebar */}
              <aside className=" hidden w-64 h-screen overflow-y-auto border-r border-gray-200  md:flex">
                <Sidebar
                  chats={chats}
                  setSelectedChatId={setSelectedChatId}
                  selectedChatId={selectedChatId}
                  setShowChatPage={setShowChatPage}
                  showChatPage={showChatPage}
                  sidebarOpen={sidebarOpen}
                  setSidebarOpen={setSidebarOpen}
                   handleNewChat={handleNewChat}
                   deletechats={deletechats}
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
                      } bg-gray-900 z-50 md:hidden`}
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
                        showChatPage={showChatPage}
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                        changeIconTop={changeIconTop}
                        setIconchange={setIconchange}
                        iconchange={iconchange}
                        handleNewChat={handleNewChat}
                       deletechats={deletechats}
                      />
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
              {/* Main content */}
              <div className="flex flex-col flex-1">
                <header className="h-14 bg-gray-800 ">
                  <Navbar toggleSidebar={toggleSidebar} />
                </header>
                <div className="flex flex-col flex-1">
                  <main className="flex-1 overflow-y-auto bg-gray-900">
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
        <Route path="/settings" element={<Settings />} />
        <Route path="/login" element={<Login users={users} />} />
         <Route path="/signup" element={<SignUp users={users} setUsers={setUsers}/>} />
      </Routes>
    </div>
  );
}
export default App;
