// src/components/Layout.tsx
import Link from 'next/link';
import Image from 'next/image';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="w-full sm:w-1/4 lg:w-1/5 p-6 bg-gradient-to-b from-zinc-200 dark:from-inherit border-r border-gray-300 dark:border-neutral-800 backdrop-blur-2xl dark:bg-zinc-800/30">
          {/* Logo or Image */}
          <div className="mb-6">
            <Image
              src="/PigSenceAILogo.jpg" // Replace with your image path
              alt="Sidebar Logo"
              width={150}  // Adjust the width as needed
              height={150} // Adjust the height as needed
            />
          </div>

          <nav>
            <Link href="/dashboard" className="block mb-4">
              Real-Time Detection
            </Link>
            <Link href="/report" className="block mb-4">
              รายงานผลการตรวจจับพฤติกรรมสุกร
            </Link>
            <Link href="/environment" className="block mb-4">
              สภาพแวดล้อมของคอกสุกร
            </Link>
            <Link href="/controlpanel" className="block mb-4">
              ระบบควบคุมสภาพแวดล้อมของคอกสุกร
            </Link>
            <Link href="/about-me" className="block">
              About Me
            </Link>
          </nav>
        </div>

        {/* Main content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>

      {/* Footer */}
      <footer className="w-full h-30 flex items-center justify-center border-t mt-auto">
        <a
          href="https://www.wu.ac.th/th"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2"
        >
          <Image
            src="/WalailakUniversityLogo.jpg"
            alt="Walailak University Logo"
            width={100}
            height={24}
            className="dark:invert"
          />
        </a>
      </footer>
    </div>
  );
};

export default Layout;
