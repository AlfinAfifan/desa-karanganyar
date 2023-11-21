import React, { useEffect, useState } from 'react';
import Table from '../../Elements/Table/Table';
import Thead from '../../Elements/Table/Thead';
import Tr from '../../Elements/Table/Tr';
import InputPeraturan from '../ModalInput/InputPeraturan';
import Button from '../../Elements/Button/Button';
import ButtonIcon from '../../Elements/Button/ButtonIcon';
import { HiOutlinePencilSquare, HiOutlineSquare2Stack, HiOutlineTrash, HiPrinter } from 'react-icons/hi2';
import { useDispatch, useSelector } from 'react-redux';
import ModalConfirm from '../../Elements/Modal/ModalConfirm';
import ModalDetail from '../../Elements/Modal/ModalDetail';
import PdfViewer from '../PdfViewer/PdfViewer';
import { format } from 'date-fns';
import { deletePeraturan, getPeraturan } from '../../../redux/actions/peraturan/thunkPeraturan';

const TablePeraturan = () => {
  const dispatch = useDispatch();

  const data = useSelector((state) => state.peraturan.data);

  useEffect(() => {
    dispatch(getPeraturan());
  }, [dispatch]);

  // Format Nomor / tanggal keputusan
  const formatNoTgl = (tanggal, nomor) => {
    // Change format date
    const date = new Date(tanggal);
    const formatNewDate = format(date, 'dd/MM/yyyy');

    // Final format
    const finalFormat = `${nomor}/${formatNewDate}`;
    return finalFormat;
  };

  // Get Detail
  const [idSelected, setIdSelected] = useState(null);
  const [urlSelected, setUrlSelected] = useState(null);

  // DELETE DATA
  const handleDelete = (id) => {
    dispatch(deletePeraturan(id));
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
          <th>No & Tgl Keputusan</th>
          <th>Tentang</th>
          <th>Uraian Singkat</th>
          <th>No & Tgl Dilaporkan</th>
          <th>Keterangan</th>
          <th></th>
        </Thead>

        <tbody>
          {data
            .slice(0)
            .reverse()
            .map((datafix, index) => (
              <Tr key={index}>
                <td className="font-semibold">{(index += 1)}</td>
                <td>{formatNoTgl(datafix.tanggalPer, datafix.nomorPer)}</td>
                <td>{datafix.tentang}</td>
                <td>{datafix.uraianSingkat}</td>
                <td>{formatNoTgl(datafix.tanggalAcc, datafix.nomorAcc)}</td>
                <td>{datafix.keterangan}</td>
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

                    {/* Detail */}
                    <ButtonIcon
                      hoverBgColor="hover:bg-slate-200"
                      onClick={() => {
                        document.getElementById('modal_file').showModal(), setUrlSelected(datafix.url);
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
      <InputPeraturan idSelected={idSelected} setIdSelected={setIdSelected} />

      {/* Modal PDF */}
      <ModalDetail>
        <PdfViewer url={urlSelected} />
      </ModalDetail>

      <ModalConfirm title="Konfirmasi Hapus!" onClick={() => handleDelete(idSelected)}>
        Yakin untuk menghapus data ini ?
      </ModalConfirm>
    </>
  );
};

export default TablePeraturan;