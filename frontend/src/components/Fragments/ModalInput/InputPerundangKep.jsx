import React, { useEffect, useRef, useState } from 'react';
import InputDate from '../../Elements/Input/InputDate';
import Input from '../../Elements/Input/Input';
import Button from '../../Elements/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { createPerundanganKep, updatePerundanganKep } from '../../../redux/actions/perundanganKeputusan/thunkPerundanganKep';
import { formatDateInput } from '../FormatDate/FormatDateInput';
import { toast } from 'react-toastify';

const InputPerundangKep = ({ idSelected, setIdSelected }) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.perundanganKep.data);

  // Input & Edit
  const dataId = data.map((dataFix) => dataFix.id);
  const dataEdit = data.filter((f) => f.id === idSelected)[0];
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');

  const [formValues, setFormValues] = useState({
    noPeraturan: '',
    tglPenetapan: '',
    tentang: '',
    tglPengundangan: '',
    tambahanLembaran: '',
  });

  const form = useRef(null);

  useEffect(() => {
    if (dataEdit) {
      setTitle('Edit Data Perundangan Keputusan');
      setCaption('Simpan Perubahan');

      // Jika dataEdit tersedia, atur nilai formValues sesuai dataEdit
      setFormValues({
        noPeraturan: dataEdit.noPeraturan,
        tglPenetapan: formatDateInput(dataEdit.tglPenetapan),
        tentang: dataEdit.tentang,
        tglPengundangan: formatDateInput(dataEdit.tglPengundangan),
        tambahanLembaran: dataEdit.tambahanLembaran,
      });
    } else {
      setTitle('Input Data Perundangan Keputusan');
      setCaption('Tambah Data');

      // Jika tidak ada dataEdit, reset nilai formValues
      setFormValues({
        noPeraturan: '',
        tglPenetapan: '',
        tentang: '',
        tglPengundangan: '',
        tambahanLembaran: '',
      });
    }
  }, [dataEdit]);

  // On SUbmit
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { noPeraturan, tglPenetapan, tentang, tglPengundangan, tambahanLembaran } = formValues;

    const formData = new FormData();
    formData.append('noPeraturan', noPeraturan);
    formData.append('tglPenetapan', tglPenetapan);
    formData.append('tentang', tentang);
    formData.append('tglPengundangan', tglPengundangan);
    formData.append('tambahanLembaran', tambahanLembaran);

    if (dataId.includes(dataEdit?.id)) {
      dispatch(updatePerundanganKep({ id: dataEdit.id, data: formData }));
      setIdSelected('');
      toast.success('Edit Data Berhasil');
    } else {
      dispatch(createPerundanganKep(formData));
      toast.success('Tambah Data Berhasil');
    }

    // Reset form
    form.current.reset();
    setFormValues({
      noPeraturan: '',
      tglPenetapan: '',
      tentang: '',
      tglPengundangan: '',
      tambahanLembaran: '',
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
        <h3 className="font-bold text-lg text-cyan-700">{title}</h3>
        <div className="w-full h-0.5 bg-cyan-700 my-2 rounded-full"></div>

        <form action="" ref={form} className="flex flex-col gap-8" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-y-4 gap-x-7 mt-3 text-base">
            <Input name="nomorPeraturan" label="Nomor Peraturan" type="text" value={formValues.noPeraturan} onChange={(e) => setFormValues({ ...formValues, noPeraturan: e.target.value })} />
            <InputDate label="Tanggal Penetapan" name="tanggalPenetapan" value={formValues.tglPenetapan} onChange={(e) => setFormValues({ ...formValues, tglPenetapan: e.target.value })} />
            <Input name="tentang" label="Tentang" colSpan="col-span-2" type="text" value={formValues.tentang} onChange={(e) => setFormValues({ ...formValues, tentang: e.target.value })} />
            <Input name="lembaranDesa" label="Tambahan / Lembaran Desa" type="text" value={formValues.tambahanLembaran} onChange={(e) => setFormValues({ ...formValues, tambahanLembaran: e.target.value })} />
            <InputDate label="Tanggal Pengundangan" name="tanggalPengundangan" value={formValues.tglPengundangan} onChange={(e) => setFormValues({ ...formValues, tglPengundangan: e.target.value })} />
          </div>
          <Button bgColor="bg-cyan-700 py-3" hoverBgColor="hover:bg-cyan-600">
            {caption}
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

export default InputPerundangKep;
