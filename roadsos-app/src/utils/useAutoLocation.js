import { useState, useEffect } from "react";
import { LocationUtility } from "./location";
import { SessionManager } from "./session";

export function useAutoLocation() {
  const [coords, setCoords] = useState(SessionManager.getLastLocation());
  const [address, setAddress] = useState("Locating...");
  const [locationData, setLocationData] = useState({
    full: "Locating...",
    city: "",
    state: "",
    pincode: "",
    suburb: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const detect = async () => {
      setLoading(true);
      try {
        const pos = await LocationUtility.getCurrentLocation();
        const newCoords = {
          lat: pos.lat,
          lng: pos.lng,
        };
        setCoords(newCoords);
        SessionManager.saveLastLocation(newCoords);

        const data = await LocationUtility.getAddress(pos.lat, pos.lng);
        setAddress(data.full);
        setLocationData(data);
      } catch (err) {
        setError(err.message);
        setAddress("Location Access Denied");
      } finally {
        setLoading(false);
      }
    };

    detect();
  }, []);

  return {
    coords,
    address,
    locationData,
    loading,
    error,
  };
}
