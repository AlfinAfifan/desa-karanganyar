import React from 'react';
import DashboardLayouts from './DashboardLayout';

const ShowDataLayout = ({ title, children }) => {
  return (
    <DashboardLayouts>
      <div className="flex justify-between items-center">
        <div className="text-xl font-medium roboto">{title}</div>
        <div className="form-control">
          <input type="text" placeholder="Search" className="input border-2 border-slate-600 w-24 md:w-auto h-9" />
        </div>
      </div>
      <div className="bg-slate-200 w-full h-0.5 mt-5 rounded-full"></div>

      {/* TABLE */}
      {children}
    </DashboardLayouts>
  );
};

export default ShowDataLayout;
