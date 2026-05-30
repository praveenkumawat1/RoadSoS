import Dexie from "dexie";

export const db = new Dexie("RoadSOS_OfflineDB");
db.version(1).stores({
  alerts: "++id, type, status, coords, timestamp",
  systemLogs: "++id, action, timestamp",
});

// Helper to save alert offline
export const saveAlertOffline = async (data) => {
  return await db.alerts.add({
    ...data,
    status: "stored_locally",
    timestamp: new Date().toISOString(),
  });
};

// Helper to get all alerts
export const getLocalAlerts = async () => {
  return await db.alerts.toArray();
};

export const updateLocalAlertStatus = async (id, status) => {
  return await db.alerts.update(id, { status });
};
