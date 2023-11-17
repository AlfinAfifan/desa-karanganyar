import React from 'react';
import Button from '../Button/Button';
import { useDispatch } from 'react-redux';
import { deleteKeputusan } from '../../../redux/actions/keputusan/thunkKeputusan';
// import { deleteData } from '../../../redux/actions/inventarisSlice';

const ModalConfirm = ({ title, children, onClick }) => {
  return (
    <dialog id="my_modal_1" className="modal">
      <div className="modal-box w-3/12 max-w-5xl flex flex-col items-center">
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="py-4 text-lg">{children}</p>
        <div className="modal-action">
          <form method="dialog" className="flex gap-4">
            {/* if there is a button in form, it will close the modal */}
            <Button bgColor="bg-red-700" onClick={onClick}>
              Hapus
            </Button>
            <Button bgColor="bg-gray-400">Batal</Button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default ModalConfirm;
