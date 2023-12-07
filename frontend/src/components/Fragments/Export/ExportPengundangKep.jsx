import ExcelJS from 'exceljs';
import { formatDate } from '../FormatDate/FormatDate';

export const ExportPengundangKep = (dataExport, year) => {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Sheet 1');

  sheet.columns = [
    {
      header: 'No',
      key: 'no',
    },
    {
      header: 'Nomor Peraturan Kepala Desa',
      key: 'noPeraturan',
    },
    {
      header: 'Tanggal Penetapan',
      key: 'tglPenetapan',
    },
    {
      header: 'tentang',
      key: 'tentang',
    },
    {
      header: 'Tanggal Pengundangan',
      key: 'tglPengundangan',
    },
    {
      header: 'Lembaran Desa / Tambahan Lembaran Desa',
      key: 'tambahanLembaran',
    },
  ];

  dataExport.map((datafix, index) => {
    sheet.addRow({
      no: (index += 1),
      noPeraturan: datafix.noPeraturan,
      tglPenetapan: formatDate(datafix.tglPenetapan),
      tentang: datafix.tentang,
      tglPengundangan: formatDate(datafix.tglPengundangan),
      tambahanLembaran: datafix.tambahanLembaran,
    });
  });

  // Bold header
  sheet.getRow(1).eachCell((cell) => {
    cell.font = { bold: true };
  });

  // Atur lebar kolom menjadi otomatis
  sheet.columns.forEach(function (column, i) {
    let maxLength = 0;
    column['eachCell']({ includeEmpty: true }, function (cell) {
      var columnLength = cell.value ? cell.value.toString().length : 10;
      if (columnLength > maxLength) {
        maxLength = columnLength;
      }
    });
    column.width = maxLength < 5 ? 5 : maxLength + 2;
  });

  workbook.xlsx.writeBuffer().then((data) => {
    const blob = new Blob([data], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheet.sheet',
    });

    const url = window.URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `Data Pengundangan Peraturan Kepala Desa ${year}.xlsx`;
    anchor.click();
    window.URL.revokeObjectURL(url);
  });
};
