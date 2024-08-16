// app/components/LineChart.tsx
"use client";

import { Line } from 'react-chartjs-2';

interface LineChartProps {
  data: any; // Define the type based on your data structure
}

const LineChart: React.FC<LineChartProps> = ({ data }) => {
  return <Line data={data} />;
};

export default LineChart;
