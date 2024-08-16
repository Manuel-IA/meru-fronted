"use client";

import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Delete token
    router.push('/login');
  };

  return (
    <header style={{ padding: '1rem', backgroundColor: '#f5f5f5', display: 'flex', justifyContent: 'space-between' }}>
      <h1>Meru Products</h1>
      <button onClick={handleLogout} style={{ padding: '0.5rem 1rem', backgroundColor: '#0070f3', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
        Logout
      </button>
    </header>
  );
}
