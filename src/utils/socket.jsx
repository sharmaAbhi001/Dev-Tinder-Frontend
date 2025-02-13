import { io } from "socket.io-client";

export const createSocketConnection = async () => {
    try {
        const response = await fetch("https://devtinder-93gz.onrender.com/api/v1/auth/token", {
            method: "GET",
            credentials: "include", // ✅ Cookie Allow करने के लिए जरूरी
        });

        const data = await response.json();

        if (!data.token) {
            alert("❌ No token found! Authentication failed.");
            return null;
        }

        console.log("🔹 Token:", data.token);

        return io("https://devtinder-93gz.onrender.com", {
            auth: { token: data.token }, // ✅ Token भेजो
            withCredentials: true
        });

    } catch (error) {
        console.log("🚨 Error fetching token:", error);
       
        return null;
    }
};

