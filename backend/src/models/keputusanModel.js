import { Sequelize } from 'sequelize';
import db from '../config/database.js';

const { DataTypes } = Sequelize;

const keputusanModel = db.define(
  'keputusan',
  {
    tanggalKep: DataTypes.DATE,
    nomorKep: DataTypes.STRING,
    tentang: DataTypes.STRING,
    uraianSingkat: DataTypes.STRING,
    tanggalLapor: DataTypes.DATE,
    nomorLapor: DataTypes.STRING,
    keterangan: DataTypes.STRING,
    fileSurat: DataTypes.STRING,
    url: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);

export default keputusanModel;

(async () => {
  await db.sync();
})();
