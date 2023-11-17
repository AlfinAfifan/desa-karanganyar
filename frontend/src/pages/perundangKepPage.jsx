import React from 'react';
import ShowDataLayout from '../components/Layouts/ShowDataLayout';
import TablePerundanganKep from '../components/Fragments/Table/TablePengundangKep';

const PerundangKepPage = () => {
  return (
    <ShowDataLayout title="Data Keputusan Kepala Desa">
      <TablePerundanganKep />
    </ShowDataLayout>
  );
};

export default PerundangKepPage;
