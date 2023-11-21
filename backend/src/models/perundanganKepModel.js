import { Sequelize } from 'sequelize';
import db from '../config/database.js';

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

export default perundanganKepModel;

(async () => {
  await db.sync();
})();
