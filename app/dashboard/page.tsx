"use client";

import { useEffect, useState } from "react";
import Layout from "@/components/Layout";

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
  const videoId = "kKZ1qri1DGY"; // Hardcoded video ID
  const [player, setPlayer] = useState<YT.Player | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [isNotificationOn, setNotificationOn] = useState(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const initializePlayer = () => {
      if (player) player.destroy();

      const newPlayer = new YT.Player("videoPlayer", {
        videoId: videoId,
        events: {
          onReady: (event: YT.PlayerEvent) => event.target.playVideo(),
          onStateChange: (event: YT.OnStateChangeEvent) => {
            if (event.data === YT.PlayerState.ENDED) {
              event.target.seekTo(0);
              event.target.playVideo();
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

    if (typeof window !== "undefined" && (window as any).YT && (window as any).YT.Player) {
      initializePlayer();
    } else {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);

      (window as any).onYouTubeIframeAPIReady = initializePlayer;
    }

    return () => {
      if (player) {
        player.destroy();
        setPlayer(null);
      }
    };
  }, [isClient]);

  const getRandomCounts = () => {
    const sleep = Math.floor(Math.random() * 5) + 6; // 6-10
    const remaining = 10 - sleep;
    const stand = Math.floor(Math.random() * (remaining + 1));
    const eat = remaining - stand;
    return { sleep, stand, eat };
  };

  const sendTelegramNotification = async () => {
    const { sleep, stand, eat } = getRandomCounts();
    const message = `🐷 **จำนวนหมูในคอก**: 10 ตัว\n💤 หมูนอน: ${sleep} ตัว\n🦴 หมูยืน: ${stand} ตัว\n🍽 หมูกิน: ${eat} ตัว\n🚰 หมูดื่ม: 0 ตัว`;

    try {
      await fetch("/api/sendNotification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
    } catch (error) {
      console.error("Error sending Telegram notification:", error);
    }
  };

  useEffect(() => {
    if (isNotificationOn) {
      const id = setInterval(sendTelegramNotification, 5000);
      setIntervalId(id);
    } else {
      if (intervalId) clearInterval(intervalId);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isNotificationOn]);

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">ภาพวีดีโอแสดงการทำงานตรวจจับพฤติกรรมสุกร</h1>

      <select>
        <option>คอกที่ 1 ฟาร์มอำเภอท่าศาลา</option>
        <option>คอกที่ 2 ฟาร์มอำเภอท่าศาลา</option>
        <option>คอกที่ 3 ฟาร์มอำเภอท่าศาลา</option>
      </select>
      <div id="videoPlayer" className="w-full h-64 sm:h-80 md:h-96 lg:h-[36rem]"></div>
      
      <div className="mt-4">
        <span className="mr-4">🔔 ส่งการแจ้งเตือนไปยัง Telegram:</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={isNotificationOn}
            onChange={() => setNotificationOn(!isNotificationOn)}
          />
          <div
            className={`w-11 h-6 rounded-full transition-all duration-300 ${
              isNotificationOn ? "bg-green-600 peer-focus:ring-2 peer-focus:ring-green-400" : "bg-gray-300 border-2 border-red-500"
            }`}
          ></div>
          <span className={`ml-2 font-semibold ${isNotificationOn ? "text-blue-600" : "text-red-500"}`}>
            {isNotificationOn ? "ON" : "OFF"}
          </span>
        </label>
      </div>

      <div className="mt-6">
        <img src="/QR.jpg" alt="Scan for Telegram Result" className="w-40 h-40" />
        <p className="text-sm mt-2 text-gray-600">📲 Scan เพื่อรับการแจ้งเตือนผ่าน Telegram กลุ่ม</p>
      </div>
      
    </Layout>
  );
};

export default Dashboard;
