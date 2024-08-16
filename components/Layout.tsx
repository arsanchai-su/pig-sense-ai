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
        <nav className="w-full sm:w-1/4 lg:w-1/5 p-6 bg-gradient-to-b from-zinc-200 dark:from-inherit border-r border-gray-300 dark:border-neutral-800 backdrop-blur-2xl dark:bg-zinc-800/30">
          <Link href="/dashboard" className="block mb-4">
            Dashboard
          </Link>
          <Link href="/report" className="block mb-4">
            Report
          </Link>
          <Link href="/about-me" className="block">
            About Me
          </Link>
        </nav>

        {/* Main content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>

      {/* Footer */}
      <footer className="w-full h-24 flex items-center justify-center border-t mt-auto">
        <a
          href="https://www.wu.ac.th/th"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2"
        >
          <Image
            src="https://upload.wikimedia.org/wikipedia/th/thumb/e/ed/Walailak_University_Logo.svg/480px-Walailak_University_Logo.svg.png"
            alt="Vercel Logo"
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
