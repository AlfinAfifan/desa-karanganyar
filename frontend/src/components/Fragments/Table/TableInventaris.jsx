import React, { useEffect, useState } from 'react';
import Table from '../../Elements/Table/Table';
import Thead from '../../Elements/Table/Thead';
import Tr from '../../Elements/Table/Tr';
import InputInventaris from '../ModalInput/InputInventaris';
import Button from '../../Elements/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import ButtonIcon from '../../Elements/Button/ButtonIcon';
import { HiOutlinePencilSquare, HiOutlineSquare2Stack, HiOutlineTrash, HiPrinter } from 'react-icons/hi2';
import ModalConfirm from '../../Elements/Modal/ModalConfirm';
import ModalDetail from '../../Elements/Modal/ModalDetail';
import { getInventaris } from '../../../redux/actions/inventaris/thunkInventaris';

const TableInventaris = () => {
  // Fetch API
  const dispatch = useDispatch();

  const data = useSelector((state) => state.inventaris.data);

  useEffect(() => {
    dispatch(getInventaris());
  }, []);

  // Get Detail
  const [idSelected, setIdSelected] = useState(null);
  const [detail, setDetail] = useState({
    fotoSebelum: '',
    fotoProses: '',
    fotoSebelum: '',
    urlSebelum: '',
    urlProses: '',
    urlSebelum: '',
  });

  const detailData = data.filter((f) => f.id === idSelected)[0];

  useEffect(() => {
    if (detailData) {
      setDetail({
        fotoSebelum: detailData.fotoSebelum,
        fotoProses: detailData.fotoProses,
        fotoSesudah: detailData.fotoSesudah,
        urlSebelum: detailData.urlSebelum,
        urlProses: detailData.urlProses,
        urlSesudah: detailData.urlSesudah,
      });
    }
  }, [detailData]);

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
          <th>Jenis/Nama Proyek</th>
          <th>Volume</th>
          <th>Biaya</th>
          <th>Lokasi</th>
          <th>Keterangan</th>
          <th></th>
        </Thead>

        <tbody>
          {data.map((datafix, index) => (
            <Tr key={index}>
              <td className="font-semibold cursor-pointer">{(index += 1)}</td>
              <td>{datafix.namaProyek}</td>
              <td>{datafix.volume}</td>
              <td>{datafix.biaya.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</td>
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
            </Tr>
          ))}
        </tbody>
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
