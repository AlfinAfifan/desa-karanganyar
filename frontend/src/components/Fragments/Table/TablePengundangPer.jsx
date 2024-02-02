import React, { useEffect, useRef, useState } from 'react';
import Button from '../../Elements/Button/Button';
import { HiCloudArrowUp, HiMiniCog6Tooth, HiOutlinePencilSquare, HiOutlineTrash, HiPrinter, HiTrash } from 'react-icons/hi2';
import Table from '../../Elements/Table/Table';
import Thead from '../../Elements/Table/Thead';
import Tr from '../../Elements/Table/Tr';
import ButtonIcon from '../../Elements/Button/ButtonIcon';
import InputPerundanganPer from '../ModalInput/InputPerundangPer';
import ModalConfirm from '../../Elements/Modal/ModalConfirm';
import { useDispatch, useSelector } from 'react-redux';
import { deleteByYear, deletePerundanganPer, getPerundanganPer } from '../../../redux/actions/perundanganPeraturan/thunkPerundanganPer';
import { formatDate } from '../FormatDate/FormatDate';
import { ExportPengundangPer } from '../Export/ExportPengundangPer';
import { toast } from 'react-toastify';
import Input from '../../Elements/Input/Input';
import SyncLoader from 'react-spinners/SyncLoader';

const TablePerundanganPer = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.perundanganPer.data);
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    dispatch(getPerundanganPer());
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
    dispatch(deletePerundanganPer(id));
  };

  // FORMAT DATA
  const [confirmPwd, setConfirmPwd] = useState('');
  const form = useRef(null);
  const isError = useSelector((state) => state.perundanganPer.error);
  const isSuccess = useSelector((state) => state.perundanganPer.deleteSuccess);

  const handleDeleteAll = (year) => {
    dispatch(deleteByYear({ year: year, password: confirmPwd }));
    form.current.reset();
  };

  // LOADING
  const loading = useSelector((state) => state.perundanganPer.loading);
  const color = '#06b6d4';

  return (
    <>
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="text-xl font-medium roboto flex items-center gap-3">
          Data Pengundangan Peraturan Desa
          <select
            onChange={(e) => {
              handleFilter(e.target.value), setSelectedYear(e.target.value);
            }}
            value={selectedYear}
            className="select select-bordered border-slate-600 border-2 max-w-xs select-sm text-base"
          >
            {dropdownYears.map((year) => (
              <option key={year} value={year.toString()}>
                {year ? year : ''}
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

        <button onClick={() => document.getElementById('modalOpsi').showModal()} className="text-gray-700 border-gray-700 border p-2 rounded-full flex items-center justify-center gap-2 font-semibold">
          <HiMiniCog6Tooth className="text-2xl hover:rotate-90 duration-500" />
        </button>
        {/* Modal Opsi */}
        <dialog id="modalOpsi" className="modal">
          <div className="modal-box w-3/12">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
            <h3 className="font-bold text-lg text-center">Pilih Opsi</h3>
            <div className="w-full h-0.5 bg-black cyan-700 my-2 rounded-full"></div>
            <div className="flex justify-around mt-5">
              <Button onClick={() => ExportPengundangPer(filteredData, year)} bgColor="bg-cyan-700" hoverBgColor="hover:bg-cyan-800">
                <HiCloudArrowUp className="text-xl" />
                Export
              </Button>
              <Button
                onClick={() => {
                  document.getElementById('modalOpsi').close(), document.getElementById('modalConfirm').showModal();
                }}
                bgColor="bg-red-700"
                hoverBgColor="hover:bg-red-800"
              >
                <HiTrash className="text-xl" />
                Format
              </Button>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>

        {/* Modal Confirm Password */}
        <dialog id="modalConfirm" className="modal">
          <div className="modal-box w-3/12">
            <h3 className="font-bold text-lg text-center">Konfirmasi Password Format Data</h3>
            <div className="w-full h-0.5 bg-black cyan-700 my-2 rounded-full"></div>
            <form onSubmit={() => handleDeleteAll(year)} ref={form} method="dialog" className="flex flex-col">
              <Input name="confirm" type="text" placeholder="Masukkan password anda" onChange={(e) => setConfirmPwd(e.target.value)} />
              <div className="modal-action flex justify-center gap-8">
                <Button bgColor="bg-green-600" hoverBgColor="hover:bg-green-700">
                  Konfirm
                </Button>
                <Button onClick={() => document.getElementById('modalConfirm').close()} type="reset" bgColor="bg-gray-400" hoverBgColor="hover:bg-gray-500">
                  Batal
                </Button>
              </div>
            </form>
          </div>
        </dialog>
      </div>

      {/* Loading */}
      {loading && <SyncLoader color={color} loading={loading} size={25} margin={5} aria-label="Loading Spinner" data-testid="loader" className="w-fit mx-auto py-36" />}

      {!loading && (
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
                  <td>{datafix.tglPenetapan ? formatDate(datafix.tglPenetapan) : ''}</td>
                  <td>{datafix.tentang}</td>
                  <td>{datafix.tglPengundangan ? formatDate(datafix.tglPengundangan) : ''}</td>
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
      )}

      {/* MODAL */}
      <InputPerundanganPer idSelected={idSelected} setIdSelected={setIdSelected} />

      <ModalConfirm title="Konfirmasi Hapus!" onClick={() => handleDelete(idSelected)}>
        Yakin untuk menghapus data ini ?
      </ModalConfirm>
    </>
  );
};

export default TablePerundanganPer;
