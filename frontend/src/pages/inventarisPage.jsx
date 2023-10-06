import React from 'react';
import ShowDataLayout from '../components/Layouts/ShowDataLayout';
import TableInventaris from '../components/Fragments/Table/TableInventaris';

const inventarisPage = () => {
  return (
    <ShowDataLayout title="Data Inventaris Proyek">
      <TableInventaris />
    </ShowDataLayout>
  );
};

export default inventarisPage;
