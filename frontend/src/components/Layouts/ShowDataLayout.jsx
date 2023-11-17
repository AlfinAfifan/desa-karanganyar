import React from 'react';

const ShowDataLayout = ({ title, children }) => {
  return (
    <>
      <div className="flex justify-between items-center">
        <div className="text-xl font-medium roboto flex items-center gap-3">
          {title}{' '}
          <select className="select select-bordered border-black max-w-xs select-sm text-base">
            <option>2023</option>
            <option>2024</option>
          </select>
        </div>
        <div className="form-control">
          <input type="text" placeholder="Search" className="input border-2 border-slate-600 w-24 md:w-auto h-9" />
        </div>
      </div>
      <div className="bg-slate-200 w-full h-0.5 mt-5 rounded-full"></div>

      {/* TABLE */}
      {children}
    </>
  );
};

export default ShowDataLayout;
