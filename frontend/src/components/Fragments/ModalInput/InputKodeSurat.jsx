import React, { useEffect, useRef, useState } from 'react';
import Input from '../../Elements/Input/Input';
import Button from '../../Elements/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { createKodeSurat, updateKodeSurat } from '../../../redux/actions/kodeSurat/thunkKodeSurat';
import { toast } from 'react-toastify';

const InputKodeSurat = ({ idSelected, setIdSelected }) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.kodeSurat.data);

  // Input & Edit
  const dataId = data.map((dataFix) => dataFix.id);
  const dataEdit = data.filter((f) => f.id === idSelected)[0];
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');

  const [formValues, setFormValues] = useState({
    kodeSurat: '',
    keterangan: '',
  });

  const form = useRef(null);

  useEffect(() => {
    if (dataEdit) {
      setTitle('Edit Data Kode Surat');
      setCaption('Simpan Perubahan');

      // Jika dataEdit tersedia, atur nilai formValues sesuai dataEdit
      setFormValues({
        kodeSurat: dataEdit.kodeSurat,
        keterangan: dataEdit.keterangan,
      });
    } else {
      setTitle('Input Data Kode Surat');
      setCaption('Tambah Data');

      // Jika tidak ada dataEdit, reset nilai formValues
      setFormValues({
        kodeSurat: '',
        keterangan: '',
      });
    }
  }, [dataEdit]);

  // On SUbmit
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { kodeSurat, keterangan } = formValues;

    const formData = new FormData();
    formData.append('kodeSurat', kodeSurat);
    formData.append('keterangan', keterangan);

    if (dataId.includes(dataEdit?.id)) {
      dispatch(updateKodeSurat({ id: dataEdit.id, data: formData }));
      setIdSelected('');
    } else {
      dispatch(createKodeSurat(formData));
    }

    // Reset form
    form.current.reset();
    setFormValues({
      kodeSurat: '',
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
            <Input name="kodeSurat" label="Kode Surat" type="text" value={formValues.kodeSurat} onChange={(e) => setFormValues({ ...formValues, kodeSurat: e.target.value })} />
            <Input name="keterangan" label="Keterangan" type="text" value={formValues.keterangan} onChange={(e) => setFormValues({ ...formValues, keterangan: e.target.value })} />
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

export default InputKodeSurat;
