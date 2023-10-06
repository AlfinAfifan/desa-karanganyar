import React from 'react';
import InputDate from '../../Elements/Input/InputDate';
import Input from '../../Elements/Input/Input';
import InputFile from '../../Elements/Input/InputFile';
import Button from '../../Elements/Button/Button';

const InputSuratKeluar = () => {
  return (
    <dialog id="my_modal_3" className="modal">
      <div className="modal-box w-6/12 max-w-5xl">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <h3 className="font-bold text-lg text-cyan-600">Input Data Surat Keluar</h3>
        <div className="w-full h-0.5 bg-cyan-600 my-2 rounded-full"></div>

        <form action="" className="flex flex-col gap-8">
          <div className="grid grid-cols-2 gap-y-4 gap-x-5 mt-3 text-base">
            <InputDate label="Tanggal" name="tanggal" colSpan="col-span-2" />
            <Input name="nomorSurat" label="Nomor Surat" type="text" placeholder="Masukkan nomor surat" />
            <Input name="perihal" label="Perihal" type="text" placeholder="Masukkan perihal surat" />
            <Input name="instansiDituju" label="Instansi Yang Dituju" type="text" placeholder="Masukkan instansi yang dituju" />
            <Input name="penanggungJawab" label="Penanggung Jawab" type="text" placeholder="Masukkan penanggung jawab surat" />
            <Input name="keterangan" label="Keterangan Surat" type="text" placeholder="Masukkan keterangan surat" />
            <InputDate label="Tanggal Surat" name="tanggalSurat" />
            <InputFile label="Upload Dokumen" name="dokSuratMasuk" />
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

export default InputSuratKeluar;
