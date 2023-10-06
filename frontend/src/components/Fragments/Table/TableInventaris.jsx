import React, { useEffect, useState } from 'react';
import Table from '../../Elements/Table/Table';
import Thead from '../../Elements/Table/Thead';
import Tbody from '../../Elements/Table/Tbody';
import InputInventaris from '../ModalInput/InputInventaris';
import Button from '../../Elements/Button/Button';
import { useSelector } from 'react-redux';
import ButtonIcon from '../../Elements/Button/ButtonIcon';
import { HiOutlinePencilSquare, HiOutlineSquare2Stack, HiOutlineTrash } from 'react-icons/hi2';
import ModalConfirm from '../../Elements/Modal/ModalConfirm';
import ModalDetail from '../../Elements/Modal/ModalDetail';

const TableInventaris = () => {
  const data = useSelector((state) => state.inventaris);
  const [idSelected, setIdSelected] = useState(null);
  const [detail, setDetail] = useState({
    namaProyek: '',
    volume: '',
    biaya: '',
    lokasi: '',
    keterangan: '',
  });

  const detailData = data.filter((f) => f.id === idSelected)[0];

  useEffect(() => {
    if (detailData) {
      setDetail({
        namaProyek: detailData.namaProyek,
        volume: detailData.volume,
        biaya: detailData.biaya,
        lokasi: detailData.lokasi,
        keterangan: detailData.keterangan,
      });
    }
  }, [detailData]);

  return (
    <>
      <div className="flex justify-between items-center mt-7">
        <Button bgColor="bg-cyan-600" hoverBgColor="hover:bg-cyan-700" onClick={() => document.getElementById('my_modal_3').showModal()}>
          Tambah Data
        </Button>
        <select className="select select-sm bg-transparent border-slate-600 hover:bg-slate-600 border-collapse border-2 px-4 hover:text-white">
          <option defaultValue>Filter</option>
          <option>Tanggal</option>
          <option>Nomor Surat</option>
        </select>
      </div>
      <Table>
        <Thead>
          <th>No</th>
          <th>Jenis/Nama Proyek</th>
          <th>Volume</th>
          <th>Biaya</th>
          <th>Lokasi</th>
          <th>Keterangan</th>
          <th></th>
        </Thead>

        {data.map((datafix, index) => (
          <Tbody key={index}>
            <td className="font-semibold cursor-pointer">{datafix.id}</td>
            <td>{datafix.namaProyek}</td>
            <td>{datafix.volume}</td>
            <td>Rp. {datafix.biaya.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</td>
            <td>{datafix.lokasi}</td>
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
        ))}
      </Table>
      {/* MODAL */}
      <InputInventaris setIdEdit={setIdSelected} idEdit={idSelected} />

      <ModalConfirm id={idSelected} page="inventaris" title="Konfirmasi Hapus!">
        Yakin untuk menghapus data ini ?
      </ModalConfirm>

      <ModalDetail>
        <div className="grid grid-cols-3 gap-3 justify-center mt-3">
          <div className="grid justify-center">
            <img className="w-96 rounded-t-lg" src="https://feb.umsu.ac.id/wp-content/uploads/2023/06/sejarah-pembangunan-ekonomi-di-indonesia-1-scaled.jpg" alt="" />
            <h1 className="font-semibold rounded-b-lg bg-cyan-600 text-white py-1">Foto Sebelum</h1>
          </div>
          <div className="grid justify-center">
            <img className="w-96 rounded-t-lg" src="https://feb.umsu.ac.id/wp-content/uploads/2023/06/sejarah-pembangunan-ekonomi-di-indonesia-1-scaled.jpg" alt="" />
            <h1 className="font-semibold rounded-b-lg bg-cyan-600 text-white py-1">Foto Proses</h1>
          </div>
          <div className="grid justify-center">
            <img className="w-96 rounded-t-lg" src="https://feb.umsu.ac.id/wp-content/uploads/2023/06/sejarah-pembangunan-ekonomi-di-indonesia-1-scaled.jpg" alt="" />
            <h1 className="font-semibold rounded-b-lg bg-cyan-600 text-white py-1">Foto Sesudah</h1>
          </div>
        </div>
      </ModalDetail>
    </>
  );
};

export default TableInventaris;
