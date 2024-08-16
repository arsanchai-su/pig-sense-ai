// app/components/BarChart.tsx
"use client";

import { Bar } from 'react-chartjs-2';

interface BarChartProps {
  data: any; // Define the type based on your data structure
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
  return <Bar data={data} />;
};

export default BarChart;
