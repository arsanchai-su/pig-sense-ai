// src/components/Navbar.tsx
import Link from 'next/link';
import styles from './Navbar.module.css';

const Navbar: React.FC = () => {
  return (
    <div className={styles.navbar}>
      <Link href="/dashboard">Dashboard</Link>
      <Link href="/report">Report</Link>
      <Link href="/about-me">About Me</Link>
    </div>
  );
};

export default Navbar;
