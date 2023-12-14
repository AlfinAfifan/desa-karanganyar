import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InputDate from '../../Elements/Input/InputDate';
import Input from '../../Elements/Input/Input';
import TextArea from '../../Elements/Input/TextArea';
import InputFile from '../../Elements/Input/InputFile';
import Button from '../../Elements/Button/Button';
import { createPeraturan, updatePeraturan } from '../../../redux/actions/peraturan/thunkPeraturan';
import { formatDateInput } from '../FormatDate/FormatDateInput';
import { toast } from 'react-toastify';

const InputPeraturan = ({ setIdSelected, idSelected }) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.peraturan.data);

  // Input & Edit
  const dataId = data.map((dataFix) => dataFix.id);
  const dataEdit = data.filter((f) => f.id === idSelected)[0];
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');

  const [formValues, setFormValues] = useState({
    tanggalPer: '',
    nomorPer: '',
    tentang: '',
    uraianSingkat: '',
    tanggalAcc: '',
    nomorAcc: '',
    keterangan: '',
    dokumen: null,
  });

  const form = useRef(null);

  useEffect(() => {
    if (dataEdit) {
      setTitle('Edit Data Peraturan Desa');
      setCaption('Simpan Perubahan');

      // Jika dataEdit tersedia, atur nilai formValues sesuai dataEdit
      setFormValues({
        tanggalPer: formatDateInput(dataEdit.tanggalPer),
        nomorPer: dataEdit.nomorPer,
        tentang: dataEdit.tentang,
        uraianSingkat: dataEdit.uraianSingkat,
        tanggalAcc: formatDateInput(dataEdit.tanggalAcc),
        nomorAcc: dataEdit.nomorAcc,
        keterangan: dataEdit.keterangan,
      });
    } else {
      setTitle('Input Data Peraturan Desa');
      setCaption('Tambah Data');

      // Jika tidak ada dataEdit, reset nilai formValues
      setFormValues({
        tanggalPer: '',
        nomorPer: '',
        tentang: '',
        uraianSingkat: '',
        tanggalAcc: '',
        nomorAcc: '',
        keterangan: '',
        dokumen: null,
      });
    }
  }, [dataEdit]);

  // On SUbmit
  const error = useSelector((state) => state.peraturan.error);
  useEffect(() => {
    if (error === 'gagal') {
      setTimeout(() => {
        window.location.reload();
      });
    }
  }, [error]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { tanggalPer, nomorPer, tentang, uraianSingkat, tanggalAcc, nomorAcc, keterangan, dokumen } = formValues;

    const formData = new FormData();
    formData.append('tanggalPer', tanggalPer);
    formData.append('nomorPer', nomorPer);
    formData.append('tentang', tentang);
    formData.append('uraianSingkat', uraianSingkat);
    formData.append('tanggalAcc', tanggalAcc);
    formData.append('nomorAcc', nomorAcc);
    formData.append('keterangan', keterangan);
    formData.append('dokumen', dokumen);

    if (dataId.includes(dataEdit?.id)) {
      dispatch(updatePeraturan({ id: dataEdit.id, data: formData }));
      setIdSelected('');
      toast.success('Edit Data Berhasil');
    } else {
      dispatch(createPeraturan(formData));
      toast.success('Tambah Data Berhasil');
    }

    // Reset form
    form.current.reset();
    setFormValues({
      tanggalPer: '',
      nomorPer: '',
      tentang: '',
      uraianSingkat: '',
      tanggalAcc: '',
      nomorAcc: '',
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
        <h3 className="font-bold text-lg text-cyan-700">{title}</h3>
        <div className="w-full h-0.5 bg-cyan-700 my-2 rounded-full"></div>

        <form action="" ref={form} className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-y-4 gap-x-7 mt-3 text-base">
            <InputDate label="Tanggal Keputusan" name="tanggalPer" value={formValues.tanggalPer} onChange={(e) => setFormValues({ ...formValues, tanggalPer: e.target.value })} />
            <Input name="nomorPer" label="Nomor Keputusan" type="text" value={formValues.nomorPer} onChange={(e) => setFormValues({ ...formValues, nomorPer: e.target.value })} />
            <InputDate label="Tanggal Dilaporkan" name="tanggalAcc" value={formValues.tanggalAcc} onChange={(e) => setFormValues({ ...formValues, tanggalAcc: e.target.value })} />
            <Input name="nomorAcc" label="Nomor Dilaporkan" type="text" value={formValues.nomorAcc} onChange={(e) => setFormValues({ ...formValues, nomorAcc: e.target.value })} />
            <Input name="tentang" label="Tentang" type="text" colSpan="col-span-2" value={formValues.tentang} onChange={(e) => setFormValues({ ...formValues, tentang: e.target.value })} />
            <TextArea name="uraianSingkat" label="Uraian Singkat" type="text" colSpan="col-span-2" value={formValues.uraianSingkat} onChange={(e) => setFormValues({ ...formValues, uraianSingkat: e.target.value })} />
            <Input name="keterangan" label="Keterangan" type="text" value={formValues.keterangan} onChange={(e) => setFormValues({ ...formValues, keterangan: e.target.value })} />
            <InputFile accept=".pdf" required={dataEdit ? '' : 'required'} label="Upload Dokumen ( pdf )" name="dokumen" onChange={(e) => setFormValues({ ...formValues, dokumen: e.target.files[0] })} />
            {dataEdit && <div className="text-sm text-yellow-500 -mt-3 col-start-2 text-center">File sudah ada. Pilih ulang untuk mengganti</div>}
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

export default InputPeraturan;
