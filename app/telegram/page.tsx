"use client";

import React, { useState } from "react";
import Layout from "@/components/Layout";

const TelegramPage: React.FC = () => {
  const [isNotificationOn, setNotificationOn] = useState(false);

  const sendTelegramNotification = async () => {
    try {
      const response = await fetch("/api/sendNotification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: "🔔 Notification turned ON from Next.js app!" }),
      });

      const data = await response.json();
      if (!data.success) throw new Error(data.error);

      console.log("Notification sent:", data);
    } catch (error) {
      console.error("Error sending Telegram notification:", error);
    }
  };

  const handleToggle = () => {
    const newState = !isNotificationOn;
    setNotificationOn(newState);

    if (newState) {
      sendTelegramNotification();
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold">Telegram Notifications</h1>
      <div className="mt-4 flex items-center">
        <span className="mr-4">Send Notification:</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={isNotificationOn}
            onChange={handleToggle}
          />
          <div className="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-blue-600 peer-focus:ring-2 peer-focus:ring-blue-400"></div>
        </label>
      </div>
    </Layout>
  );
};

export default TelegramPage;
