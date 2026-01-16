
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCScogx5qt_MZSxUL01qr_LIBX2iGY-dBc",
  authDomain: "geniai-24dec.firebaseapp.com",
  projectId: "geniai-24dec",
  storageBucket: "geniai-24dec.firebasestorage.app",
  messagingSenderId: "816510957737",
  appId: "1:816510957737:web:d7c3086f1e3bd96d6a51b8",
  measurementId: "G-LFCBZNZ97L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);