import { Routes, Route, useNavigate } from "react-router-dom";
import AppLayout from "./components/AppLayout";

import SOSPage from "./pages/SOSPage";

import ServicesPage from "./pages/ServicesPage";

import HowItWorksPage from "./pages/HowItWorksPage";
import AboutPage from "./pages/AboutPage";
import HospitalsPage from "./pages/HospitalsPage";
import AmbulancePage from "./pages/AmbulancePage";
import PolicePage from "./pages/PolicePage";
import NotFoundPage from "./pages/NotFoundPage";
import HomePage from "./pages/HomePage";
import LifeSavingPage from "./pages/LifeSavingPage";
import LifeSavingDetail from "./pages/LifeSavingDetail";

import "./App.css";

export default function App() {
  const navigate = useNavigate();

  const onGoSOS = () => navigate("/sos");

  return (
    <Routes>
      {/* Ensure direct navigation to /survival-kit always resolves with layout */}
      <Route
        path="/survival-kit"
        element={<AppLayout onNavigateSOS={onGoSOS} />}
      >
        <Route index element={<LifeSavingPage />} />
      </Route>
      {/* Full screen pages (No Navbar/Footer) */}
      <Route path="/sos" element={<SOSPage />} />

      {/* Shared layout (With Navbar/Footer) */}
      <Route element={<AppLayout onNavigateSOS={onGoSOS} />}>
        <Route path="/" element={<HomePage onGoSOS={onGoSOS} />} />
        <Route path="/home" element={<HomePage onGoSOS={onGoSOS} />} />

        <Route path="/services" element={<ServicesPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/survival-kit" element={<LifeSavingPage />} />
        <Route path="/survival-kit/:id" element={<LifeSavingDetail />} />

        <Route path="/hospitals" element={<HospitalsPage />} />
        <Route path="/ambulance" element={<AmbulancePage />} />
        <Route path="/police" element={<PolicePage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
