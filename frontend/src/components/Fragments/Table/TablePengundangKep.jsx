import React, { useEffect, useState } from 'react';
import Button from '../../Elements/Button/Button';
import { HiCloudArrowUp, HiOutlinePencilSquare, HiOutlineTrash, HiPrinter } from 'react-icons/hi2';
import Table from '../../Elements/Table/Table';
import Thead from '../../Elements/Table/Thead';
import Tr from '../../Elements/Table/Tr';
import ButtonIcon from '../../Elements/Button/ButtonIcon';
import InputPerundanganKep from '../ModalInput/InputPerundangKep';
import ModalConfirm from '../../Elements/Modal/ModalConfirm';
import { useDispatch, useSelector } from 'react-redux';
import { deletePerundanganKep, getPerundanganKep } from '../../../redux/actions/perundanganKeputusan/thunkPerundanganKep';
import { formatDate } from '../FormatDate/FormatDate';
import { ExportPengundangKep } from '../Export/ExportPengundangKep';
import { toast } from 'react-toastify';

const TablePengundangKep = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.perundanganKep.data);
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    dispatch(getPerundanganKep());
  }, [dispatch]);

  // SORT TAHUN DROPDOWN
  const dropdownYears = [...new Set(data.map((item) => new Date(item.tglPenetapan).getFullYear()))].sort((a, b) => b - a);

  // Filter berdasarkan tahun
  const [selectedYear, setSelectedYear] = useState('');
  const latestYear = Math.max(...data.map((item) => new Date(item.tglPenetapan).getFullYear()));

  useEffect(() => {
    selectedYear ? handleFilter(selectedYear) : handleFilter(latestYear.toString());
  }, [data]);

  const handleFilter = (year) => {
    const filtered = data.filter((item) => {
      const suratYear = new Date(item.tglPenetapan).getFullYear().toString();
      return year === '' || suratYear === year;
    });

    setFilteredData(filtered);
  };

  // SEARCH
  const year = selectedYear ? selectedYear : latestYear.toString();

  const handleSearch = (value) => {
    const filtered = data.filter((item) => {
      const suratYear = new Date(item.tglPenetapan).getFullYear().toString();
      const isMatchingYear = suratYear === year;

      if (isMatchingYear) {
        return (
          item.noPeraturan.toLowerCase().includes(value.toLowerCase()) ||
          item.tentang.toLowerCase().includes(value.toLowerCase()) ||
          item.tambahanLembaran.toLowerCase().includes(value.toLowerCase()) ||
          formatDate(item.tglPenetapan).includes(value) ||
          formatDate(item.tglPengundangan).includes(value)
        );
      }

      return false;
    });

    setFilteredData(filtered);
  };

  // Get Detail
  const [idSelected, setIdSelected] = useState(null);

  // DELETE DATA
  const handleDelete = (id) => {
    dispatch(deletePerundanganKep(id));
    toast.success('Hapus Data Berhasil');
  };
  return (
    <>
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="text-xl font-medium roboto flex items-center gap-3">
          Data Pengundangan Peraturan Kepala Desa
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

        <Button onClick={() => ExportPengundangKep(filteredData, year)} border="border-gray-700 border-2" bgColor="transparent" textColor="text-gray-700" hoverBgColor="hover:bg-gray-700 hover:text-white">
          <HiCloudArrowUp className="text-2xl" />
          Export
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
          {filteredData
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
