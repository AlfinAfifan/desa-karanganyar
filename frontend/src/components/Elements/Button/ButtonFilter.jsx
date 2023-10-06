import React from 'react';
import { HiOutlineFunnel } from 'react-icons/hi2';

const ButtonFilter = () => {
  <details className="dropdown dropdown-bottom dropdown-end">
    <summary className="bg-transparent border-slate-800 hover:bg-slate-800 border-collapse border-2 py-1 px-4 rounded-lg font-semibold flex items-center gap-2 hover:text-white cursor-pointer">
      <span className="text-lg">
        <HiOutlineFunnel />
      </span>
      Filter
    </summary>

    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-slate-100 rounded-box w-52">
      <li>
        <a>Item 1</a>
      </li>
      <li>
        <a>Item 2</a>
      </li>
    </ul>
  </details>;
};

export default ButtonFilter;
