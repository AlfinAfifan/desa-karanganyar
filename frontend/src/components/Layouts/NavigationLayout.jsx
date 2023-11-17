import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Elements/Sidebar/Sidebar';
import Navbar from '../Elements/Navbar/Navbar';

const NavigationLayout = () => {
  return (
    <div className="flex bg-gray-200">
      <Sidebar />
      <div className="min-h-screen flex grow flex-col">
        <Navbar />
        <div className="bg-white w-auto my-7 mx-7 rounded-2xl shadow-lg p-7 ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default NavigationLayout;
