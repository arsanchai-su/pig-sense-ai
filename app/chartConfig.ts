// app/chartConfig.ts

import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement,      // Import the BarElement for bar charts
  ArcElement,      // Import the ArcElement for pie/doughnut charts
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js';

// Register the components you are using
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,      // Register the BarElement
  ArcElement,      // Register the ArcElement
  Title,
  Tooltip,
  Legend
);
