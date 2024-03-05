import React from 'react';

const ModalImage = ({detail}) => {
  return (
    <dialog id="modal_image" className="modal">
      <div className="modal-box w-11/12 max-w-5xl">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <h3 className="font-bold text-lg text-center text-cyan-600">Dokumen</h3>
        <div className="w-full h-0.5 bg-cyan-600 my-2 rounded-full"></div>

        <div className="py-4 text-base text-center">
          <div className="grid grid-cols-3 gap-3 justify-center mt-3">
            <div className="grid justify-center shadow-lg">
              <img className="w-96 h-52 object-cover rounded-t-lg" src={detail.urlSebelum} alt="" />
              <h1 className="font-semibold rounded-b-lg bg-cyan-600 text-white py-1">Foto Sebelum</h1>
            </div>
            <div className="grid justify-center shadow-lg">
              <img className="w-96 h-52 object-cover rounded-t-lg" src={detail.urlProses} alt="" />
              <h1 className="font-semibold rounded-b-lg bg-cyan-600 text-white py-1">Foto Proses</h1>
            </div>
            <div className="grid justify-center shadow-lg">
              <img className="w-96 h-52 object-cover rounded-t-lg" src={detail.urlSesudah} alt="" />
              <h1 className="font-semibold rounded-b-lg bg-cyan-600 text-white py-1">Foto Sesudah</h1>
            </div>
          </div>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default ModalImage;
