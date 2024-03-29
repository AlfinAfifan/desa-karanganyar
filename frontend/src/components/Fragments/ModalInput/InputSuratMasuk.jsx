import React, { useEffect, useRef, useState } from 'react';
import InputDate from '../../Elements/Input/InputDate';
import Input from '../../Elements/Input/Input';
import InputFile from '../../Elements/Input/InputFile';
import Button from '../../Elements/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { createSuratMasuk, updateSuratMasuk } from '../../../redux/actions/suratMasuk/thunkSuratMasuk';
import { formatDateInput } from '../FormatDate/FormatDateInput';
import { toast } from 'react-toastify';

const InputSuratMasuk = ({ idSelected, setIdSelected, year }) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.suratMasuk.data);

  // Input & Edit
  const dataId = data.map((dataFix) => dataFix.id);
  const dataEdit = data.filter((f) => f.id === idSelected)[0];
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');

  const [formValues, setFormValues] = useState({
    tanggal: '',
    nomor_surat: '',
    perihal: '',
    instansiDituju: '',
    penanggungJawab: '',
    tanggal_surat: '',
    keterangan: '',
    dokumen: '',
  });

  const form = useRef(null);

  useEffect(() => {
    if (dataEdit) {
      setTitle('Edit Data Surat Masuk');
      setCaption('Simpan Perubahan');

      // Jika dataEdit tersedia, atur nilai formValues sesuai dataEdit
      setFormValues({
        tanggal: formatDateInput(dataEdit.tanggal),
        nomor_surat: dataEdit.nomor_surat,
        perihal: dataEdit.perihal,
        instansiDituju: dataEdit.instansiDituju,
        penanggungJawab: dataEdit.penanggungJawab,
        tanggal_surat: formatDateInput(dataEdit.tanggal_surat),
        keterangan: dataEdit.keterangan,
      });
    } else {
      setTitle('Input Data Surat Masuk');
      setCaption('Tambah Data');

      // Jika tidak ada dataEdit, reset nilai formValues
      setFormValues({
        tanggal: '',
        nomor_surat: '',
        perihal: '',
        instansiDituju: '',
        penanggungJawab: '',
        tanggal_surat: '',
        keterangan: '',
        dokumen: '',
      });
    }
  }, [dataEdit]);

  // On SUbmit
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { tanggal, nomor_surat, perihal, instansiDituju, penanggungJawab, tanggal_surat, keterangan, dokumen } = formValues;

    const formData = new FormData();
    formData.append('tanggal', tanggal);
    formData.append('nomor_surat', nomor_surat);
    formData.append('perihal', perihal);
    formData.append('instansiDituju', instansiDituju);
    formData.append('penanggungJawab', penanggungJawab);
    formData.append('tanggal_surat', tanggal_surat);
    formData.append('keterangan', keterangan);
    formData.append('dokumen', dokumen);

    if (dataId.includes(dataEdit?.id)) {
      dispatch(updateSuratMasuk({ id: dataEdit.id, data: formData }));
      setIdSelected('');
    } else {
      dispatch(createSuratMasuk(formData));
    }

    // Reset form
    form.current.reset();
    setFormValues({
      tanggal: '',
      nomor_surat: '',
      kodeSurat: '',
      noUrut: '',
      perihal: '',
      instansiDituju: '',
      penanggungJawab: '',
      tanggal_surat: '',
      keterangan: '',
      dokumen: '',
    });

    // Menutup modal
    document.getElementById('my_modal_3').close();
  };

  return (
    <dialog id="my_modal_3" className="modal">
      <div className="modal-box w-6/12 max-w-5xl">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => setIdSelected(null)}>
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg text-cyan-700">{title}</h3>
        <div className="w-full h-0.5 bg-cyan-700 my-2 rounded-full"></div>

        <form ref={form} action="" className="flex flex-col gap-8" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-y-4 gap-x-7 mt-3 text-base">
            <InputDate label="Tanggal" name="tanggal" value={formValues.tanggal || ''} onChange={(e) => setFormValues({ ...formValues, tanggal: e.target.value })} />
            <div className="flex flex-col gap-1">
              <label>Hasil Nomor Surat</label>
              <input onChange={() => setFormValues} disabled value={formValues.nomor_surat || ''} className="input font-bold input-bordered border-slate-600 w-full" />
            </div>

            <Input name="nomorUrut" label="Nomor Surat" type="text" value={formValues.nomor_surat || ''} onChange={(e) => setFormValues({ ...formValues, nomor_surat: e.target.value })} />
            <InputDate label="Tanggal Surat" name="tanggalSurat" value={formValues.tanggal_surat || ''} onChange={(e) => setFormValues({ ...formValues, tanggal_surat: e.target.value })} />
            <Input name="perihal" label="Perihal" type="text" value={formValues.perihal || ''} onChange={(e) => setFormValues({ ...formValues, perihal: e.target.value })} />
            <Input name="instansiDituju" label="Dari" type="text" value={formValues.instansiDituju || ''} onChange={(e) => setFormValues({ ...formValues, instansiDituju: e.target.value })} />
            <Input name="penanggungJawab" label="Penanggung Jawab" type="text" value={formValues.penanggungJawab || ''} onChange={(e) => setFormValues({ ...formValues, penanggungJawab: e.target.value })} />
            <Input name="keterangan" label="Keterangan Surat" type="text" value={formValues.keterangan || ''} onChange={(e) => setFormValues({ ...formValues, keterangan: e.target.value })} />
            <InputFile accept=".pdf" required={dataEdit ? '' : 'required'} label="Upload Dokumen ( pdf )" name="dokSuratMasuk" onChange={(e) => setFormValues({ ...formValues, dokumen: e.target.files[0] })} />
            {dataEdit && <div className="text-sm text-yellow-500 -mt-3 col-start-1 text-center">File sudah ada. Pilih ulang untuk mengganti</div>}
          </div>
          <Button bgColor="bg-cyan-700 py-3" hoverBgColor="hover:bg-cyan-600">
            {caption}
          </Button>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={() => setIdSelected(null)}>close</button>
      </form>
    </dialog>
  );
};

export default InputSuratMasuk;
