const { DataTypes } = require('sequelize');
const db = require('../config/database.js');

const inventarisModel = db.define(
  'inventaris',
  {
    tanggal: DataTypes.DATE,
    namaProyek: DataTypes.STRING,
    volume: DataTypes.STRING,
    biaya: DataTypes.BIGINT,
    lokasi: DataTypes.STRING,
    keterangan: DataTypes.STRING,
    fotoSebelum: DataTypes.STRING,
    fotoProses: DataTypes.STRING,
    fotoSesudah: DataTypes.STRING,
    urlSebelum: DataTypes.STRING,
    urlProses: DataTypes.STRING,
    urlSesudah: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);

module.exports = inventarisModel;

// Menjalankan sinkronisasi basis data (opsional)
(async () => {
  await db.sync();
})();
