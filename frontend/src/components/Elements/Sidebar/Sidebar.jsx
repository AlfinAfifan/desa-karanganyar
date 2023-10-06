import React from 'react';
import { NavLink } from 'react-router-dom';
import { HiOutlineBuildingOffice, HiOutlineClipboardDocumentList, HiOutlineDocumentText, HiOutlineEnvelope, HiOutlineEnvelopeOpen, HiOutlineKey } from 'react-icons/hi2';
import logo from '../../../assets/putih.png';

const SidebarElement = () => {
  return (
    <div className="bg-cyan-800 h-screen w-72 flex flex-col roboto z-20 fixed text-white">
      <a href="#" className="font-semibold normal-case text-2xl my-6 px-10">
        <img src={logo} alt="" />
      </a>
      <NavLink to="/dashboard/suratmasuk" className="py-3.5 hover:bg-cyan-700 px-10 flex gap-3">
        <span className="text-2xl">
          <HiOutlineEnvelope />
        </span>
        Surat Masuk
      </NavLink>
      <NavLink to="/dashboard/suratkeluar" className="py-3.5 hover:bg-cyan-700 px-10 flex gap-3">
        <span className="text-2xl">
          <HiOutlineEnvelopeOpen />
        </span>
        Surat Keluar
      </NavLink>
      <NavLink to="/dashboard/inventaris" className="py-3.5 hover:bg-cyan-700 px-10 flex gap-3">
        <span className="text-2xl">
          <HiOutlineBuildingOffice />
        </span>
        Inventaris Proyek
      </NavLink>
      <NavLink to="/dashboard/keputusan" className="py-3.5 hover:bg-cyan-700 px-10 flex gap-3">
        <span className="text-2xl">
          <HiOutlineDocumentText />
        </span>
        Keputusan Kades
      </NavLink>
      <NavLink to="/dashboard/peraturan" className="py-3.5 hover:bg-cyan-700 px-10 flex gap-3">
        <span className="text-2xl">
          <HiOutlineClipboardDocumentList />
        </span>
        Peraturan Desa
      </NavLink>

      <div className="h-0.5 bg-white ml-10 opacity-50 my-3"></div>

      <NavLink to="/dashboard/kode" className="py-3.5 hover:bg-cyan-700 px-10 flex gap-3">
        <span className="text-2xl">
          <HiOutlineKey />
        </span>
        Kode Surat
      </NavLink>
    </div>
  );
};

export default SidebarElement;
