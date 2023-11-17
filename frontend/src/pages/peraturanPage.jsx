import React from 'react';
import ShowDataLayout from '../components/Layouts/ShowDataLayout';
import TablePeraturan from '../components/Fragments/Table/TablePeraturan';

const PeraturanPage = () => {
  return (
    <ShowDataLayout title="Data Peraturan Desa">
      <TablePeraturan />
    </ShowDataLayout>
  );
};

export default PeraturanPage;
