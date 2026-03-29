import axios from "axios";

// Get or create device ID
export function getDeviceId() {
    let deviceId = localStorage.getItem("device_id");

    if (!deviceId) {
        deviceId = crypto.randomUUID();
        localStorage.setItem("device_id", deviceId);
    }

    return deviceId;
}

// Get or create user from backend
export async function getOrCreateUser() {
    try {
        const deviceId = getDeviceId();

        const response = await axios.post("/api/users", {
            device_id: deviceId,
        });

        return response.data;
    } catch (error) {
        console.error("Error getting/creating user:", error.response?.data || error.message);
        throw error;
    }
}