import React from 'react';
import ShowDataLayout from '../components/Layouts/ShowDataLayout';
import TableKodeSurat from '../components/Fragments/Table/TableKodeSurat';

const KodeSuratPage = () => {
  return (
    <ShowDataLayout title="Data Kode Surat">
      <TableKodeSurat />
    </ShowDataLayout>
  );
};

export default KodeSuratPage;
