import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InputDate from '../../Elements/Input/InputDate';
import Input from '../../Elements/Input/Input';
import TextArea from '../../Elements/Input/TextArea';
import InputFile from '../../Elements/Input/InputFile';
import Button from '../../Elements/Button/Button';
import { createKeputusan, updateKeputusan } from '../../../redux/actions/keputusan/thunkKeputusan';
import { formatDateInput } from '../FormatDate/FormatDateInput';
import { toast } from 'react-toastify';

const InputKeputusan = ({ setIdSelected, idSelected }) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.keputusan.data);

  // Input & Edit
  const dataId = data.map((dataFix) => dataFix.id);
  const dataEdit = data.filter((f) => f.id === idSelected)[0];
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');

  const [formValues, setFormValues] = useState({
    tanggalKep: '',
    nomorKep: '',
    tentang: '',
    uraianSingkat: '',
    tanggalLapor: '',
    nomorLapor: '',
    keterangan: '',
    dokKeputusan: null,
  });

  const form = useRef(null);

  useEffect(() => {
    if (dataEdit) {
      setTitle('Edit Data Keputusan Kepala Desa');
      setCaption('Simpan Perubahan');

      // Jika dataEdit tersedia, atur nilai formValues sesuai dataEdit
      setFormValues({
        tanggalKep: formatDateInput(dataEdit.tanggalKep),
        nomorKep: dataEdit.nomorKep,
        tentang: dataEdit.tentang,
        uraianSingkat: dataEdit.uraianSingkat,
        tanggalLapor: formatDateInput(dataEdit.tanggalLapor),
        nomorLapor: dataEdit.nomorLapor,
        keterangan: dataEdit.keterangan,
      });
    } else {
      setTitle('Input Data Keputusan Kepala Desa');
      setCaption('Tambah Data');

      // Jika tidak ada dataEdit, reset nilai formValues
      setFormValues({
        tanggalKep: '',
        nomorKep: '',
        tentang: '',
        uraianSingkat: '',
        tanggalLapor: '',
        nomorLapor: '',
        keterangan: '',
        dokKeputusan: null,
      });
    }
  }, [dataEdit]);

  // On SUbmit
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { tanggalKep, nomorKep, tentang, uraianSingkat, tanggalLapor, nomorLapor, keterangan, dokKeputusan } = formValues;

    const formData = new FormData();
    formData.append('tanggalKep', tanggalKep);
    formData.append('nomorKep', nomorKep);
    formData.append('tentang', tentang);
    formData.append('uraianSingkat', uraianSingkat);
    formData.append('tanggalLapor', tanggalLapor);
    formData.append('nomorLapor', nomorLapor);
    formData.append('keterangan', keterangan);
    formData.append('dokKeputusan', dokKeputusan);

    if (dataId.includes(dataEdit?.id)) {
      dispatch(updateKeputusan({ id: dataEdit.id, data: formData }));
      setIdSelected('');
      toast.success('Edit Data Berhasil');
    } else {
      dispatch(createKeputusan(formData));
      toast.success('Tambah Data Berhasil');
    }

    // Reset form
    form.current.reset();
    setFormValues({
      tanggalKep: '',
      nomorKep: '',
      tentang: '',
      uraianSingkat: '',
      tanggalLapor: '',
      nomorLapor: '',
      keterangan: '',
      dokKeputusan: null,
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
            <InputDate label="Tanggal Keputusan" name="tanggalKep" value={formValues.tanggalKep} onChange={(e) => setFormValues({ ...formValues, tanggalKep: e.target.value })} />
            <Input name="nomorKep" label="Nomor Keputusan" type="text" value={formValues.nomorKep} onChange={(e) => setFormValues({ ...formValues, nomorKep: e.target.value })} />
            <InputDate label="Tanggal Dilaporkan" name="tanggalLapor" value={formValues.tanggalLapor} onChange={(e) => setFormValues({ ...formValues, tanggalLapor: e.target.value })} />
            <Input name="nomorLapor" label="Nomor Dilaporkan" type="text" value={formValues.nomorLapor} onChange={(e) => setFormValues({ ...formValues, nomorLapor: e.target.value })} />
            <Input name="tentang" label="Tentang" type="text" colSpan="col-span-2" value={formValues.tentang} onChange={(e) => setFormValues({ ...formValues, tentang: e.target.value })} />
            <TextArea name="uraianSingkat" label="Uraian Singkat" type="text" colSpan="col-span-2" value={formValues.uraianSingkat} onChange={(e) => setFormValues({ ...formValues, uraianSingkat: e.target.value })} />

            <Input name="keterangan" label="Keterangan" type="text" value={formValues.keterangan} onChange={(e) => setFormValues({ ...formValues, keterangan: e.target.value })} />
            <InputFile required={dataEdit ? '' : 'required'} label="Upload Dokumen" name="dokKeputusan" onChange={(e) => setFormValues({ ...formValues, dokKeputusan: e.target.files[0] })} />
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

export default InputKeputusan;
