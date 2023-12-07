import ExcelJS from 'exceljs';

export const ExportInventaris = (dataExport, year) => {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Sheet 1');

  sheet.columns = [
    {
      header: 'No',
      key: 'no',
    },
    {
      header: 'Jenis / Nama Proyek',
      key: 'namaProyek',
    },
    {
      header: 'Volume',
      key: 'volume',
    },
    {
      header: 'Biaya',
      key: 'biaya',
    },
    {
      header: 'Lokasi',
      key: 'lokasi',
    },
    {
      header: 'Keterangan',
      key: 'keterangan',
    },
  ];

  dataExport.map((datafix, index) => {
    sheet.addRow({
      no: (index += 1),
      namaProyek: datafix.namaProyek,
      volume: datafix.volume,
      biaya: datafix.biaya.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }),
      lokasi: datafix.lokasi,
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
    anchor.download = `Data Inventaris Proyek ${year}.xlsx`;
    anchor.click();
    window.URL.revokeObjectURL(url);
  });
};
