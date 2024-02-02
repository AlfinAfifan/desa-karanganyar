const { Sequelize } = require('sequelize');
const db = require('../config/database.js');

const { DataTypes } = Sequelize;

const suratMasukModel = db.define(
  'suratmasuk',
  {
    tanggal: DataTypes.DATE,
    nomor_surat: DataTypes.STRING,
    perihal: DataTypes.STRING,
    instansiDituju: DataTypes.STRING,
    penanggungJawab: DataTypes.STRING,
    tanggal_surat: DataTypes.DATE,
    keterangan: DataTypes.STRING,
    fileSurat: DataTypes.STRING,
    url: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);

module.exports = suratMasukModel;

(async () => {
  await db.sync();
})();
