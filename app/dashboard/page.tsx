"use client";
import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';

const Dashboard: React.FC = () => {
  const videoId = 'kKZ1qri1DGY'; // Hardcode video1 ID
  const [player, setPlayer] = useState<YT.Player | null>(null);

  useEffect(() => {
    const initializePlayer = () => {
      if (player) {
        player.destroy(); // Destroy the existing player before re-initializing
      }

      const newPlayer = new YT.Player('videoPlayer', {
        videoId: videoId, // Always use video1 ID
        events: {
          'onReady': (event: YT.PlayerEvent) => {
            event.target.playVideo();
          },
          'onStateChange': (event: YT.OnStateChangeEvent) => {
            if (event.data === YT.PlayerState.ENDED) {
              event.target.seekTo(0); // Restart the video
              event.target.playVideo(); // Play the video again
            }
          },
        },
        playerVars: {
          autoplay: 1,
          mute: 1,
        },
      });
      setPlayer(newPlayer);
    };

    if (typeof window !== 'undefined' && (window as any).YT && (window as any).YT.Player) {
      initializePlayer(); // API is already loaded, initialize the player
    } else {
      // Load the YouTube API script
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

      (window as any).onYouTubeIframeAPIReady = () => {
        initializePlayer(); // Initialize the player once the API is ready
      };
    }

    return () => {
      if (player) {
        player.destroy();
        setPlayer(null); // Reset player state
      }
    };
  }, []);

  return (
    <Layout>
      {/* Text before select */}
      <h1 className="text-2xl font-bold mb-4">ภาพวีดีโอแสดงการทำงานตรวจจับพฤติกรรมสุกร</h1>
      
      {/* Dummy select option, non-functional */}
      <select>
        <option>คอกที่ 1 ฟาร์มอำเภอท่าศาลา</option>
        <option>คอกที่ 2 ฟาร์มอำเภอท่าศาลา</option>
        <option>คอกที่ 3 ฟาร์มอำเภอท่าศาลา</option>
      </select>
      
      <div id="videoPlayer" />
      {/* Text after vedio player */}
      <h1 className="text-1xl font-bold mb-4 text-gray-600">**เป็นการจำลองการแสดงผลเท่านั้น</h1>

    </Layout>
  );
};

export default Dashboard;
