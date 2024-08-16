// src/app/page.tsx
"use client"; // Marking as client component since it will use client-side logic

import Dashboard from './dashboard/page'; // Import the Dashboard component
import Layout from '../components/Layout'; // Import the Layout component

export default function Home() {
  return (
    
      <Dashboard /> 
    
  );
}
