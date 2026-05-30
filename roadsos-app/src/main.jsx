import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";

// Register the PWA service worker to enable offline capability
import { registerSW } from "virtual:pwa-register";

const updateSW = registerSW({
  onOfflineReady() {
    console.log("App is ready to work offline");
    try {
      window.dispatchEvent(new CustomEvent("app-offline-ready"));
    } catch (e) {}
  },
  onNeedRefresh() {
    console.log("Service worker update available");
    try {
      window.__updateSW = updateSW;
      window.dispatchEvent(new CustomEvent("app-update-available"));
    } catch (e) {}
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
