import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { HiClipboardDocumentList, HiDocumentText, HiEnvelope, HiEnvelopeOpen, HiHome, HiMiniBuildingOffice2, HiMiniChevronDown, HiMiniKey } from 'react-icons/hi2';
import { FaArrowLeft } from 'react-icons/fa6';
import logoPemkab from '../../../assets/img/logo-pemkab.png';

const SidebarElement = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  // Cek Active Menu
  const location = useLocation();
  const isPeraturanActive = location.pathname === '/peraturan';
  const isPerundanganPerActive = location.pathname === '/perundangper';
  const isKeputusanActive = location.pathname === '/keputusan';
  const isPerundanganKeptActive = location.pathname === '/perundangkep';

  // Open SubMenu
  const [isDropdown, setIsDropdown] = useState(false);

  const handleDropdown = () => {
    setIsDropdown(true);
  };

  const closeDropdown = () => {
    setIsDropdown(false);
  };

  const [isDropdown2, setIsDropdown2] = useState(false);

  const handleDropdown2 = () => {
    setIsDropdown2(true);
  };

  const closeDropdown2 = () => {
    setIsDropdown2(false);
  };

  return (
    <div className={`bg-cyan-800 h-screen flex flex-col gap-3 roboto text-white sticky top-0 duration-500 z-50 ${isOpen ? 'w-28 px-6' : 'w-72 px-3'}`}>
      <a href="#" className="font-bold normal-case my-6 flex justify-center gap-2 items-center">
        <img src={logoPemkab} alt="" className="w-14" />
        <div className="font-medium ">
          {isOpen ? (
            ''
          ) : (
            <div className="flex flex-col">
              <div className="text-2xl tracking-widest"> Pemerintah </div> <div className="whitespace-nowrap text-lg">Desa Karanganyar</div>
            </div>
          )}
        </div>
      </a>

      <div className={`rounded-full py-0.5 flex justify-center text-sm font-semibold bg-white opacity-50 mt-1 mb-2 text-cyan-800 ${isOpen ? 'mx-2' : 'mx-4'}`}>{isOpen ? '' : 'Persuratan'}</div>

      <NavLink to="/dashboard">
        {({ isActive }) => (
          <div className={`py-2 hover:opacity-100 flex gap-3 px-3 whitespace-nowrap ${isOpen ? 'justify-center rounded-full py-3' : 'rounded-md'} ${isActive ? 'bg-white text-cyan-800' : 'opacity-50'}`}>
            <span className="text-2xl my-auto">
              <HiHome />
            </span>
            {isOpen ? '' : 'Beranda'}
          </div>
        )}
      </NavLink>
      <NavLink to="/suratmasuk">
        {({ isActive }) => (
          <div className={`py-2 hover:opacity-100 flex gap-3 px-3 whitespace-nowrap ${isOpen ? 'justify-center rounded-full py-3' : 'rounded-md'} ${isActive ? 'bg-white text-cyan-800' : 'opacity-50'}`}>
            <span className="text-2xl my-auto">
              <HiEnvelope />
            </span>
            {isOpen ? '' : 'Surat Masuk'}
          </div>
        )}
      </NavLink>
      <NavLink to="/suratkeluar">
        {({ isActive }) => (
          <div className={`py-2 hover:opacity-100 flex gap-3 px-3 whitespace-nowrap ${isOpen ? 'justify-center rounded-full py-3' : 'rounded-md'} ${isActive ? 'bg-white text-cyan-800' : 'opacity-50'}`}>
            <span className="text-2xl my-auto">
              <HiEnvelopeOpen />
            </span>
            {isOpen ? '' : 'Surat Keluar'}
          </div>
        )}
      </NavLink>
      <NavLink to="/kodesurat">
        {({ isActive }) => (
          <div className={`py-2 hover:opacity-100 flex gap-3 px-3 whitespace-nowrap ${isOpen ? 'justify-center rounded-full py-3' : 'rounded-md'} ${isActive ? 'bg-white text-cyan-800' : 'opacity-50'}`}>
            <span className="text-2xl my-auto">
              <HiMiniKey />
            </span>
            {isOpen ? '' : 'Kode Surat'}
          </div>
        )}
      </NavLink>

      <div className={`rounded-full py-0.5 flex justify-center text-sm font-semibold bg-white opacity-50 mt-3 mb-2 text-cyan-800 ${isOpen ? 'mx-2' : 'mx-4'}`}>{isOpen ? '' : 'Produk Hukum'}</div>

      <NavLink to="/inventaris">
        {({ isActive }) => (
          <div className={`py-2 hover:opacity-100 flex gap-3 px-3 whitespace-nowrap ${isOpen ? 'justify-center rounded-full py-3' : 'rounded-md'} ${isActive ? 'bg-white text-cyan-800' : 'opacity-50'}`}>
            <span className="text-2xl my-auto">
              <HiMiniBuildingOffice2 />
            </span>
            {isOpen ? '' : 'Inventaris Proyek'}
          </div>
        )}
      </NavLink>

      {/* Menu Keputusan */}
      <div
        className={`py-2 hover:opacity-100 flex px-3 whitespace-nowrap dropdown dropdown-right ${isOpen ? 'justify-center rounded-full py-3' : 'rounded-md'} ${
          isKeputusanActive || isPerundanganKeptActive ? 'bg-white text-cyan-800' : 'opacity-50'
        }`}
      >
        <label tabIndex={0} onClick={handleDropdown2} onBlur={closeDropdown2} className={`w-full flex cursor-pointer ${isOpen ? 'justify-center' : 'justify-between'}`}>
          <div className="flex gap-3  items-center">
            <span className="text-2xl my-auto">
              <HiDocumentText />
            </span>
            {isOpen ? '' : 'Keputusan Kades'}
          </div>
          <HiMiniChevronDown className={`text-2xl ${isOpen ? 'hidden' : ''} ${isDropdown2 ? '-rotate-90' : ''}`} />
        </label>

        {/* dropdown */}
        <ul tabIndex={0} className="dropdown-content menu p-2 shadow-xl bg-slate-200 text-black rounded-box w-52">
          <li>
            <NavLink to="/keputusan">Data Keputusan</NavLink>
          </li>
          <li>
            <NavLink to="/perundangkep">Pengundangan</NavLink>
          </li>
        </ul>
      </div>

      <div
        className={`py-2 hover:opacity-100 flex px-3 whitespace-nowrap dropdown dropdown-right ${isOpen ? 'justify-center rounded-full py-3' : 'rounded-md'} ${
          isPeraturanActive || isPerundanganPerActive ? 'bg-white text-cyan-800' : 'opacity-50'
        }`}
      >
        <label tabIndex={0} onClick={handleDropdown} onBlur={closeDropdown} className={`w-full flex cursor-pointer  ${isOpen ? 'justify-center' : 'justify-between'}`}>
          <div className="flex gap-3 ">
            <span className="text-2xl my-auto">
              <HiClipboardDocumentList />
            </span>
            {isOpen ? '' : 'Peraturan Desa'}
          </div>
          <HiMiniChevronDown className={`text-2xl ${isOpen ? 'hidden' : ''} ${isDropdown ? '-rotate-90' : ''}`} />
        </label>

        {/* dropdown */}
        <ul tabIndex={0} className="dropdown-content menu p-2 shadow-xl bg-slate-200 rounded-box w-52 text-black">
          <li>
            <NavLink to="/peraturan">Data Peraturan</NavLink>
          </li>
          <li>
            <NavLink to="/perundangper">Pengundangan</NavLink>
          </li>
        </ul>
      </div>

      <div className="flex justify-center mt-10 text-xl my-auto">
        <button onClick={() => handleOpen()} className="p-3 bg-white text-cyan-800 hover:bg-cyan-500 hover:text-white rounded-full py-3">
          <FaArrowLeft className={`duration-500 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>
    </div>
  );
};

export default SidebarElement;
