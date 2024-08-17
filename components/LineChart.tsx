"use client";

import { Line } from 'react-chartjs-2';
import { ChartOptions } from 'chart.js';
import 'chart.js/auto'; // Automatically imports and registers necessary components

interface LineChartProps {
  data: {
    labels: string[];
    datasets: any[];
  };
}

const LineChart: React.FC<LineChartProps> = ({ data }) => {
  const options: ChartOptions<'line'> = {
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
        beginAtZero: true, // Ensure y-axis starts at 0
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem: any) {
            return tooltipItem.dataset.label + ': ' + tooltipItem.formattedValue;
          },
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default LineChart;
