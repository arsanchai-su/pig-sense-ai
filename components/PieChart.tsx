// app/components/PieChart.tsx
"use client";

import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// Register the required components for Chart.js
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

interface PieChartProps {
  data: any; // Define the type based on your data structure
}

const PieChart: React.FC<PieChartProps> = ({ data }) => {
  const options = {
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: function(tooltipItem: any) {
            // Format tooltip to show percentage
            const dataset = tooltipItem.dataset;
            const total = dataset.data.reduce((acc: number, value: number) => acc + value, 0);
            const value = dataset.data[tooltipItem.dataIndex];
            const percentage = ((value / total) * 100).toFixed(2);
            return `${tooltipItem.label}: ${percentage}%`;
          },
        },
      },
      datalabels: {
        color: '#000',
        formatter: (value: number, context: any) => {
          const dataset = context.dataset;
          const total = dataset.data.reduce((acc: number, value: number) => acc + value, 0);
          const percentage = ((value / total) * 100).toFixed(2);
          return `${percentage}%`;
        },
        anchor: 'center' as const,
        align: 'center' as const,
        backgroundColor: '#ffffff', // Optional: Background color for better visibility
        borderRadius: 4,
        padding: 4,
        display: (context: any) => {
          // Display only if percentage is above a threshold for readability
          const dataset = context.dataset;
          const total = dataset.data.reduce((acc: number, value: number) => acc + value, 0);
          const value = dataset.data[context.dataIndex];
          const percentage = (value / total) * 100;
          return percentage > 1; // Show labels only if percentage > 5%
        },
      },
    },
  };

  return <Pie data={data} options={options} />;
};

export default PieChart;
