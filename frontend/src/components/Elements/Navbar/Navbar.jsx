import React from 'react';
import ModalLogout from '../Modal/ModalLogout';

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 px-10 shadow-md sticky top-0 z-10">
      <div className="flex-1">
        <h1 className="text-2xl font-medium roboto">Administrasi Desa Karanganyar</h1>
      </div>
      <div className="flex-none gap-2">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" />
            </div>
          </label>
          <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-32">
            <li onClick={() => document.getElementById('modal_logout').showModal()}>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Modal Konfirm */}
      <ModalLogout title="Konfirmasi Logout!">Yakin untuk keluar dari halaman ini ?</ModalLogout>
    </div>
  );
};

export default Navbar;
