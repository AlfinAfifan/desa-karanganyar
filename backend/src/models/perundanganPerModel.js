import { Sequelize } from 'sequelize';
import db from '../config/database.js';

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

export default perundanganPerModel;

(async () => {
  await db.sync();
})();
