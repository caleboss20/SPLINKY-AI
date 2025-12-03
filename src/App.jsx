import "./index.css";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Chatwindow from "./Chatwindow";
import { useEffect, useRef, useState } from "react";
import Splashscreen from "./Splashscreen";
import ChatPage from "./ChatPage";
import { motion, AnimatePresence } from "framer-motion";
import {Route,Routes} from "react-router-dom"
import PremiumPage from "./PremiumPage";
import axios from "axios";

function App() {

   const [loading, setLoading] = useState(true);
  const [input, setInput] = useState("");
  const [changeIcon, setChangeIcon] = useState(false);
  const [showchatpage, setshowchatpage] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
 const scrollbarRef=useRef(null);
   const [messages, setMessages] = useState([
    { id: "1", sender: "user", message: "Hi how are you?" },
    { id: "2", sender: "chatbot", message: "Hi 👋 Caleb I'm doing well..." },
    {
      id: "3",
      sender: "user",
      message:
        "What is the salary of a React developer and how much will i be paid as a junior dev?",
    },
    {
      id: "4",
      sender: "chatbot",
      message:
        "The average salary of a React developer is $90,000 - $200,000. It may depend on location and experience.Developers in the united States could earn around an average of $144,000 according to glassdoor.",
    },
    {
      id: "5",
      sender: "user",
      message: "Oh I see so with typescript and React I could earn big?",
    },
    {
      id: "6",
      sender: "chatbot",
      message:
        "oh yeah so i am very happy to tell you you could earn very high,Caleb seeing how you are commited as a developer will command a very high pay in the long term ,so keep building and shipping projects.😄",
    },
    {
      id: "7",
      sender: "user",
      message:
        "Oh i see i really get you.I'm very passionate about programming and i will continue to build tirelessly no worries,thank you🤝",
    },
  ]);
  useEffect(()=>{
   const scrollingbar=scrollbarRef.current;
 if(scrollingbar){
  scrollingbar.scrollTop=scrollingbar.scrollHeight;
 }
  },[messages])





  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const [iconchange, setIconchange] = useState(false);
  const changeIconTop = () => {
    setIconchange(!iconchange);
  };

  const handleCheck = (e) => {
    const value = e.target.value;
    setInput(value);
    setChangeIcon(value.trim() !== "");
  };

  const handleClick = async() => {
    if (!input.trim()) {
      setshowchatpage(false);
    } else {
      setshowchatpage(true);
    }

     const userInput=input;

     setMessages((messages) => [
      ...messages,
      {
        id: crypto.randomUUID(),
        sender: "user",
        message: userInput,
        typing:false
      },
    ]);

    setInput("");
    
   setMessages((messages) => [
      ...messages,
      {
        id: "chatbot-typing",
        sender: "chatbot",
        message:"",
        typing:true,
      },
    ]);



    try{
      const res=await axios.post(
        "http://localhost:5000/api/chat",
       {
        prompt:userInput,
       }
      );



      const BotResponse={
       id:crypto.randomUUID(),
       sender:"chatbot",
       message:res.data.reply,
       typing:false
      }

      setMessages((prev)=>[
        ...prev.filter(msg=>msg.id!=="bot-typing"),
        BotResponse]);
      
    }
    catch(err){
      console.log(err);  
      setMessages((prev)=>[...prev.filter((msg)=>msg.id!=="chatbot-typing"),
        {
           id:crypto.randomUUID(),
           sender:"chatbot",
           message:"something went wrong.Try again.",
           typing:false
        }
      ])
    }
    











  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);
  if (loading) {
    return <Splashscreen />;
  }
  return (
    <>
      <Routes>
        <Route path="/"element={
           <div className={`flex h-screen w-screen overflow-x-hidden overflow-y-auto`}>
        {/* Desktop sidebar */}
        <aside className="w-64 h-screen overflow-y-auto bg-gray-50 border-r border-gray-200 text-white hidden md:block">
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        </aside>
        {/* Mobile sidebar with Framer Motion */}
        <AnimatePresence>
          {sidebarOpen && (
            <>
              {/* Overlay */}
              <motion.div
                className="fixed inset-0 md:hidden"
                style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
                onClick={toggleSidebar}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
              {/* Sliding sidebar */}
              <motion.div
                className={`fixed top-0 left-0 h-full ${
                  iconchange ? "w-full" : "w-78"
                } bg-gray-50 z-50 md:hidden`}
                initial={{ x: "-110%" }}
                animate={{ x: -5 }}
                exit={{ x: "-90%" }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              >
                <Sidebar
                  sidebarOpen={sidebarOpen}
                  setSidebarOpen={setSidebarOpen}
                  toggleSidebar={toggleSidebar}
                  changeIconTop={changeIconTop}
                  setIconchange={setIconchange}
                  iconchange={iconchange}
                />
              </motion.div>
            </>
          )}
        </AnimatePresence>
        {/* Main content */}
        <div 
         className={`flex flex-col flex-1`}>
          <header className="h-14 border-">
            <Navbar toggleSidebar={toggleSidebar} />
          </header>
          <div 
          className="bg-blu-500 flex flex-col flex-1">
            <main className={`flex-1 overflow-y-auto`}>
              {showchatpage ? (
                <ChatPage
                 scrollbarRef={scrollbarRef}
                  messages={messages}
                  setMessages={setMessages}
                  input={input}
                  setInput={setInput}
                  changeIcon={changeIcon}
                  handleCheck={handleCheck}
                  handleClick={handleClick}
                />
              ) : (
                <Chatwindow
                  messages={messages}
                  input={input}
                  setInput={setInput}
                  changeIcon={changeIcon}
                  setChangeIcon={setChangeIcon}
                  handleCheck={handleCheck}
                  handleClick={handleClick}
                  setshowchatpage={setshowchatpage}
                />
              )}
            </main>
            <footer className="h-20 border-">
              <Footer />
            </footer>
          </div>
        </div>
         </div>
        } />
        <Route path="/premium"element={<PremiumPage />} />
        </Routes> 
    </>
  );
}
export default App;
