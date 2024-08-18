"use client";

import { Line } from 'react-chartjs-2';
import { ChartOptions } from 'chart.js';
import 'chart.js/auto'; // Automatically imports and registers necessary components

interface LineChartTempProps {
  data: {
    labels: string[];
    datasets: any[];
  };
}

const LineChartTemp: React.FC<LineChartTempProps> = ({ data }) => {
  const options: ChartOptions<'line'> = {
    scales: {
      x: {
        type: 'category', // Use 'category' scale for string labels
        title: {
          display: true,
          text: 'เวลา',
        },
        ticks: {
          autoSkip: true, // Optionally skip some labels to avoid clutter
          maxTicksLimit: 24, // Limit number of ticks
        },
      },
      y: {
        title: {
          display: true,
          text: 'อุณหภูมิ (องศา)',
        },
        min : 15,
        max: 45,
        beginAtZero: false, // Ensure y-axis starts at 0
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

export default LineChartTemp;
