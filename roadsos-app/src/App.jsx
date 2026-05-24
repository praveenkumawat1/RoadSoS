
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

import "./App.css";

export default function App() {
  const navigate = useNavigate();

  const onGoSOS = () => navigate("/sos");


  return (
    <Routes>
      {/* Shared layout */}
      <Route element={<AppLayout onNavigateSOS={onGoSOS} />}>
        {/* Start with SOS, allow skipping to Home */}
        <Route path="/" element={<SOSPage navigate={navigate} />} />
        <Route path="/home" element={<HomePage onGoSOS={onGoSOS} />} />
        <Route path="/sos" element={<SOSPage navigate={navigate} />} />



        <Route path="/services" element={<ServicesPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/about" element={<AboutPage />} />

        <Route path="/hospitals" element={<HospitalsPage />} />
        <Route path="/ambulance" element={<AmbulancePage />} />
        <Route path="/police" element={<PolicePage />} />


        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

