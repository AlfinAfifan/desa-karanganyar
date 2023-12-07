import React, { useEffect, useState } from 'react';
import Table from '../../Elements/Table/Table';
import Thead from '../../Elements/Table/Thead';
import Tr from '../../Elements/Table/Tr';
import InputInventaris from '../ModalInput/InputInventaris';
import Button from '../../Elements/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import ButtonIcon from '../../Elements/Button/ButtonIcon';
import { HiCloudArrowUp, HiOutlinePencilSquare, HiOutlineSquare2Stack, HiOutlineTrash } from 'react-icons/hi2';
import ModalConfirm from '../../Elements/Modal/ModalConfirm';
import ModalDetail from '../../Elements/Modal/ModalDetail';
import { deleteInventaris, getInventaris } from '../../../redux/actions/inventaris/thunkInventaris';
import { ExportInventaris } from '../Export/ExportInventaris';
import { toast } from 'react-toastify';

const TableInventaris = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.inventaris.data);
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    dispatch(getInventaris());
  }, [dispatch]);

  // SORT TAHUN DROPDOWN
  const dropdownYears = [...new Set(data.map((item) => new Date(item.tanggal).getFullYear()))].sort((a, b) => b - a);

  // Filter berdasarkan tahun
  const [selectedYear, setSelectedYear] = useState('');
  const latestYear = Math.max(...data.map((item) => new Date(item.tanggal).getFullYear()));

  useEffect(() => {
    selectedYear ? handleFilter(selectedYear) : handleFilter(latestYear.toString());
  }, [data]);

  const handleFilter = (year) => {
    const filtered = data.filter((item) => {
      const suratYear = new Date(item.tanggal).getFullYear().toString();
      return year === '' || suratYear === year;
    });

    setFilteredData(filtered);
  };

  // SEARCH
  const year = selectedYear ? selectedYear : latestYear.toString();

  const handleSearch = (value) => {
    const filtered = data.filter((item) => {
      const suratYear = new Date(item.tanggal).getFullYear().toString();
      const isMatchingYear = suratYear === year;

      if (isMatchingYear) {
        return (
          item.namaProyek.toLowerCase().includes(value.toLowerCase()) ||
          item.volume.toLowerCase().includes(value.toLowerCase()) ||
          item.biaya.toString().includes(value.toString()) ||
          item.lokasi.toLowerCase().includes(value.toLowerCase()) ||
          item.keterangan.toLowerCase().includes(value.toLowerCase())
        );
      }

      return false;
    });

    setFilteredData(filtered);
  };

  // Get Detail
  const [idSelected, setIdSelected] = useState(null);
  const [detail, setDetail] = useState({
    urlSebelum: '',
    urlProses: '',
    urlSebelum: '',
  });

  const detailData = data.filter((f) => f.id === idSelected)[0];

  useEffect(() => {
    if (detailData) {
      setDetail({
        urlSebelum: detailData.urlSebelum,
        urlProses: detailData.urlProses,
        urlSesudah: detailData.urlSesudah,
      });
    }
  }, [detailData]);

  // DELETE DATA
  const handleDelete = (id) => {
    dispatch(deleteInventaris(id));
    toast.success('Hapus Data Berhasil');
  };

  return (
    <>
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="text-xl font-medium roboto flex items-center gap-3">
          Data Inventaris Proyek Desa
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
        <Button onClick={() => ExportInventaris(filteredData, year)} border="border-gray-700 border-2" bgColor="transparent" textColor="text-gray-700" hoverBgColor="hover:bg-gray-700 hover:text-white">
          <HiCloudArrowUp className="text-2xl" />
          Export
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
          {filteredData
            .slice(0)
            .reverse()
            .map((datafix, index) => (
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

      <ModalConfirm title="Konfirmasi Hapus!" onClick={() => handleDelete(idSelected)}>
        Yakin untuk menghapus data ini ?
      </ModalConfirm>

      <ModalDetail>
        <div className="grid grid-cols-3 gap-3 justify-center mt-3">
          <div className="grid justify-center shadow-lg">
            <img className="w-96 h-52 object-cover rounded-t-lg" src={detail.urlSebelum} alt="" />
            <h1 className="font-semibold rounded-b-lg bg-cyan-600 text-white py-1">Foto Sebelum</h1>
          </div>
          <div className="grid justify-center shadow-lg">
            <img className="w-96 h-52 object-cover rounded-t-lg" src={detail.urlProses} alt="" />
            <h1 className="font-semibold rounded-b-lg bg-cyan-600 text-white py-1">Foto Proses</h1>
          </div>
          <div className="grid justify-center shadow-lg">
            <img className="w-96 h-52 object-cover rounded-t-lg" src={detail.urlSesudah} alt="" />
            <h1 className="font-semibold rounded-b-lg bg-cyan-600 text-white py-1">Foto Sesudah</h1>
          </div>
        </div>
      </ModalDetail>
    </>
  );
};

export default TableInventaris;
