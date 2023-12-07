import ExcelJS from 'exceljs';
import { formatDate } from '../FormatDate/FormatDate';

export const ExportSuratMasuk = (dataExport, year) => {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Sheet 1');

  sheet.columns = [
    {
      header: 'No',
      key: 'no',
    },
    {
      header: 'Tanggal',
      key: 'tanggal',
    },
    {
      header: 'Nomor Surat',
      key: 'nomor_surat',
    },
    {
      header: 'Perihal',
      key: 'perihal',
    },
    {
      header: 'Instansi Dituju',
      key: 'instansiDituju',
    },
    {
      header: 'Penanggung Jawab',
      key: 'penanggungJawab',
    },
    {
      header: 'Tanggal Surat',
      key: 'tanggal_surat',
    },
    {
      header: 'Keterangan',
      key: 'keterangan',
    },
  ];

  dataExport.map((datafix, index) => {
    sheet.addRow({
      no: (index += 1),
      tanggal: formatDate(datafix.tanggal),
      nomor_surat: datafix.nomor_surat,
      perihal: datafix.perihal,
      instansiDituju: datafix.instansiDituju,
      penanggungJawab: datafix.penanggungJawab,
      tanggal_surat: formatDate(datafix.tanggal_surat),
      keterangan: datafix.keterangan,
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
    anchor.download = `Data Surat Masuk ${year}.xlsx`;
    anchor.click();
    window.URL.revokeObjectURL(url);
  });
};
