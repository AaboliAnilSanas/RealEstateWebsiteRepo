// components/Layout/Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Homepage/Navbar/navbar.jsx';

export default function Layout() {
  return (
    <div className="app">
      {/* Transparent Navbar with no background color */}
      <Navbar className="fixed top-0 left-0 right-0 z-50 bg-[transparent]" />
      
      <main className="main-content relative">
        <Outlet />
      </main>
    </div>
  );
}