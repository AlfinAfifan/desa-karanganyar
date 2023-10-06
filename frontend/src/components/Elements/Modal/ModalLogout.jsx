import React from 'react';
import Button from '../Button/Button';

const ModalLogout = ({ title, children }) => {
  return (
    <dialog id="modal_logout" className="modal">
      <div className="modal-box w-3/12 max-w-5xl flex flex-col items-center">
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="py-4 text-lg">{children}</p>
        <div className="modal-action">
          <form method="dialog" className="flex gap-4">
            {/* if there is a button in form, it will close the modal */}
            <Button bgColor="bg-red-600" hoverBgColor="hover:bg-red-700">
              Keluar
            </Button>
            <Button bgColor="bg-gray-400" hoverBgColor="hover:bg-gray-500">
              Batal
            </Button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default ModalLogout;
