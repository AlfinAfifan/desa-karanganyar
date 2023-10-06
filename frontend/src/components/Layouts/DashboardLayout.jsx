import React from 'react';
import SidebarElement from '../Elements/Sidebar/Sidebar';
import Navbar from '../Elements/Navbar/Navbar';

const DashboardLayouts = ({ children }) => {
  return (
    <div className="bg-gray-200 min-h-screen w-full flex">
      <SidebarElement />
      <div className="flex flex-col w-full ml-72">
        <Navbar />
        <div className="bg-white w-auto my-7 mx-7 mr-10 rounded-2xl shadow-lg p-7 ">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayouts;
