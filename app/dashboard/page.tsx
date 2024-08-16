"use client";
import { useState } from 'react';
import Layout from '@/components/Layout';

const Dashboard: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<string>('video1');

  const videos: Record<string, string> = {
    video1: 'https://www.youtube.com/embed/wqSPykG8i_g?autoplay=1&mute=1',
    video2: 'https://www.youtube.com/embed/INZBH3qnTUo?autoplay=1&mute=1',
    video3: 'https://www.youtube.com/embed/VIDEO_ID_3?autoplay=1&mute=1',
  };

  return (
    <Layout>
      <select onChange={(e) => setSelectedVideo(e.target.value)} value={selectedVideo}>
        <option value="video1">Video 1</option>
        <option value="video2">Video 2</option>
        <option value="video3">Video 3</option>
      </select>
      <iframe 
        id="videoPlayer"
        width="560" 
        height="315" 
        src={videos[selectedVideo]} 
        title="YouTube video player" 
        frameBorder="0" 
        allow="autoplay; encrypted-media" 
        allowFullScreen 
      />
    </Layout>
  );
};

export default Dashboard;
