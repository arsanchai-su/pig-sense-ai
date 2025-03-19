"use client";

import React, { useState } from 'react';
import Layout from '@/components/Layout';
import LineChart from '@/components/LineChart';
import BarChart from '@/components/BarChart';
import PieChart from '@/components/PieChart';
import '../chartConfig'; // Import the registration file

const Report = () => {
  const [selectedFarm, setSelectedFarm] = useState('คอกที่ 1 ฟาร์มอำเภอท่าศาลา');
  const [selectedDate, setSelectedDate] = useState('3 Sep');

  const lineData1 = {
    labels: ['28 Aug', '29 Aug', '30 Aug', '31 Aug', '1 Sep', '2 Sep', '3 Sep'],
    datasets: [
      {
        label: 'นอน',
        data: [57, 49, 52, 55, 51, 54, 48],
        borderColor: 'rgba(75, 192, 192, 1)',
        fill: false,
      },
      {
        label: 'นั่ง',
        data: [5, 7, 6.6, 5.6, 7.3, 3.2, 4],
        borderColor: 'rgba(153, 102, 255, 1)',
        fill: false,
      },
      {
        label: 'ยืน',
        data: [25, 31, 22, 27, 34, 20, 33],
        borderColor: 'rgba(255, 159, 64, 1)',
        fill: false,
      },
      {
        label: 'กิน',
        data: [5.3, 5.9, 6, 6.2, 5.4, 4.9, 5.5],
        borderColor: 'rgba(54, 162, 235, 1)',
        fill: false,
      },
      {
        label: 'ดื่มน้ำ',
        data: [2.2, 2.5, 2.1, 1.9, 1.8, 2.3, 2.4],
        borderColor: 'rgba(255, 99, 132, 1)',
        fill: false,
      },
    ],
  };

  const lineData2 = {
    labels: ['28 Aug', '29 Aug', '30 Aug', '31 Aug', '1 Sep', '2 Sep', '3 Sep'],
    datasets: [
      {
        label: 'นอน',
        data: [60, 51, 54, 58, 53, 57, 50],
        borderColor: 'rgba(75, 192, 192, 1)',
        fill: false,
      },
      {
        label: 'นั่ง',
        data: [5, 7, 6.6, 5.6, 7.3, 3.2, 4],
        borderColor: 'rgba(153, 102, 255, 1)',
        fill: false,
      },
      {
        label: 'ยืน',
        data: [22, 29, 19, 24, 31, 19, 30],
        borderColor: 'rgba(255, 159, 64, 1)',
        fill: false,
      },
      {
        label: 'กิน',
        data: [5.3, 5.9, 6, 6.2, 5.4, 4.9, 5.5],
        borderColor: 'rgba(54, 162, 235, 1)',
        fill: false,
      },
      {
        label: 'ดื่มน้ำ',
        data: [2.2, 2.5, 2.1, 1.9, 1.8, 2.3, 2.4],
        borderColor: 'rgba(255, 99, 132, 1)',
        fill: false,
      },
    ],
  };

  const lineData3 = {
    labels: ['28 Aug', '29 Aug', '30 Aug', '31 Aug', '1 Sep', '2 Sep', '3 Sep'],
    datasets: [
      {
        label: 'นอน',
        data: [55, 47, 50, 53, 49, 52, 46],
        borderColor: 'rgba(75, 192, 192, 1)',
        fill: false,
      },
      {
        label: 'นั่ง',
        data: [7, 8, 7.6, 6.6, 8.3, 5.2, 5.7],
        borderColor: 'rgba(153, 102, 255, 1)',
        fill: false,
      },
      {
        label: 'ยืน',
        data: [26, 33, 27, 28, 36, 22, 31],
        borderColor: 'rgba(255, 159, 64, 1)',
        fill: false,
      },
      {
        label: 'กิน',
        data: [5.3, 5.9, 6, 6.2, 5.4, 4.9, 5.5],
        borderColor: 'rgba(54, 162, 235, 1)',
        fill: false,
      },
      {
        label: 'ดื่มน้ำ',
        data: [2.2, 2.5, 2.1, 1.9, 1.8, 2.3, 2.4],
        borderColor: 'rgba(255, 99, 132, 1)',
        fill: false,
      },
    ],
  };

  const lineData = selectedFarm === 'คอกที่ 1 ฟาร์มอำเภอท่าศาลา' ? lineData1 :
                   selectedFarm === 'คอกที่ 2 ฟาร์มอำเภอท่าศาลา' ? lineData2 : lineData3;

  // Get the index of the selected date
  const selectedIndex = lineData.labels.indexOf(selectedDate);

  // Use the index to extract the corresponding data for the selected date
  const selectedData = lineData.datasets.map(dataset => dataset.data[selectedIndex]);

  const barData = {
    labels: ['นอน', 'ยืน', 'นั่ง', 'กิน', 'ดื่มน้ำ'],
    datasets: [
      {
        label: 'ชั่วโมงในการทำกิจกรรม',
        data: selectedData,
        backgroundColor: [
          'rgba(75, 192, 192, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 99, 132, 0.2)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const pieData = {
    labels: ['นอน', 'ยืน', 'นั่ง', 'กิน', 'ดื่มน้ำ'],
    datasets: [
      {
        label: '# of Votes',
        data: selectedData,
        backgroundColor: [
          'rgba(75, 192, 192, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 99, 132, 0.2)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const [isNotificationOn, setNotificationOn] = useState(false);

  const handleToggleNotification = async () => {
    const newState = !isNotificationOn;
    setNotificationOn(newState);
  
    const imageFiles = ["daliy.jpg", "daliy2.jpg", "week_graph.jpg"]; // Array of image filenames
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
      <h1 className="text-2xl font-bold mb-4">รายงานภาพรวมพฤติกรรมสุกรในรอบสัปดาห์</h1>
      
      {/* Full width LineChart */}
      <div style={{ width: '100%', marginBottom: '20px' }}>
        <select 
          className='text-gray-600 mb-4' 
          value={selectedFarm} 
          onChange={(e) => setSelectedFarm(e.target.value)}
        >
          <option value="คอกที่ 1 ฟาร์มอำเภอท่าศาลา">คอกที่ 1 ฟาร์มอำเภอท่าศาลา</option>
          <option value="คอกที่ 2 ฟาร์มอำเภอท่าศาลา">คอกที่ 2 ฟาร์มอำเภอท่าศาลา</option>
          <option value="คอกที่ 3 ฟาร์มอำเภอท่าศาลา">คอกที่ 3 ฟาร์มอำเภอท่าศาลา</option>
        </select>
        <LineChart data={lineData} />
          <select 
            className='text-gray-600 mt-4' 
            value={selectedDate} 
            onChange={(e) => setSelectedDate(e.target.value)}
          >
            {lineData.labels.map((date, index) => (
              <option key={index} value={date}>{date}</option>
            ))}
          </select>
      </div>

      {/* Flex container for BarChart and PieChart */}
      <div style={{ display: 'flex', gap: '20px' }}>
        <div style={{ flex: 1 }}>
          <h1 className="text-xl font-bold mb-4">รายงานประจำวัน</h1>
          <BarChart data={barData} />
        </div>
        <div style={{ flex: 1 }}>
          <h1 className="text-xl font-bold mb-4">รายภาพรวมประจำวัน</h1>
          <PieChart data={pieData} />
        </div>
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

export default Report;
