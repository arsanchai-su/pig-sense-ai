"use client";

import { Line } from 'react-chartjs-2';
import { ChartOptions } from 'chart.js';
import 'chart.js/auto'; // Automatically imports and registers necessary components

interface LineChartHumiProps {
  data: {
    labels: string[];
    datasets: any[];
  };
}

const LineChartHumi: React.FC<LineChartHumiProps> = ({ data }) => {
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
          text: 'ค่าความชื้นสัมพัทธ์',
        },
        min:0,
        max:100,
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

export default LineChartHumi;
