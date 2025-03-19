"use client";

import React ,{ useState } from 'react';
import Layout from '@/components/Layout';
import LineChart from '@/components/LineChart';
import LineChartTemp from '@/components/LineChartTemp';
import LineChartHumi from '@/components/LineChartHumi';
import '../chartConfig'; // Import the registration file

const Environment = () => {
  // Function to generate time labels from 4PM yesterday to 3PM today
  const generateTimeLabels = () => {
    const labels = [];
    const currentHour = new Date().getHours();
    for (let i = 0; i < 24; i++) {
      const time = new Date();
      time.setHours(currentHour + i - 23); // Start from 4PM yesterday
      time.setMinutes(0); // Set minutes to 0 to round down to the nearest hour
      const label = time.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
      labels.push(label);
    }
    return labels;
  };

  // Function to generate random temperature data (30 ± 5 degrees) with one decimal place
  const generateRandomTempData = () => {
    return Array.from({ length: 24 }, () => (Math.random() * 10 + 25).toFixed(1));
  };

  // Function to generate random humidity data (44 to 88%) with one decimal place
  const generateRandomHumidityData = () => {
    return Array.from({ length: 24 }, () => (Math.random() * 44 + 44).toFixed(1));
  };

  // Generate the labels and data for the graphs
  const labels = generateTimeLabels();
  const tempData1 = generateRandomTempData();
  const tempData2 = generateRandomTempData();
  const tempData3 = generateRandomTempData();
  const humidityData1 = generateRandomHumidityData();
  const humidityData2 = generateRandomHumidityData();
  const humidityData3 = generateRandomHumidityData();

  // Data for temperature (temp1, temp2, temp3)
  const tempData = {
    labels: labels,
    datasets: [
      {
        label: 'คอกที่ 1 ',
        data: tempData1,
        borderColor: 'rgba(255, 99, 132, 1)',
        fill: false,
      },
      {
        label: 'คอกที่ 2',
        data: tempData2,
        borderColor: 'rgba(54, 162, 235, 1)',
        fill: false,
      },
      {
        label: 'คอกที่ 3',
        data: tempData3,
        borderColor: 'rgba(75, 192, 192, 1)',
        fill: false,
      },
    ],
  };

  // Data for humidity (humidity1, humidity2, humidity3)
  const humidityData = {
    labels: labels,
    datasets: [
      {
        label: 'คอกที่ 1',
        data: humidityData1,
        borderColor: 'rgba(153, 102, 255, 1)',
        fill: false,
      },
      {
        label: 'คอกที่ 2',
        data: humidityData2,
        borderColor: 'rgba(255, 159, 64, 1)',
        fill: false,
      },
      {
        label: 'คอกที่ 3',
        data: humidityData3,
        borderColor: 'rgba(255, 206, 86, 1)',
        fill: false,
      },
    ],
  };

  const [isNotificationOn, setNotificationOn] = useState(false);
  
    const handleToggleNotification = async () => {
      const newState = !isNotificationOn;
      setNotificationOn(newState);
    
      const imageFiles = ["humi_day.jpg", "temp_day.jpg"]; // Array of image filenames
      try {
        // Loop through each image file in the array
        for (let i = 0; i < imageFiles.length; i++) {
          const response = await fetch("/api/sendImageNotification", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              images: imageFiles[i], // Use the image filename from the array
            }),
          });
  
          const result = await response.json();
          if (!result.success) {
            console.error("Error sending Telegram notification:", result.error);
          }
        }
      } catch (error) {
        console.error("Error sending request:", error);
      }
    };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">รายงานอุณหภูมิและความชื้นในรอบสัปดาห์</h1>
      
      {/* Full width Temperature LineChart */}
      <div style={{ width: '100%', marginBottom: '20px' }}>
        <h2 className="text-xl font-bold mb-4">อุณหภูมิ</h2>
        <LineChartTemp data={tempData} />
      </div>

      {/* Full width Humidity LineChart */}
      <div style={{ width: '100%', marginBottom: '20px' }}>
        <h2 className="text-xl font-bold mb-4">ค่าความชื้นสัมพัทธ์</h2>
        <LineChartHumi data={humidityData} />
      </div>

      <div className="mt-4">
        <span className="mr-4">🔔 ส่งการแจ้งเตือนไปยัง Telegram:</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={isNotificationOn}
            onChange={handleToggleNotification}
          />
          <div
            className={`w-11 h-6 rounded-full transition-all duration-300 ${
              isNotificationOn
                ? "bg-green-600 peer-focus:ring-2 peer-focus:ring-green-400"
                : "bg-gray-300 border-2 border-red-500"
            }`}
          ></div>
          <span
            className={`ml-2 font-semibold ${
              isNotificationOn ? "text-blue-600" : "text-red-500"
            }`}
          >
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

export default Environment;
