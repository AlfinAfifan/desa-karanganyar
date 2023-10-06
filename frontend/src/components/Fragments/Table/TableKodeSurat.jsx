import React from 'react';
import Table from '../../Elements/Table/Table';
import Thead from '../../Elements/Table/Thead';
import Tbody from '../../Elements/Table/Tbody';
import InputKodeSurat from '../ModalInput/InputKodeSurat';
import Button from '../../Elements/Button/Button';
import ButtonIcon from '../../Elements/Button/ButtonIcon';
import { HiOutlinePencilSquare, HiOutlineTrash } from 'react-icons/hi2';

const TableKodeSurat = () => {
  return (
    <>
      <div className="flex justify-between items-center mt-7">
        <Button bgColor="bg-cyan-600" hoverBgColor="hover:bg-cyan-700" onClick={() => document.getElementById('my_modal_3').showModal()}>
          Tambah Data
        </Button>

        <InputKodeSurat />

        <select className="select select-sm bg-transparent border-slate-600 hover:bg-slate-600 border-collapse border-2 px-4 hover:text-white">
          <option defaultValue>Filter</option>
          <option>Tanggal</option>
          <option>Nomor Surat</option>
        </select>
      </div>
      <Table>
        <Thead>
          <th>No</th>
          <th>Kode Surat</th>
          <th>Keterangan</th>
          <th></th>
        </Thead>
        <Tbody>
          <td className="font-semibold">1</td>
          <td>20 agustus</td>
          <td>Dinas Pendidikan</td>
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
        </Tbody>
      </Table>
    </>
  );
};

export default TableKodeSurat;
