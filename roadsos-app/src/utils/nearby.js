/**
 * RoadSoS Nearby Services Utility
 * Fetches real-time emergency services (hospitals, police, etc.) from OpenStreetMap (Overpass API)
 */

export const NearbyUtility = {
  /**
   * Fetch emergency services near coordinates
   * @param {number} lat
   * @param {number} lng
   * @param {number} radiusInMeters
   */
  fetchNearby: async (lat, lng, radiusInMeters = 5000) => {
    // Overpass API Query for hospitals, police stations, and fire stations
    const query = `
      [out:json][timeout:25];
      (
        node["amenity"="hospital"](around:${radiusInMeters},${lat},${lng});
        way["amenity"="hospital"](around:${radiusInMeters},${lat},${lng});
        node["amenity"="police"](around:${radiusInMeters},${lat},${lng});
        way["amenity"="police"](around:${radiusInMeters},${lat},${lng});
        node["amenity"="fire_station"](around:${radiusInMeters},${lat},${lng});
        way["amenity"="fire_station"](around:${radiusInMeters},${lat},${lng});
        node["amenity"="pharmacy"](around:${radiusInMeters},${lat},${lng});
        way["amenity"="pharmacy"](around:${radiusInMeters},${lat},${lng});
        node["emergency"="ambulance_station"](around:${radiusInMeters},${lat},${lng});
        way["emergency"="ambulance_station"](around:${radiusInMeters},${lat},${lng});
        node["amenity"="car_repair"](around:${radiusInMeters},${lat},${lng});
        node["emergency"="rescue_station"](around:${radiusInMeters},${lat},${lng});
      );
      out body center;
    `;

    try {
      const response = await fetch("https://overpass-api.de/api/interpreter", {
        method: "POST",
        body: query,
      });

      if (!response.ok) throw new Error("Failed to fetch nearby data");

      const data = await response.json();

      return data.elements
        .map((el) => {
          const name =
            el.tags.name || el.tags["name:en"] || "Emergency Facility";

          let type = "Emergency";
          if (el.tags.amenity === "police") type = "Police";
          else if (el.tags.amenity === "hospital") type = "Hospital";
          else if (el.tags.amenity === "fire_station") type = "Fire Station";
          else if (el.tags.amenity === "pharmacy") type = "Pharmacy";
          else if (el.tags.emergency === "ambulance_station")
            type = "Ambulance";
          else if (
            el.tags.amenity === "car_repair" ||
            el.tags.emergency === "rescue_station"
          )
            type = "Vehicle Rescue";

          // Calculate direct distance
          const distance = NearbyUtility.calculateDistance(
            lat,
            lng,
            el.center?.lat || el.lat,
            el.center?.lon || el.lon,
          );

          return {
            id: el.id,
            name: name,
            type: type,
            lat: el.center?.lat || el.lat,
            lng: el.center?.lon || el.lon,
            distance: distance.toFixed(1),
            address:
              el.tags["addr:full"] || el.tags["addr:street"] || "Nearby area",
            status: "Open 24/7",
            phone: el.tags.phone || el.tags["contact:phone"] || "Unavailable",
          };
        })
        .sort((a, b) => a.distance - b.distance);
    } catch (error) {
      console.error("Nearby Fetch Error:", error);
      return [];
    }
  },

  /**
   * DSA: Spatial Clustering Algorithm (Grid-based Indexing)
   * Prevents UI clutter by grouping very close facilities.
   */
  clusterServices: (services, zoomLevel = 15) => {
    const clusters = [];
    const radius = 0.5 / (zoomLevel / 10); // Simple grid size calculation

    services.forEach((service) => {
      let addedToCluster = false;
      for (let cluster of clusters) {
        const dist = NearbyUtility.calculateDistance(
          service.lat,
          service.lng,
          cluster.lat,
          cluster.lng,
        );
        if (dist < radius) {
          cluster.members.push(service);
          addedToCluster = true;
          break;
        }
      }
      if (!addedToCluster) {
        clusters.push({
          lat: service.lat,
          lng: service.lng,
          members: [service],
          type: service.type,
        });
      }
    });
    return clusters;
  },

  /**
   * DSA: Priority Dispatch Queue
   * Ranks responders based on a multi-variable emergency score.
   */
  getPriorityResponders: (services) => {
    return [...services].sort((a, b) => {
      const scoreA =
        (1 / parseFloat(a.distance)) * (a.type === "Hospital" ? 2 : 1);
      const scoreB =
        (1 / parseFloat(b.distance)) * (b.type === "Hospital" ? 2 : 1);
      return scoreB - scoreA;
    });
  },

  /**
   * Haversine formula for distance
   */
  calculateDistance: (lat1, lon1, lat2, lon2) => {
    const R = 6371; // km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  },
};
