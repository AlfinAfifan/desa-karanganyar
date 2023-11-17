import React, { useEffect, useRef, useState } from 'react';
import InputDate from '../../Elements/Input/InputDate';
import Input from '../../Elements/Input/Input';
import InputFile from '../../Elements/Input/InputFile';
import Button from '../../Elements/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import { createSuratKeluar, updateSuratKeluar } from '../../../redux/actions/suratKeluar/thunkSuratKeluar';

const InputSuratKeluar = ({ idSelected, setIdSelected }) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.suratKeluar.data);

  // Input & Edit
  const dataId = data.map((dataFix) => dataFix.id);
  const dataEdit = data.filter((f) => f.id === idSelected)[0];
  const [title, setTitle] = useState('');

  // Format input date
  const formatDateInput = (tanggal) => {
    // Change format date
    const date = new Date(tanggal);
    const formatNewDate = format(date, 'yyyy-MM-dd');

    return formatNewDate;
  };

  const [formValues, setFormValues] = useState({
    tanggal: '',
    nomor_surat: '',
    perihal: '',
    instansiDituju: '',
    penanggungJawab: '',
    tanggal_surat: '',
    keterangan: '',
    dokumen: null,
  });

  const form = useRef(null);

  useEffect(() => {
    if (dataEdit) {
      setTitle('Edit Data Surat Keluar');
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
      setTitle('Input Data Surat Keluar');

      // Jika tidak ada dataEdit, reset nilai formValues
      setFormValues({
        tanggal: '',
        nomor_surat: '',
        perihal: '',
        instansiDituju: '',
        penanggungJawab: '',
        tanggal_surat: '',
        keterangan: '',
        dokumen: null,
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
      dispatch(updateSuratKeluar({ id: dataEdit.id, data: formData }));
      setIdSelected('');
    } else {
      dispatch(createSuratKeluar(formData));
    }

    // Reset form
    form.current.reset();
    setFormValues({
      tanggal: '',
      nomor_surat: '',
      perihal: '',
      instansiDituju: '',
      penanggungJawab: '',
      tanggal_surat: '',
      keterangan: '',
      dokumen: null,
    });

    // Menutup modal
    document.getElementById('my_modal_3').close();
  };
  return (
    <dialog id="my_modal_3" className="modal">
      <div className="modal-box w-6/12 max-w-5xl">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() => {
              setIdSelected(null);
            }}
          >
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg text-cyan-600">{title}</h3>
        <div className="w-full h-0.5 bg-cyan-600 my-2 rounded-full"></div>

        <form action="" ref={form} className="flex flex-col gap-8" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-y-4 gap-x-7 mt-3 text-base">
            <InputDate label="Tanggal" name="tanggal" value={formValues.tanggal} onChange={(e) => setFormValues({ ...formValues, tanggal: e.target.value })} />
            <Input name="nomorSurat" label="Nomor Surat" type="text" placeholder="Masukkan nomor surat" value={formValues.nomor_surat} onChange={(e) => setFormValues({ ...formValues, nomor_surat: e.target.value })} />
            <Input name="perihal" label="Perihal" type="text" placeholder="Masukkan perihal surat" value={formValues.perihal} onChange={(e) => setFormValues({ ...formValues, perihal: e.target.value })} />
            <Input
              name="instansiDituju"
              label="Instansi Yang Dituju"
              type="text"
              placeholder="Masukkan instansi yang dituju"
              value={formValues.instansiDituju}
              onChange={(e) => setFormValues({ ...formValues, instansiDituju: e.target.value })}
            />
            <Input
              name="penanggungJawab"
              label="Penanggung Jawab"
              type="text"
              placeholder="Masukkan penanggung jawab surat"
              value={formValues.penanggungJawab}
              onChange={(e) => setFormValues({ ...formValues, penanggungJawab: e.target.value })}
            />
            <Input name="keterangan" label="Keterangan Surat" type="text" placeholder="Masukkan keterangan surat" value={formValues.keterangan} onChange={(e) => setFormValues({ ...formValues, keterangan: e.target.value })} />
            <InputDate label="Tanggal Surat" name="tanggalSurat" value={formValues.tanggatanggal_surat} onChange={(e) => setFormValues({ ...formValues, tanggal_surat: e.target.value })} />
            <InputFile label="Upload Dokumen" name="dokSuratMasuk" onChange={(e) => setFormValues({ ...formValues, dokumen: e.target.files[0] })} />
            {dataEdit && <div className="text-sm text-yellow-500 -mt-3 col-start-2 text-center">File sudah ada. Pilih ulang untuk mengganti</div>}
          </div>
          <Button bgColor="bg-cyan-600 py-3" hoverBgColor="hover:bg-cyan-700">
            Tambah Data
          </Button>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button
          onClick={() => {
            setIdSelected(null);
          }}
        >
          close
        </button>
      </form>
    </dialog>
  );
};

export default InputSuratKeluar;
