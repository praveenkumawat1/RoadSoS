import Cookies from "js-cookie";

/**
 * RoadSoS Session & Cookie Utility
 * Handles persistent user data and short-term session states.
 */

const SESSION_KEY = "roadsos_session_token";
const USER_PREFS_KEY = "roadsos_user_prefs";

export const SessionManager = {
  // --- Cookie Management ---

  /**
   * Set a session cookie that expires in 24 hours
   */
  setSession: (token) => {
    Cookies.set(SESSION_KEY, token, {
      expires: 1,
      secure: true,
      sameSite: "strict",
    });
  },

  /**
   * Get the current session token
   */
  getSession: () => {
    return Cookies.get(SESSION_KEY);
  },

  /**
   * Remove the session cookie
   */
  clearSession: () => {
    Cookies.remove(SESSION_KEY);
  },

  // --- Cookie-based Preferences ---

  /**
   * Set a cookie that lasts 365 days
   */
  setPersistentCookie: (key, value) => {
    Cookies.set(key, value, { expires: 365 });
  },

  getCookie: (key) => {
    return Cookies.get(key);
  },

  // --- Location Management ---
  saveLastLocation: (coords) => {
    localStorage.setItem("roadsos_last_loc", JSON.stringify(coords));
  },

  getLastLocation: () => {
    const loc = localStorage.getItem("roadsos_last_loc");
    const data = loc ? JSON.parse(loc) : { lat: 28.6139, lng: 77.209 }; // Default to Delhi (Numbers)
    return {
      lat: parseFloat(data.lat),
      lng: parseFloat(data.lng),
    };
  },

  // --- Session Storage (Short-term) ---

  setTempData: (key, value) => {
    sessionStorage.setItem(key, JSON.stringify(value));
  },

  getTempData: (key) => {
    const data = sessionStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  },

  // --- Local Storage (Long-term) ---

  setUserData: (data) => {
    localStorage.setItem(USER_PREFS_KEY, JSON.stringify(data));
  },

  getUserData: () => {
    const data = localStorage.getItem(USER_PREFS_KEY);
    return data ? JSON.parse(data) : null;
  },
};
