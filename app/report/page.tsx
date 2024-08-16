// app/report/page.tsx
"use client";

import Layout from '@/components/Layout';
import LineChart from '@/components/LineChart';
import BarChart from '@/components/BarChart';
import PieChart from '@/components/PieChart';
import '../chartConfig'; // Import the registration file

const Report = () => {
  const lineData = {
    labels: ['6 Aug', '7 Aug', '8 Aug', '9 Aug', '10 Aug', '11 Aug', '12 Aug'],
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

  const barData = {
    labels: ['นอน', 'ยืน', 'นั่ง', 'กิน', 'ดื่มน้ำ'],
    datasets: [
      {
        label: 'ชั่วโมงในการทำกิจกรรม',
        data: [57, 25, 5, 5.3, 2.2],
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
    labels: [ 'นอน', 'ยืน','กิน', 'นั่ง','ดื่มน้ำ'],
    datasets: [
      {
        label: '# of Votes',
        data: [ 57, 25, 5.3,5, 2.2],
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

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">รายงานภาพรวมพฤติกรรมสุกรในรอบสัปดาห์</h1>
      {/* Full width LineChart */}
      <div style={{ width: '100%', marginBottom: '20px' }}>
      <select className='text-gray-600'>
        <option>คอกที่ 1 ฟาร์มอำเภอท่าศาลา</option>
        <option>คอกที่ 2 ฟาร์มอำเภอท่าศาลา</option>
        <option>คอกที่ 3 ฟาร์มอำเภอท่าศาลา</option>
      </select>
        <LineChart data={lineData} />
      </div>
      {/* Flex container for BarChart and PieChart */}
      <div style={{ display: 'flex', gap: '20px' }}>
        <div style={{ flex: 1 }}>
          <h1 className="text-1xl font-bold mb-4">รายงานประจำวัน</h1>
          <select className='text-gray-600'>
            <option>6Aug</option>
            <option>7Aug</option>
            <option>8Aug</option>
            <option>9Aug</option>
            <option>10Aug</option>
            <option>11Aug</option>
            <option>12Aug</option>
          </select>
          <BarChart data={barData} />
        </div>
        <div style={{ flex: 1 }}>
          <h1 className="text-1xl font-bold mb-4">รายภาพรวมประจำวัน</h1>
          <select className='text-gray-600'>
            <option>6Aug</option>
            <option>7Aug</option>
            <option>8Aug</option>
            <option>9Aug</option>
            <option>10Aug</option>
            <option>11Aug</option>
            <option>12Aug</option>
          </select>
          <PieChart data={pieData} />
        </div>
      </div>
    </Layout>
  );
};

export default Report;
