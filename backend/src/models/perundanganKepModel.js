const { Sequelize } = require('sequelize');
const db = require('../config/database.js');

const { DataTypes } = Sequelize;

const perundanganKepModel = db.define(
  'perundanganKep',
  {
    noPeraturan: DataTypes.STRING,
    tglPenetapan: DataTypes.DATE,
    tentang: DataTypes.STRING,
    tglPengundangan: DataTypes.DATE,
    tambahanLembaran: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);

module.exports = perundanganKepModel;

(async () => {
  await db.sync();
})();
