import React, { useEffect, useState } from 'react';
import Table from '../../Elements/Table/Table';
import Thead from '../../Elements/Table/Thead';
import Tr from '../../Elements/Table/Tr';
import InputPeraturan from '../ModalInput/InputPeraturan';
import Button from '../../Elements/Button/Button';
import ButtonIcon from '../../Elements/Button/ButtonIcon';
import { HiCloudArrowUp, HiOutlinePencilSquare, HiOutlineSquare2Stack, HiOutlineTrash, HiPrinter } from 'react-icons/hi2';
import { useDispatch, useSelector } from 'react-redux';
import ModalConfirm from '../../Elements/Modal/ModalConfirm';
import ModalDetail from '../../Elements/Modal/ModalDetail';
import PdfViewer from '../PdfViewer/PdfViewer';
import { deletePeraturan, getPeraturan } from '../../../redux/actions/peraturan/thunkPeraturan';
import { formatDate } from '../FormatDate/FormatDate';
import { formatNoTgl } from '../FormatDate/FormatNoTgl';
import { ExportPeraturan } from '../Export/ExportPeraturan';
import { toast } from 'react-toastify';

const TablePeraturan = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.peraturan.data);
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    dispatch(getPeraturan());
  }, [dispatch]);

  // SORT TAHUN DROPDOWN
  const dropdownYears = [...new Set(data.map((item) => new Date(item.tanggalPer).getFullYear()))].sort((a, b) => b - a);

  // Filter berdasarkan tahun
  const [selectedYear, setSelectedYear] = useState('');
  const latestYear = Math.max(...data.map((item) => new Date(item.tanggalPer).getFullYear()));

  useEffect(() => {
    selectedYear ? handleFilter(selectedYear) : handleFilter(latestYear.toString());
  }, [data]);

  const handleFilter = (year) => {
    const filtered = data.filter((item) => {
      const suratYear = new Date(item.tanggalPer).getFullYear().toString();
      return year === '' || suratYear === year;
    });

    setFilteredData(filtered);
  };

  // SEARCH
  const year = selectedYear ? selectedYear : latestYear.toString();

  const handleSearch = (value) => {
    const filtered = data.filter((item) => {
      const suratYear = new Date(item.tanggalPer).getFullYear().toString();
      const isMatchingYear = suratYear === year;

      if (isMatchingYear) {
        return (
          item.nomorPer.toLowerCase().includes(value.toLowerCase()) ||
          item.tentang.toLowerCase().includes(value.toLowerCase()) ||
          item.uraianSingkat.toLowerCase().includes(value.toLowerCase()) ||
          item.nomorAcc.toLowerCase().includes(value.toLowerCase()) ||
          item.keterangan.toLowerCase().includes(value.toLowerCase()) ||
          formatDate(item.tanggalPer).includes(value) ||
          formatDate(item.tanggalAcc).includes(value)
        );
      }

      return false;
    });

    setFilteredData(filtered);
  };

  // Get Detail
  const [idSelected, setIdSelected] = useState(null);
  const [urlSelected, setUrlSelected] = useState(null);

  // DELETE DATA
  const handleDelete = (id) => {
    dispatch(deletePeraturan(id));
    toast.success('Hapus Data Berhasil');
  };

  return (
    <>
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="text-xl font-medium roboto flex items-center gap-3">
          Data Peraturan Desa
          <select
            onChange={(e) => {
              handleFilter(e.target.value), setSelectedYear(e.target.value);
            }}
            value={selectedYear}
            className="select select-bordered border-slate-600 border-2 max-w-xs select-sm text-base"
          >
            {dropdownYears.map((year) => (
              <option key={year} value={year.toString()}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div className="form-control">
          <input onChange={(e) => handleSearch(e.target.value)} type="text" placeholder="Search" className="input border-2 border-slate-600 w-24 md:w-auto h-9" />
        </div>
      </div>
      <div className="bg-slate-200 w-full h-0.5 mt-5 rounded-full"></div>

      {/* Table */}
      <div className="flex justify-between items-center mt-7">
        <Button bgColor="bg-cyan-700" hoverBgColor="hover:bg-cyan-600" onClick={() => document.getElementById('my_modal_3').showModal()}>
          Tambah Data
        </Button>

        <Button onClick={() => ExportPeraturan(filteredData, year)} border="border-gray-700 border-2" bgColor="transparent" textColor="text-gray-700" hoverBgColor="hover:bg-gray-700 hover:text-white">
          <HiCloudArrowUp className="text-2xl" />
          Export
        </Button>
      </div>
      <Table>
        <Thead>
          <th>No</th>
          <th>No & Tgl Peraturan</th>
          <th>Tentang</th>
          <th>Uraian Singkat</th>
          <th>No & Tgl Dilaporkan</th>
          <th>Keterangan</th>
          <th></th>
        </Thead>

        <tbody>
          {filteredData
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
