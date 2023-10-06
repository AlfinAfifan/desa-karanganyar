import React from 'react';
import ShowDataLayout from '../components/Layouts/ShowDataLayout';
import TableKeputusan from '../components/Fragments/Table/TableKeputusan';

const SkKadesPage = () => {
  return (
    <ShowDataLayout title="Data Keputusan Kepala Desa">
      <TableKeputusan />
    </ShowDataLayout>
  );
};

export default SkKadesPage;
