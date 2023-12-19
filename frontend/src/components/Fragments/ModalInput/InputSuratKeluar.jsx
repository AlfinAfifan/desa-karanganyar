import React, { useEffect, useRef, useState } from 'react';
import InputDate from '../../Elements/Input/InputDate';
import Input from '../../Elements/Input/Input';
import InputFile from '../../Elements/Input/InputFile';
import Button from '../../Elements/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { createSuratKeluar, updateSuratKeluar } from '../../../redux/actions/suratKeluar/thunkSuratKeluar';
import { formatDateInput } from '../FormatDate/FormatDateInput';
import { getKodeSurat } from '../../../redux/actions/kodeSurat/thunkKodeSurat';
import { toast } from 'react-toastify';

const InputSuratKeluar = ({ idSelected, setIdSelected, year }) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.suratKeluar.data);

  // Input & Edit
  const dataId = data.map((dataFix) => dataFix.id);
  const dataEdit = data.filter((f) => f.id === idSelected)[0];
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');

  const [formValues, setFormValues] = useState({
    tanggal: '',
    nomor_surat: '',
    inputKode: '',
    noUrut: '',
    yearInput: '',
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

      // Split no surat
      const split = dataEdit.nomor_surat.split('/');
      const kodeSurat = split[0];
      const nomorUrut = split[1];
      const yearInput = split[3];

      // Jika dataEdit tersedia, atur nilai formValues sesuai dataEdit
      setFormValues({
        tanggal: formatDateInput(dataEdit.tanggal),
        nomor_surat: dataEdit.nomor_surat,
        inputKode: kodeSurat,
        noUrut: nomorUrut,
        yearInput: yearInput,
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
        inputKode: '',
        noUrut: '',
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
  const error = useSelector((state) => state.suratKeluar.error);
  useEffect(() => {
    if (error === 'gagal') {
      setTimeout(() => {
        window.location.reload();
      });
    }
  }, [error]);
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
      toast.success('Edit Data Berhasil');
    } else {
      dispatch(createSuratKeluar(formData));
      toast.success('Tambah Data Berhasil');
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

  // OPTION KODE SURAT
  const [kodeFiltered, setKodeFiltered] = useState([]);
  const [dropdownActive, setDropdownActive] = useState('');

  const kodeSurat = useSelector((state) => state.kodeSurat.data);
  const kodeSort = [...kodeSurat].sort((a, b) => {
    return a.kodeSurat.localeCompare(b.kodeSurat);
  });

  useEffect(() => {
    dispatch(getKodeSurat());
  }, [dispatch]);

  const handleDropdown = (value) => {
    setFormValues({ ...formValues, inputKode: value });

    const result = kodeSort.filter((kode) => kode.keterangan.toLowerCase().includes(value.toLowerCase()) || kode.kodeSurat.toLowerCase().includes(value.toLowerCase()));
    setKodeFiltered(result);
  };

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownActive(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  // HANDLE NOMOR SURAT
  const handleKodeSurat = (kode) => {
    const yearInput = new Date(formValues.yearInput).getFullYear();
    setFormValues((prev) => {
      return {
        ...prev,
        nomor_surat: `${kode}/${formValues.noUrut}/406.10.2008/${yearInput ? yearInput : 'tahun'}`,
        inputKode: kode,
      };
    });
  };

  const handleNoSurat = (value) => {
    const yearInput = new Date(formValues.yearInput).getFullYear();
    setFormValues((prevFormValues) => {
      return {
        ...prevFormValues,
        noUrut: value,
        nomor_surat: `${formValues.inputKode}/${value}/406.10.2008/${yearInput ? yearInput : 'tahun'}`,
      };
    });
  };

  // HANDLE YEAR INPUT
  const handleYearInput = (date) => {
    const yearInput = new Date(date).getFullYear();
    setFormValues((prevFormValues) => {
      return {
        ...prevFormValues,
        yearInput: date,
        nomor_surat: `${formValues.inputKode}/${formValues.noUrut}/406.10.2008/${yearInput}`,
      };
    });
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

        <form action="" ref={form} className="flex flex-col gap-8" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-y-4 gap-x-7 mt-3 text-base">
            <InputDate label="Tanggal" name="tanggal" value={formValues.tanggal || ''} onChange={(e) => setFormValues({ ...formValues, tanggal: e.target.value })} />
            <div className="flex flex-col gap-1">
              <label>Hasil Nomor Surat</label>
              <input onChange={() => setFormValues} disabled value={formValues.nomor_surat || ''} className="input font-bold input-bordered border-slate-600 w-full" />
            </div>
            <div className="relative " onClick={() => setDropdownActive(!dropdownActive)}>
              <Input name="kodeSurat" label="Kode Surat" type="text" placeholder="Cari kode surat" value={formValues.inputKode || ''} onChange={(e) => handleDropdown(e.target.value)} />
              <div ref={dropdownRef} className={`absolute  w-full mt-2  py-2 rounded-xl ${dropdownActive ? '' : 'hidden'} ${kodeFiltered.length > 0 ? 'bg-slate-200' : 'bg-red-200'}`}>
                {kodeFiltered.length > 0 ? (
                  kodeFiltered.map((kode, idx) => (
                    <div key={idx} onClick={() => handleKodeSurat(kode.kodeSurat)} className="hover:bg-white px-2 py-0.5 mx-2 rounded-lg cursor-pointer">
                      {kode.keterangan}
                    </div>
                  ))
                ) : (
                  <div className="px-2 py-0.5 mx-2">Kode Surat Tidak Ditemukan</div>
                )}
              </div>
            </div>
            <Input name="nomorUrut" label="Nomor Urut Surat" type="text" value={formValues.noUrut || ''} onChange={(e) => handleNoSurat(e.target.value)} />
            <InputDate
              label="Tanggal Surat"
              name="tanggalSurat"
              value={formValues.tanggal_surat || ''}
              onChange={(e) => {
                setFormValues({ ...formValues, tanggal_surat: e.target.value });
                handleYearInput(e.target.value);
              }}
            />
            <Input name="perihal" label="Perihal" type="text" value={formValues.perihal || ''} onChange={(e) => setFormValues({ ...formValues, perihal: e.target.value })} />
            <Input name="instansiDituju" label="Instansi Yang Dituju" type="text" value={formValues.instansiDituju || ''} onChange={(e) => setFormValues({ ...formValues, instansiDituju: e.target.value })} />
            <Input name="penanggungJawab" label="Penanggung Jawab" type="text" value={formValues.penanggungJawab || ''} onChange={(e) => setFormValues({ ...formValues, penanggungJawab: e.target.value })} />
            <Input name="keterangan" label="Keterangan Surat" type="text" value={formValues.keterangan || ''} onChange={(e) => setFormValues({ ...formValues, keterangan: e.target.value })} />
            <InputFile accept=".pdf" required={dataEdit ? '' : 'required'} label="Upload Dokumen ( pdf )" name="dokSuratMasuk" onChange={(e) => setFormValues({ ...formValues, dokumen: e.target.files[0] })} />
            {dataEdit && <div className="text-sm text-yellow-500 -mt-3 col-start-2 text-center">File sudah ada. Pilih ulang untuk mengganti</div>}
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

export default InputSuratKeluar;
