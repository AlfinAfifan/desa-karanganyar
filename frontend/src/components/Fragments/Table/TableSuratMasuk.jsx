import React, { useEffect, useState } from 'react';
import Table from '../../Elements/Table/Table';
import Thead from '../../Elements/Table/Thead';
import Tr from '../../Elements/Table/Tr';
import Button from '../../Elements/Button/Button';
import InputSuratMasuk from '../ModalInput/InputSuratMasuk';
import ButtonIcon from '../../Elements/Button/ButtonIcon';
import { HiCloudArrowUp, HiOutlinePencilSquare, HiOutlineSquare2Stack, HiOutlineTrash } from 'react-icons/hi2';
import ModalDetail from '../../Elements/Modal/ModalDetail';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import PdfViewer from '../PdfViewer/PdfViewer';
import ModalConfirm from '../../Elements/Modal/ModalConfirm';
import { deleteSuratMasuk, getSuratMasuk } from '../../../redux/actions/suratMasuk/thunkSuratMasuk';
import { ExportSuratMasuk } from '../Export/ExportSuratMasuk';
import { formatDate } from '../FormatDate/FormatDate';
import { toast } from 'react-toastify';

const TableSuratMasuk = () => {
  // GET DATA
  const dispatch = useDispatch();
  const data = useSelector((state) => state.suratMasuk.data);
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    dispatch(getSuratMasuk());
  }, [dispatch]);

  // SORT TAHUN DROPDOWN
  const dropdownYears = [...new Set(data.map((item) => new Date(item.tanggal_surat).getFullYear()))].sort((a, b) => b - a);

  // Filter berdasarkan tahun
  const [selectedYear, setSelectedYear] = useState('');
  const latestYear = Math.max(...data.map((item) => new Date(item.tanggal_surat).getFullYear()));

  useEffect(() => {
    selectedYear ? handleFilter(selectedYear) : handleFilter(latestYear.toString());
  }, [data]);

  const handleFilter = (year) => {
    const filtered = data
      .filter((item) => {
        const suratYear = new Date(item.tanggal_surat).getFullYear().toString();
        return year === '' || suratYear === year;
      })
      .sort((a, b) => {
        // Urutkan descending berdasarkan tanggal surat
        const dateA = new Date(a.tanggal_surat);
        const dateB = new Date(b.tanggal_surat);
        return dateA - dateB;
      });

    setFilteredData(filtered);
  };

  // SEARCH
  const year = selectedYear ? selectedYear : latestYear.toString();

  const handleSearch = (value) => {
    const filtered = data
      .filter((item) => {
        const suratYear = new Date(item.tanggal_surat).getFullYear().toString();
        const isMatchingYear = suratYear === year;

        if (isMatchingYear) {
          return (
            item.nomor_surat.toLowerCase().includes(value.toLowerCase()) ||
            item.perihal.toLowerCase().includes(value.toLowerCase()) ||
            item.instansiDituju.toLowerCase().includes(value.toLowerCase()) ||
            item.penanggungJawab.toLowerCase().includes(value.toLowerCase()) ||
            item.keterangan.toLowerCase().includes(value.toLowerCase()) ||
            formatDate(item.tanggal_surat).includes(value) ||
            formatDate(item.tanggal).includes(value)
          );
        }

        return false;
      })
      .sort((a, b) => {
        // Urutkan descending berdasarkan tanggal surat
        const dateA = new Date(a.tanggal_surat);
        const dateB = new Date(b.tanggal_surat);
        return dateA - dateB;
      });

    setFilteredData(filtered);
  };

  // GET DETAIL
  const [idSelected, setIdSelected] = useState(null);
  const [urlSelected, setUrlSelected] = useState(null);

  // DELETE DATA
  const handleDelete = (id) => {
    dispatch(deleteSuratMasuk(id));
    toast.success('Hapus Data Berhasil');
  };

  return (
    <>
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="text-xl font-medium roboto flex items-center gap-3">
          Data Surat Masuk
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

        <Button onClick={() => ExportSuratMasuk(filteredData, year)} border="border-gray-700 border-2" bgColor="transparent" textColor="text-gray-700" hoverBgColor="hover:bg-gray-700 hover:text-white">
          <HiCloudArrowUp className="text-2xl" />
          Export
        </Button>
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
        <tbody>
          {filteredData
            .slice(0)
            .reverse()
            .map((datafix, index) => (
              <Tr key={index}>
                <td className="font-semibold">{(index += 1)}</td>
                <td>{formatDate(datafix.tanggal)}</td>
                <td>{datafix.nomor_surat}</td>
                <td>{datafix.perihal}</td>
                <td>{datafix.instansiDituju}</td>
                <td>{datafix.penanggungJawab}</td>
                <td>{formatDate(datafix.tanggal_surat)}</td>
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

      {/* Modal Input */}
      <InputSuratMasuk idSelected={idSelected} setIdSelected={setIdSelected} year={year} />

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

export default TableSuratMasuk;
