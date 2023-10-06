import React from 'react';
import ShowDataLayout from '../components/Layouts/ShowDataLayout';
import TablePeratuan from '../components/Fragments/Table/TablePeratuan';

const PeraturanPage = () => {
  return (
    <ShowDataLayout title="Data Peraturan Desa">
      <TablePeratuan />
    </ShowDataLayout>
  );
};

export default PeraturanPage;
