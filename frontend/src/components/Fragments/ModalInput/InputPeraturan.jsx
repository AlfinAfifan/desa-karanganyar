import React from 'react';
import Input from '../../Elements/Input/Input';
import TextArea from '../../Elements/Input/TextArea';
import Button from '../../Elements/Button/Button';

const InputPeraturan = () => {
  return (
    <dialog id="my_modal_3" className="modal">
      <div className="modal-box w-6/12 max-w-5xl">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <h3 className="font-bold text-lg text-cyan-600">Input Data Peraturan Desa</h3>
        <div className="w-full h-0.5 bg-cyan-600 my-2 rounded-full"></div>

        <form action="" className="flex flex-col gap-8">
          <div className="grid grid-cols-2 gap-y-4 gap-x-5 mt-3 text-base">
            <Input label="Nomor & Tanggal Peraturan" name="noTglPeraturan" placeholder="Masukkan nomor & tanggal peraturan" />
            <Input name="tentang" label="Tentang" type="text" placeholder="Masukkan isi peraturan" />
            <TextArea name="uraian" label="Uraian Singkat" placeholder="Masukkan uraian singkat" colSpan="col-span-2" />
            <Input name="noTglPersetujuan" label="Nomor & Tanggal Persetujuan" type="text" placeholder="Masukkan nomor & tanggal persetujuan" />
            <Input name="noTglDilaporkan" label="Nomor & Tanggal Dilaporkan" type="text" placeholder="Masukkan nomor & tanggal dilaporkan" />
            <Input name="keterangan" label="Keterangan" type="text" placeholder="Masukkan keterangan" />
          </div>
          <Button bgColor="bg-cyan-600 py-3" hoverBgColor="hover:bg-cyan-700">
            Tambah Data
          </Button>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default InputPeraturan;
