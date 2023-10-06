import React from 'react';
import ShowDataLayout from '../components/Layouts/ShowDataLayout';
import TableSuratMasuk from '../components/Fragments/Table/TableSuratMasuk';

const SuratMasukPage = () => {
  return (
    <ShowDataLayout title="Data Surat Masuk">
      <TableSuratMasuk />
    </ShowDataLayout>
  );
};

export default SuratMasukPage;
