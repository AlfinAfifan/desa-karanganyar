import React, { useEffect, useState } from 'react';
import Button from '../../Elements/Button/Button';
import { HiOutlinePencilSquare, HiOutlineTrash, HiPrinter } from 'react-icons/hi2';
import Table from '../../Elements/Table/Table';
import Thead from '../../Elements/Table/Thead';
import Tr from '../../Elements/Table/Tr';
import ButtonIcon from '../../Elements/Button/ButtonIcon';
import InputPerundanganKep from '../ModalInput/InputPerundangKep';
import ModalConfirm from '../../Elements/Modal/ModalConfirm';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import { deletePerundanganKep, getPerundanganKep } from '../../../redux/actions/perundanganKeputusan/thunkPerundanganKep';

const TablePengundangKep = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.perundanganKep.data);

  useEffect(() => {
    dispatch(getPerundanganKep());
  }, [dispatch]);

  // Format Nomor / tanggal keputusan
  const formatDate = (tanggal) => {
    // Change format date
    const date = new Date(tanggal);
    const formatNewDate = format(date, 'dd/MM/yyyy');

    return formatNewDate;
  };

  // Get Detail
  const [idSelected, setIdSelected] = useState(null);

  // DELETE DATA
  const handleDelete = (id) => {
    dispatch(deletePerundanganKep(id));
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
          <th>No Peraturan</th>
          <th>Tanggal Penetapan</th>
          <th>Tentang</th>
          <th>Tanggal Pengundangan</th>
          <th>Tambahan / Lembaran Desa</th>
          <th></th>
        </Thead>

        <tbody>
          {data
            .slice(0)
            .reverse()
            .map((datafix, index) => (
              <Tr key={index}>
                <td className="font-semibold">{(index += 1)}</td>
                <td>{datafix.noPeraturan}</td>
                <td>{formatDate(datafix.tglPenetapan)}</td>
                <td>{datafix.tentang}</td>
                <td>{formatDate(datafix.tglPengundangan)}</td>
                <td>{datafix.tambahanLembaran}</td>
                <td className="flex justify-end">
                  <div className="flex text-xl">
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

      {/* MODAL */}
      <InputPerundanganKep idSelected={idSelected} setIdSelected={setIdSelected} />

      <ModalConfirm title="Konfirmasi Hapus!" onClick={() => handleDelete(idSelected)}>
        Yakin untuk menghapus data ini ?
      </ModalConfirm>
    </>
  );
};

export default TablePengundangKep;
