import React, { useEffect, useState } from 'react';
import Table from '../../Elements/Table/Table';
import Thead from '../../Elements/Table/Thead';
import Tr from '../../Elements/Table/Tr';
import InputKodeSurat from '../ModalInput/InputKodeSurat';
import Button from '../../Elements/Button/Button';
import ButtonIcon from '../../Elements/Button/ButtonIcon';
import { HiOutlinePencilSquare, HiOutlineTrash, HiPrinter } from 'react-icons/hi2';
import { useDispatch, useSelector } from 'react-redux';
import { deleteKodeSurat, getKodeSurat } from '../../../redux/actions/kodeSurat/thunkKodeSurat';
import ModalConfirm from '../../Elements/Modal/ModalConfirm';

const TableKodeSurat = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.kodeSurat.data);
  const [idSelected, setIdSelected] = useState(null);

  useEffect(() => {
    dispatch(getKodeSurat());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteKodeSurat(id));
  };
  return (
    <>
      <div className="flex justify-between items-center mt-7">
        <Button bgColor="bg-cyan-600" hoverBgColor="hover:bg-cyan-700" onClick={() => document.getElementById('my_modal_3').showModal()}>
          Tambah Data
        </Button>

        <Button border="border-gray-700 border-2" bgColor="transparent" textColor="text-gray-700" hoverBgColor="hover:bg-gray-700 hover:text-white">
          <HiPrinter />
          Cetak
        </Button>
      </div>
      <Table>
        <Thead>
          <th>No</th>
          <th>Kode Surat</th>
          <th>Keterangan</th>
          <th></th>
        </Thead>

        <tbody>
          {data
            .slice(0)
            .reverse()
            .map((datafix, index) => (
              <Tr key={index}>
                <td className="font-semibold ">{(index += 1)}</td>
                <td>{datafix.kodeSurat}</td>
                <td>{datafix.keterangan}</td>
                <td className="flex justify-end">
                  <div className="flex text-2xl">
                    {/* Hapus */}
                    <ButtonIcon
                      hoverBgColor="hover:bg-slate-200"
                      onClick={() => {
                        document.getElementById('my_modal_1').showModal(), setIdSelected(datafix.id);
                      }}
                    >
                      <HiOutlineTrash className="text-red-800" />
                    </ButtonIcon>

                    {/* Edit */}
                    <ButtonIcon
                      hoverBgColor="hover:bg-slate-200"
                      onClick={() => {
                        document.getElementById('my_modal_3').showModal(), setIdSelected(datafix.id);
                      }}
                    >
                      <HiOutlinePencilSquare className="text-cyan-800" />
                    </ButtonIcon>
                  </div>
                </td>
              </Tr>
            ))}
        </tbody>
      </Table>

      {/* Modal Input */}
      <InputKodeSurat idSelected={idSelected} setIdSelected={setIdSelected} />

      {/* Modal Delete */}
      <ModalConfirm title="Konfirmasi Hapus!" onClick={() => handleDelete(idSelected)}>
        Yakin untuk menghapus data ini ?
      </ModalConfirm>
    </>
  );
};

export default TableKodeSurat;
