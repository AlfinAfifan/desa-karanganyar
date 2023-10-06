import React from 'react';
import Button from '../Button/Button';
import { useDispatch } from 'react-redux';
import { deleteData } from '../../../redux/actions/inventarisSlice';

const ModalConfirm = ({ title, children, id, page }) => {
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    if (page == 'inventaris') {
      dispatch(deleteData({ id }));
    } else {
      console.log('object');
    }
  };

  return (
    <dialog id="my_modal_1" className="modal">
      <div className="modal-box w-3/12 max-w-5xl flex flex-col items-center">
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="py-4 text-lg">{children}</p>
        <div className="modal-action">
          <form method="dialog" className="flex gap-4">
            {/* if there is a button in form, it will close the modal */}
            <Button bgColor="bg-red-700" onClick={() => handleDelete(id)}>
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
