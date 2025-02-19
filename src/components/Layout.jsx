import React, { useState } from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="flex flex-col">
      {/* Navbar with search handler */}
      <Navbar onSearchChange={setSearchQuery} />

      {/* Pass searchQuery to all child routes */}
      <main className="flex-grow p-4">
        <Outlet context={{ searchQuery }} />
      </main>
    </div>
  );
};

export default Layout;
