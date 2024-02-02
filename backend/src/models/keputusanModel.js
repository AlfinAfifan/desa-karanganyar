// Gunakan require untuk mengimpor modul
const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/database.js');

// Ekstrak objek DataTypes dari Sequelize
const { DATE, STRING } = DataTypes;

// Definisikan model menggunakan define
const keputusanModel = db.define(
  'keputusan',
  {
    tanggalKep: DATE,
    nomorKep: STRING,
    tentang: STRING,
    uraianSingkat: STRING,
    tanggalLapor: DATE,
    nomorLapor: STRING,
    keterangan: STRING,
    fileSurat: STRING,
    url: STRING,
  },
  {
    freezeTableName: true,
  }
);

// Ekspor model keputusan
module.exports = keputusanModel;

// Sinkronkan database saat aplikasi berjalan
(async () => {
  await db.sync();
})();
