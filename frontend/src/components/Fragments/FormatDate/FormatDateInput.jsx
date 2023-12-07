import { format } from 'date-fns';

export const formatDateInput = (tanggal) => {
  // Change format date
  const date = new Date(tanggal);
  const formatNewDate = format(date, 'yyyy-MM-dd');

  return formatNewDate;
};
