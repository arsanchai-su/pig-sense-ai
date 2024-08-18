"use client"
import React, { useState, useEffect } from 'react';

import Layout from '@/components/Layout';
import Fan from '@/components/Fan';
import WaterSpring from '@/components/WaterSpring';
import DigitalDisplay from '@/components/DigitalDisplay';

const Dashboard: React.FC = () => {
  const [data, setData] = useState([
    { id: 1, temperature: 25.0, humidity: 80.0 },
    { id: 2, temperature: 30.0, humidity: 70.0 },
    { id: 3, temperature: 35.0, humidity: 60.0 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prevData) =>
        prevData.map((item) => ({
          ...item,
          temperature: item.temperature < 40 ? item.temperature + 0.1 : 25,
          humidity: item.humidity > 40 ? item.humidity - 2 : 80,
        }))
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

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
    </Layout>
  );
};

export default Dashboard;
