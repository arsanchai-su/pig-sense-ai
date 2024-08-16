// app/components/PieChart.tsx
"use client";

import { Pie } from 'react-chartjs-2';

interface PieChartProps {
  data: any; // Define the type based on your data structure
}

const PieChart: React.FC<PieChartProps> = ({ data }) => {
  return <Pie data={data} />;
};

export default PieChart;
