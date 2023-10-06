import React from 'react';
import Table from '../../Elements/Table/Table';
import Thead from '../../Elements/Table/Thead';
import Tbody from '../../Elements/Table/Tbody';
import Button from '../../Elements/Button/Button';
import InputSuratMasuk from '../ModalInput/InputSuratMasuk';
import ButtonIcon from '../../Elements/Button/ButtonIcon';
import { HiOutlinePencilSquare, HiOutlineSquare2Stack, HiOutlineTrash } from 'react-icons/hi2';
import ModalDetail from '../../Elements/Modal/ModalDetail';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import file from '../../../assets/file/Profile.pdf';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const TableSuratMasuk = () => {
  const newPlugin = defaultLayoutPlugin();

  return (
    <>
      <div className="flex justify-between items-center mt-7">
        <Button bgColor="bg-cyan-600" hoverBgColor="hover:bg-cyan-700" onClick={() => document.getElementById('my_modal_3').showModal()}>
          Tambah Data
        </Button>

        <InputSuratMasuk />

        <select className="select select-sm bg-transparent border-slate-600 hover:bg-slate-600 border-collapse border-2 px-4 hover:text-white">
          <option defaultValue>Filter</option>
          <option>Tanggal</option>
          <option>Nomor Surat</option>
        </select>
      </div>
      <Table>
        <Thead>
          <th>No</th>
          <th>Tanggal</th>
          <th>Nomor Surat</th>
          <th>Perihal</th>
          <th>Instansi Dituju</th>
          <th>Penanggung Jawab</th>
          <th>Tanggal Surat</th>
          <th>Keterangan</th>
          <th></th>
        </Thead>
        <Tbody>
          <td className="font-semibold">1</td>
          <td>20 agustus</td>
          <td>21334</td>
          <td>Pemecatan</td>
          <td>Kantor Polisi</td>
          <td>Kantor Polisi</td>
          <td>Kantor Polisi</td>
          <td>Kantor Polisi</td>
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

              {/* Detail */}
              <ButtonIcon
                hoverBgColor="hover:bg-slate-200"
                onClick={() => {
                  document.getElementById('modal_file').showModal(), setIdSelected(datafix.id);
                }}
              >
                <HiOutlineSquare2Stack className="text-yellow-600" />
              </ButtonIcon>
            </div>
          </td>
        </Tbody>
      </Table>

      <ModalDetail>
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
          <Viewer fileUrl={file} plugins={[newPlugin]} />;
        </Worker>
      </ModalDetail>
    </>
  );
};

export default TableSuratMasuk;
