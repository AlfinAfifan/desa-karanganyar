import React, { useEffect, useState } from 'react';
import Table from '../../Elements/Table/Table';
import Thead from '../../Elements/Table/Thead';
import Tr from '../../Elements/Table/Tr';
import InputKodeSurat from '../ModalInput/InputKodeSurat';
import Button from '../../Elements/Button/Button';
import ButtonIcon from '../../Elements/Button/ButtonIcon';
import { HiCloudArrowUp, HiOutlinePencilSquare, HiOutlineTrash } from 'react-icons/hi2';
import { useDispatch, useSelector } from 'react-redux';
import { deleteKodeSurat, getKodeSurat } from '../../../redux/actions/kodeSurat/thunkKodeSurat';
import ModalConfirm from '../../Elements/Modal/ModalConfirm';
import { ExportKodeSurat } from '../Export/ExportKodeSurat';
import { toast } from 'react-toastify';
import SyncLoader from 'react-spinners/SyncLoader';

const TableKodeSurat = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.kodeSurat.data);
  const dataSort = [...data].sort((a, b) => {
    return a.kodeSurat.localeCompare(b.kodeSurat);
  });
  const [idSelected, setIdSelected] = useState(null);
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    setFilteredData(dataSort);
  }, [data]);

  // SEARCH
  const handleSearch = (value) => {
    const filtered = dataSort.filter((item) => {
      return item.kodeSurat.toLowerCase().includes(value.toLowerCase()) || item.keterangan.toLowerCase().includes(value.toLowerCase());
    });

    setFilteredData(filtered);
  };

  useEffect(() => {
    dispatch(getKodeSurat());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteKodeSurat(id));
  };

  // LOADING
  const loading = useSelector((state) => state.kodeSurat.loading);
  const color = '#06b6d4';

  return (
    <>
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="text-xl font-medium roboto flex items-center gap-3">Data Kode Surat</div>
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

        <Button onClick={() => ExportKodeSurat(filteredData)} border="border-gray-700 border-2" bgColor="transparent" textColor="text-gray-700" hoverBgColor="hover:bg-gray-700 hover:text-white">
          <HiCloudArrowUp className="text-2xl" />
          Export
        </Button>
      </div>

      {/* Loading */}
      {loading && <SyncLoader color={color} loading={loading} size={25} margin={5} aria-label="Loading Spinner" data-testid="loader" className="w-fit mx-auto py-36" />}

      {!loading && (
        <Table>
          <Thead>
            <th>No</th>
            <th>Kode Surat</th>
            <th>Keterangan</th>
            <th></th>
          </Thead>

          <tbody>
            {filteredData.map((datafix, index) => (
              <Tr key={index}>
                <td className="font-semibold ">{(index += 1)}</td>
                <td>{datafix.kodeSurat}</td>
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
                  </div>
                </td>
              </Tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Modal Input */}
      <InputKodeSurat idSelected={idSelected} setIdSelected={setIdSelected} />

      {/* Modal Delete */}
      <ModalConfirm title="Konfirmasi Hapus!" onClick={() => handleDelete(idSelected)}>
        Yakin untuk menghapus data ini ?
      </ModalConfirm>
    </>
  );
};

export default TableKodeSurat;
