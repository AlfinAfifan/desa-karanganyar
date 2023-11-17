import React from 'react';
import ShowDataLayout from '../components/Layouts/ShowDataLayout';
import TablePerundanganPer from '../components/Fragments/Table/TablePengundangPer';

const PerundangPerPage = () => {
  return (
    <ShowDataLayout title="Data Keputusan Kepala Desa">
      <TablePerundanganPer />
    </ShowDataLayout>
  );
};

export default PerundangPerPage;
