"use client";
import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';

// Declare the YT namespace and types
declare global {
  namespace YT {
    class Player {
      constructor(elementId: string, options: PlayerOptions);
      destroy(): void;
      playVideo(): void;
      seekTo(seconds: number): void;
    }

    interface PlayerOptions {
      videoId: string;
      events: {
        onReady: (event: PlayerEvent) => void;
        onStateChange: (event: OnStateChangeEvent) => void;
      };
      playerVars?: {
        autoplay?: 1 | 0;
        mute?: 1 | 0;
      };
    }

    interface PlayerEvent {
      target: Player;
    }

    interface OnStateChangeEvent {
      data: number;
      target: Player;
    }

    const PlayerState: {
      ENDED: number;
    };
  }
}

const Dashboard: React.FC = () => {
  const videoId = 'kKZ1qri1DGY'; // Hardcoded video ID
  const [player, setPlayer] = useState<YT.Player | null>(null);
  const [isClient, setIsClient] = useState(false); // State to check if on client

  useEffect(() => {
    setIsClient(true); // Component has mounted on client
  }, []);

  useEffect(() => {
    if (!isClient) return; // Only run this if on the client side

    const initializePlayer = () => {
      if (player) {
        player.destroy(); // Destroy existing player before re-initializing
      }

      const newPlayer = new YT.Player('videoPlayer', {
        videoId: videoId,
        events: {
          'onReady': (event: YT.PlayerEvent) => {
            event.target.playVideo();
          },
          'onStateChange': (event: YT.OnStateChangeEvent) => {
            if (event.data === YT.PlayerState.ENDED) {
              event.target.seekTo(0); // Restart video
              event.target.playVideo(); // Replay video
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
      initializePlayer(); // API already loaded, initialize player
    } else {
      // Load YouTube API script
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

      (window as any).onYouTubeIframeAPIReady = () => {
        initializePlayer(); // Initialize player once API is ready
      };
    }

    return () => {
      if (player) {
        player.destroy();
        setPlayer(null); // Reset player state
      }
    };
  }, [isClient]);

  if (!isClient) {
    return null; // Render nothing on the server
  }

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">ภาพวีดีโอแสดงการทำงานตรวจจับพฤติกรรมสุกร</h1>
      
      <select>
        <option>คอกที่ 1 ฟาร์มอำเภอท่าศาลา</option>
        <option>คอกที่ 2 ฟาร์มอำเภอท่าศาลา</option>
        <option>คอกที่ 3 ฟาร์มอำเภอท่าศาลา</option>
      </select>
      
      <div id="videoPlayer" className="w-full h-64 sm:h-80 md:h-96 lg:h-[36rem]"></div>
    </Layout>
  );
};

export default Dashboard;
