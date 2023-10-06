import React from 'react';
import { useSelector } from 'react-redux';

const Modal = ({ children, title }) => {
  const data = useSelector((state) => state.inventaris);

  return (
    <dialog id="my_modal_3" className="modal">
      <div className="modal-box w-6/12 max-w-5xl">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <h3 className="font-bold text-lg text-cyan-600">{title}</h3>
        <div className="w-full h-0.5 bg-cyan-600 my-2 rounded-full"></div>

        <form action="" className="flex flex-col gap-8">
          <div className="grid grid-cols-2 gap-y-4 gap-x-5 mt-3 text-base">{children}</div>
        </form>
      </div>
    </dialog>
  );
};

export default Modal;
