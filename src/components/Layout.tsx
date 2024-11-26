import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function Layout() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 overflow-auto min-w-0">
        <Outlet />
      </main>
    </div>
  );
}