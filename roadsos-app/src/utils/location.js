/**
 * Utility for handling browser Geolocation and reverse geocoding
 */

export const LocationUtility = {
  /**
   * Get current coordinates using Browser Geolocation API
   */
  getCurrentLocation: () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation is not supported by your browser"));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            accuracy: position.coords.accuracy,
            timestamp: position.timestamp,
          });
        },
        (error) => {
          let msg = "Location access denied";
          if (error.code === 2) msg = "Locating failed (GPS signal weak)";
          if (error.code === 3) msg = "Locating timed out";
          reject(new Error(msg));
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 0,
        },
      );
    });
  },

  /**
   * Reverse Geocoding using Nominatim (Free/Offline-Friendly if using local tiles)
   * This is a simple online version.
   */
  getAddress: async (lat, lng) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
      );
      const data = await response.json();
      return {
        full: data.display_name,
        city:
          data.address.city || data.address.town || data.address.village || "",
        state: data.address.state || "",
        pincode: data.address.postcode || "N/A",
        suburb: data.address.suburb || data.address.neighbourhood || "",
      };
    } catch (error) {
      return {
        full: "Address unknown (Offline mode)",
        city: "Offline",
        state: "Offline",
        pincode: "N/A",
        suburb: "N/A",
      };
    }
  },
};
