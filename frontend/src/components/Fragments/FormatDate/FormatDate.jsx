import { format } from 'date-fns';

export const formatDate = (tanggal) => {
  // Change format date
  const date = new Date(tanggal);
  const formatNewDate = format(date, 'dd/MM/yyyy');

  return formatNewDate;
};
