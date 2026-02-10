import { 
  signInWithPopup, 
  signInWithRedirect,
  signOut, 
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence
} from "firebase/auth";
import { auth, googleProvider } from "./firebase";

/**
 * Sign in with Google using popup
 * @returns {Promise<UserCredential>}
 */
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    console.log("User signed in:", result.user);
    return result;
  } catch (error) {
    console.error("Error signing in with Google:", error);
    throw error;
  }
};

/**
 * Sign in with Google using redirect (better for mobile)
 * @returns {Promise<void>}
 */
export const signInWithGoogleRedirect = async () => {
  try {
    await signInWithRedirect(auth, googleProvider);
  } catch (error) {
    console.error("Error signing in with Google redirect:", error);
    throw error;
  }
};

/**
 * Sign out the current user
 * @returns {Promise<void>}
 */
export const logOut = async () => {
  try {
    await signOut(auth);
    console.log("User signed out");
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
};

/**
 * Set authentication persistence
 * @param {string} type - "local" or "session"
 * @returns {Promise<void>}
 */
export const setAuthPersistence = async (type = "local") => {
  try {
    const persistence = type === "local" 
      ? browserLocalPersistence 
      : browserSessionPersistence;
    await setPersistence(auth, persistence);
  } catch (error) {
    console.error("Error setting persistence:", error);
    throw error;
  }
};

/**
 * Subscribe to authentication state changes
 * @param {Function} callback - Function to call when auth state changes
 * @returns {Function} Unsubscribe function
 */
export const onAuthChange = (callback) => {
  return onAuthStateChanged(auth, (user) => {
    callback(user);
  });
};

/**
 * Get current user
 * @returns {User|null}
 */
export const getCurrentUser = () => {
  return auth.currentUser;
};

/**
 * Check if user is authenticated
 * @returns {boolean}
 */
export const isAuthenticated = () => {
  return auth.currentUser !== null;
};