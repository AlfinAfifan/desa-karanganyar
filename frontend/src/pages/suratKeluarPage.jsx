import React from 'react';
import ShowDataLayout from '../components/Layouts/ShowDataLayout';
import TableSuratKeluar from '../components/Fragments/Table/TableSuratKeluar';

const SuratKeluarPage = () => {
  return (
    <ShowDataLayout title="Data Surat Keluar">
      <TableSuratKeluar />
    </ShowDataLayout>
  );
};

export default SuratKeluarPage;
