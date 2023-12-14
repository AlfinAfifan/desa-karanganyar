import React, { useEffect, useRef, useState } from 'react';
import Input from '../../Elements/Input/Input';
import Button from '../../Elements/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { createInventaris, updateInventaris } from '../../../redux/actions/inventaris/thunkInventaris';
import InputFile from '../../Elements/Input/InputFile';
import { formatDateInput } from '../FormatDate/FormatDateInput';
import InputDate from '../../Elements/Input/InputDate';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const InputInventaris = ({ idEdit, setIdEdit }) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.inventaris.data);

  // INPUT & EDIT
  const dataId = data.map((dataFix) => dataFix.id);
  const dataEdit = data.filter((f) => f.id === idEdit)[0];
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');

  const [formValues, setFormValues] = useState({
    tanggal: '',
    namaProyek: '',
    volume: '',
    biaya: '',
    lokasi: '',
    keterangan: '',
    fotoSebelum: null,
    fotoProses: null,
    fotoSesudah: null,
  });

  const form = useRef(null);

  useEffect(() => {
    if (dataEdit) {
      setTitle('Edit Data Inventaris');
      setCaption('Simpan Perubahan');

      // Jika dataEdit tersedia, atur nilai formValues sesuai dataEdit
      setFormValues({
        tanggal: formatDateInput(dataEdit.tanggal),
        namaProyek: dataEdit.namaProyek,
        volume: dataEdit.volume,
        biaya: dataEdit.biaya,
        lokasi: dataEdit.lokasi,
        keterangan: dataEdit.keterangan,
      });
    } else {
      setTitle('Input Data Inventaris');
      setCaption('Tambah Data');

      // Jika tidak ada dataEdit, reset nilai formValues
      setFormValues({
        tanggal: '',
        namaProyek: '',
        volume: '',
        biaya: '',
        lokasi: '',
        keterangan: '',
        fotoSebelum: null,
        fotoProses: null,
        fotoSesudah: null,
      });
    }
  }, [dataEdit]);

  // HANDLE SUBMIT
  const error = useSelector((state) => state.inventaris.error);
  useEffect(() => {
    if (error === 'gagal') {
      setTimeout(() => {
        window.location.reload();
      });
    }
  }, [error]);
  const handleSubmit = (event) => {
    event.preventDefault();
    const { tanggal, namaProyek, volume, biaya, lokasi, keterangan, fotoSebelum, fotoProses, fotoSesudah } = formValues;

    const formData = new FormData();
    formData.append('tanggal', tanggal);
    formData.append('namaProyek', namaProyek);
    formData.append('volume', volume);
    formData.append('biaya', biaya);
    formData.append('lokasi', lokasi);
    formData.append('keterangan', keterangan);
    formData.append('fotoSebelum', fotoSebelum);
    formData.append('fotoProses', fotoProses);
    formData.append('fotoSesudah', fotoSesudah);

    if (dataId.includes(dataEdit?.id)) {
      dispatch(updateInventaris({ id: dataEdit.id, data: formData }));
      setIdEdit('');
      toast.success('Update Data Berhasil');
    } else {
      dispatch(createInventaris(formData));
      toast.success('Tambah Data Berhasil');
    }

    // Reset nilai formulir
    form.current.reset();
    setFormValues({
      tanggal: '',
      namaProyek: '',
      volume: '',
      biaya: '',
      lokasi: '',
      keterangan: '',
      fotoSebelum: null,
      fotoProses: null,
      fotoSesudah: null,
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
        <h3 className="font-bold text-lg text-cyan-700">{title}</h3>
        <div className="w-full h-0.5 bg-cyan-700 my-2 rounded-full"></div>

        <form ref={form} action="" onSubmit={handleSubmit} className="flex flex-col gap-8" encType="multipart/form-data">
          <div className="grid grid-cols-2 gap-y-4 gap-x-7 mt-3 text-base">
            <InputDate label="Tanggal Inventaris" name="tanggalInv" value={formValues.tanggal} onChange={(e) => setFormValues({ ...formValues, tanggal: e.target.value })} />
            <Input name="namaProyek" label="Jenis / Nama Proyek" type="text" value={formValues.namaProyek} onChange={(e) => setFormValues({ ...formValues, namaProyek: e.target.value })} />
            <Input name="volume" label="Volume" type="text" value={formValues.volume} onChange={(e) => setFormValues({ ...formValues, volume: e.target.value })} />
            <Input name="biaya" label="Biaya" type="number" value={formValues.biaya} onChange={(e) => setFormValues({ ...formValues, biaya: e.target.value })} />
            <Input name="lokasi" label="Lokasi" type="text" value={formValues.lokasi} onChange={(e) => setFormValues({ ...formValues, lokasi: e.target.value })} />
            <Input name="keterangan" label="Keterangan" type="text" value={formValues.keterangan} onChange={(e) => setFormValues({ ...formValues, keterangan: e.target.value })} />
            <div>
              <InputFile accept=".jpg, .jpeg, .png" required={dataEdit ? '' : 'required'} label="Foto Sebelum ( jpg, jpeg, png )" name="fotoSebelum" onChange={(e) => setFormValues({ ...formValues, fotoSebelum: e.target.files[0] })} />
              {dataEdit && <div className="text-sm text-yellow-500 col-start-2 text-center">File sudah ada. Pilih ulang untuk mengganti</div>}
            </div>
            <div>
              <InputFile accept=".jpg, .jpeg, .png" required={dataEdit ? '' : 'required'} label="Foto Proses ( jpg, jpeg, png )" name="fotoProses" onChange={(e) => setFormValues({ ...formValues, fotoProses: e.target.files[0] })} />
              {dataEdit && <div className="text-sm text-yellow-500 col-start-2 text-center">File sudah ada. Pilih ulang untuk mengganti</div>}
            </div>
            <div>
              <InputFile accept=".jpg, .jpeg, .png" required={dataEdit ? '' : 'required'} label="Foto Sesudah ( jpg, jpeg, png )" name="fotoSesudah" onChange={(e) => setFormValues({ ...formValues, fotoSesudah: e.target.files[0] })} />
              {dataEdit && <div className="text-sm text-yellow-500 col-start-2 text-center">File sudah ada. Pilih ulang untuk mengganti</div>}
            </div>
          </div>
          <Button bgColor="bg-cyan-700 py-3" hoverBgColor="hover:bg-cyan-600">
            {caption}
          </Button>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={() => setIdEdit(null)}>close</button>
      </form>
    </dialog>
  );
};

export default InputInventaris;
