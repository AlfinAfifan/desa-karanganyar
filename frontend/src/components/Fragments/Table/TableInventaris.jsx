import React, { useEffect, useRef, useState } from 'react';
import Table from '../../Elements/Table/Table';
import Thead from '../../Elements/Table/Thead';
import Tr from '../../Elements/Table/Tr';
import InputInventaris from '../ModalInput/InputInventaris';
import Button from '../../Elements/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import ButtonIcon from '../../Elements/Button/ButtonIcon';
import { HiCloudArrowUp, HiMiniCog6Tooth, HiOutlinePencilSquare, HiOutlineSquare2Stack, HiOutlineTrash, HiTrash } from 'react-icons/hi2';
import ModalConfirm from '../../Elements/Modal/ModalConfirm';
import ModalDetail from '../../Elements/Modal/ModalDetail';
import { deleteByYear, deleteInventaris, getInventaris } from '../../../redux/actions/inventaris/thunkInventaris';
import { ExportInventaris } from '../Export/ExportInventaris';
import { toast } from 'react-toastify';
import Input from '../../Elements/Input/Input';
import SyncLoader from 'react-spinners/SyncLoader';

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
  };

  // FORMAT DATA
  const [confirmPwd, setConfirmPwd] = useState('');
  const form = useRef(null);
  const isError = useSelector((state) => state.inventaris.error);
  const isSuccess = useSelector((state) => state.inventaris.deleteSuccess);

  const handleDeleteAll = (year) => {
    dispatch(deleteByYear({ year: year, password: confirmPwd }));
    form.current.reset();
  };

  // LOADING
  const loading = useSelector((state) => state.inventaris.loading);
  const color = '#06b6d4';

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
              <option key={year} value={year?.toString()}>
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
              <Button onClick={() => ExportInventaris(filteredData, year)} bgColor="bg-cyan-700" hoverBgColor="hover:bg-cyan-800">
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
                  <td>{datafix.biaya?.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</td>
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
      )}
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
