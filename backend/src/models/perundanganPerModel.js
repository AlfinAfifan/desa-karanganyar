const { Sequelize } = require('sequelize');
const db = require('../config/database.js');

const { DataTypes } = Sequelize;

const perundanganPerModel = db.define(
  'perundanganPer',
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

module.exports = perundanganPerModel;

(async () => {
  await db.sync();
})();
