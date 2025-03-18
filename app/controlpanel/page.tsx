"use client"
import React, { useState, useEffect } from 'react';

import Layout from '@/components/Layout';
import Fan from '@/components/Fan';
import WaterSpring from '@/components/WaterSpring';
import DigitalDisplay from '@/components/DigitalDisplay';
 

const Controlpanel: React.FC = () => {
  const [isNotificationOn, setNotificationOn] = useState(false);
  const [data, setData] = useState([
    { id: 1, temperature: 25.0, humidity: 80.0, fanOn: false, waterSprayOn: false, lastNotificationTime: Date.now() },
    { id: 2, temperature: 30.0, humidity: 70.0, fanOn: false, waterSprayOn: false, lastNotificationTime: Date.now() },
    { id: 3, temperature: 35.0, humidity: 60.0, fanOn: false, waterSprayOn: false, lastNotificationTime: Date.now() },
  ]);

  const sendTelegramNotification = async (message: string) => {
    try {
      await fetch("/api/sendNotification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
    } catch (error) {
      console.error("Error sending Telegram notification:", error);
    }
  };

  // Function to generate the message and handle the notification sending
  const generateMessage = (item: any, newTemperature: number, newHumidity: number) => {
    const fanOn = newTemperature >= 35;
    const waterSprayOn = newHumidity <= 50;

    const message = `🚨 ระบบควบคุมคอกที่: ${item.id}
                      🌡️ อุณหภูมิ: ${newTemperature.toFixed(1)}°C
                      💧 ความชื้นสัมพัทธ์: ${newHumidity.toFixed(1)}%
                      🌀 พัดลม: ${fanOn ? "เปิด ✅" : "ปิด ❌"}
                      💦 สเปย์พ่นน้ำ: ${waterSprayOn ? "เปิด ✅" : "ปิด ❌"}`;

    const timeElapsed = Date.now() - item.lastNotificationTime;
    if (isNotificationOn && timeElapsed >= 10000) {
      sendTelegramNotification(message);
      return Date.now(); // Return the new time for the last notification
    }
    return item.lastNotificationTime;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prevData) =>
        prevData.map((item) => {
          // Calculate the new temperature and humidity
          const newTemperature = item.temperature < 40 ? item.temperature + 0.1 : 25;
          const newHumidity = item.humidity > 40 ? item.humidity - 2 : 80;

          // Generate the message and handle the notification sending
          const newLastNotificationTime = generateMessage(item, newTemperature, newHumidity);

          // Return updated item with new temperature, humidity, and lastNotificationTime
          return {
            ...item,
            temperature: newTemperature,
            humidity: newHumidity,
            fanOn: newTemperature >= 35,
            waterSprayOn: newHumidity <= 50,
            lastNotificationTime: newLastNotificationTime, // Update last notification time
          };
        })
      );
    }, 2000);

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, [isNotificationOn]); // Only depend on `isNotificationOn` for the `useEffect`


  return (
    <Layout>
       <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        {data.map((item) => (
          <div
          key={item.id}
          style={{
            border: '2px solid blue', // Blue border
            padding: '20px', // Padding inside the border
            marginBottom: '40px', // Space between items
            borderRadius: '8px', // Optional rounded corners
            display: 'inline-block', // Fit to content
            maxWidth: '100%', // Prevent items from stretching beyond the container
            width: 'auto', // Fit to content width
            boxSizing: 'border-box', // Include padding and border in the width
          }}
        >
            <h1 style={{ fontSize: '2em' }}>ระบบควบคุมคอกที่ : {item.id}</h1> {/* Adjust text size here */}
            <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
              <DigitalDisplay
                label={`อุณหภูมิคอกที่ ${item.id}`}
                value={item.temperature}
                min={25}
                max={40}
                warningValue={35}
              />
              <DigitalDisplay
                label={`ความชื้นสัมพัทธ์คอกที่ ${item.id}`}
                value={item.humidity}
                min={40}
                max={100}
                warningValue={70}
              />
            </div>
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              <Fan name="พัดลม" temperature={item.temperature} humidity={item.humidity} />
              <WaterSpring name={'สเปย์พ่นน้ำ'} temperature={item.temperature} humidity={item.humidity} />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <span className="mr-4">🔔 ส่งการแจ้งเตือนไปยัง Telegram:</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={isNotificationOn}
            onChange={() => setNotificationOn(!isNotificationOn)}
          />
          <div
            className={`w-11 h-6 rounded-full transition-all duration-300 ${
              isNotificationOn ? "bg-green-600 peer-focus:ring-2 peer-focus:ring-green-400" : "bg-gray-300 border-2 border-red-500"
            }`}
          ></div>
          <span className={`ml-2 font-semibold ${isNotificationOn ? "text-blue-600" : "text-red-500"}`}>
            {isNotificationOn ? "ON" : "OFF"}
          </span>
        </label>
      </div>

      <div className="mt-6">
        <img src="/QR.jpg" alt="Scan for Telegram Result" className="w-40 h-40" />
        <p className="text-sm mt-2 text-gray-600">📲 Scan เพื่อรับการแจ้งเตือนผ่าน Telegram กลุ่ม</p>
      </div>

    </Layout>
  );
};

export default Controlpanel;
