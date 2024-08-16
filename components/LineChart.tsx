"use client";

import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register required components for Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface LineChartProps {
  data: {
    labels: string[];
    datasets: any[];
  };
}

const LineChart: React.FC<LineChartProps> = ({ data }) => {
  const options = {
    scales: {
      x: {
        type: 'category', // Use 'category' scale for string labels
        title: {
          display: true,
          text: 'Date',
        },
        ticks: {
          autoSkip: true, // Optionally skip some labels to avoid clutter
          maxTicksLimit: 10, // Limit number of ticks
        },
      },
      y: {
        title: {
          display: true,
          text: 'เวลาในการทำกิจกรรมของสุกรทั้งคอก (ชั่วโมง)',
        },
        // Ensure y-axis starts at 0
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: function(tooltipItem: any) {
            return tooltipItem.dataset.label + ': ' + tooltipItem.formattedValue;
          },
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default LineChart;
