import React, { useEffect, useState } from 'react';
import Input from '../../Elements/Input/Input';
import Button from '../../Elements/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { createInventaris } from '../../../redux/actions/inventaris/thunkInventaris';
import InputFile from '../../Elements/Input/InputFile';

const InputInventaris = ({ idEdit, setIdEdit }) => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');

  const data = useSelector((state) => state.inventaris.data);
  const dataId = data.map((dataFix) => dataFix.id);

  const dataEdit = data.filter((f) => f.id === idEdit)[0];

  const [formValues, setFormValues] = useState({
    namaProyek: '',
    volume: '',
    biaya: '',
    lokasi: '',
    keterangan: '',
  });

  useEffect(() => {
    setTitle('Edit Data Inventaris');

    if (dataEdit) {
      // Jika dataEdit tersedia, atur nilai formValues sesuai dataEdit
      setFormValues({
        namaProyek: dataEdit.namaProyek,
        volume: dataEdit.volume,
        biaya: dataEdit.biaya,
        lokasi: dataEdit.lokasi,
        keterangan: dataEdit.keterangan,
      });
    } else {
      setTitle('Input Data Inventaris');

      // Jika tidak ada dataEdit, reset nilai formValues
      setFormValues({
        namaProyek: '',
        volume: '',
        biaya: '',
        lokasi: '',
        keterangan: '',
      });
    }
  }, [dataEdit]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const { namaProyek, volume, biaya, lokasi, keterangan } = formValues;

    if (dataId.includes(dataEdit?.id)) {
      dispatch(updateData({ id: dataEdit.id, namaProyek, volume, biaya, lokasi, keterangan }));
      setIdEdit('');
    } else {
      // Logika untuk menambahkan data baru
      dispatch(createInventaris({ namaProyek, volume, biaya, lokasi, keterangan }));
    }
    // Reset nilai formulir
    setFormValues({
      namaProyek: '',
      volume: '',
      biaya: '',
      lokasi: '',
      keterangan: '',
    });

    // Menutup modal
    document.getElementById('my_modal_3').close();
  };

  return (
    <dialog id="my_modal_3" className="modal">
      <div className="modal-box w-6/12 max-w-5xl">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => setIdEdit(null)}>
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg text-cyan-600">{title}</h3>
        <div className="w-full h-0.5 bg-cyan-600 my-2 rounded-full"></div>

        <form action="" onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="grid grid-cols-2 gap-y-4 gap-x-7 mt-3 text-base">
            <Input name="namaProyek" label="Jenis / Nama Proyek" type="text" placeholder="Masukkan jenis / nama proyek" value={formValues.namaProyek} onChange={(e) => setFormValues({ ...formValues, namaProyek: e.target.value })} />
            <Input name="volume" label="Volume" type="text" placeholder="Masukkan volume proyek" value={formValues.volume} onChange={(e) => setFormValues({ ...formValues, volume: e.target.value })} />
            <Input name="biaya" label="Biaya" type="text" placeholder="Masukkan biaya proyek" value={formValues.biaya} onChange={(e) => setFormValues({ ...formValues, biaya: e.target.value })} />
            <Input name="lokasi" label="Lokasi" type="text" placeholder="Masukkan lokasi proyek" value={formValues.lokasi} onChange={(e) => setFormValues({ ...formValues, lokasi: e.target.value })} />
            <Input name="keterangan" label="Keterangan" type="text" placeholder="Masukkan keterangan" colSpan="col-span-2" value={formValues.keterangan} onChange={(e) => setFormValues({ ...formValues, keterangan: e.target.value })} />
            <InputFile label="Foto Sebelum" name="fotoSebelum" />
            <InputFile label="Foto Proses" name="fotoSebelum" />
            <InputFile label="Foto Sesudah" name="fotoSebelum" />
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

export default InputInventaris;
