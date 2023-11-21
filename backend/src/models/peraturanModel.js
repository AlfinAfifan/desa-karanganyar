import { Sequelize } from 'sequelize';
import db from '../config/database.js';

const { DataTypes } = Sequelize;

const peraturanModel = db.define(
  'peraturan',
  {
    tanggalPer: DataTypes.DATE,
    nomorPer: DataTypes.STRING,
    tentang: DataTypes.STRING,
    uraianSingkat: DataTypes.STRING,
    tanggalAcc: DataTypes.DATE,
    nomorAcc: DataTypes.STRING,
    keterangan: DataTypes.STRING,
    fileSurat: DataTypes.STRING,
    url: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);

export default peraturanModel;

(async () => {
  await db.sync();
})();
