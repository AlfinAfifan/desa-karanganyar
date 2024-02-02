const { Sequelize } = require('sequelize');
const db = require('../config/database.js');

const { DataTypes } = Sequelize;

const kodeSuratModel = db.define(
  'kodesurat',
  {
    kodeSurat: DataTypes.STRING,
    keterangan: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);

module.exports = kodeSuratModel;

(async () => {
  await db.sync();
})();
