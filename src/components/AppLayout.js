import React from 'react';
import Sidebar from './Sidebar';

export default function AppLayout({ children }) {
  return (
    <div className="relative">
      <Sidebar />
      <main className="pt-4 md:pl-64 px-4">{children}</main>
    </div>
  );
}
