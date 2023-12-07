import { format } from 'date-fns';

export const formatNoTgl = (tanggal, nomor) => {
  // Change format date
  const date = new Date(tanggal);
  const formatNewDate = format(date, 'dd/MM/yyyy');

  // Final format
  const finalFormat = `${nomor}/${formatNewDate}`;
  return finalFormat;
};
