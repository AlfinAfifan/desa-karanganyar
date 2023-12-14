import React from 'react';

const ModalDetail = ({ children }) => {
  return (
    <dialog id="modal_file" className="modal">
      <div className="modal-box w-11/12 max-w-5xl">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <h3 className="font-bold text-lg text-center text-cyan-600">Dokumen</h3>
        <div className="w-full h-0.5 bg-cyan-600 my-2 rounded-full"></div>

        <div className="py-4 text-base text-center">{children}</div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default ModalDetail;
