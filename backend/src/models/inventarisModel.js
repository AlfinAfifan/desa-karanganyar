import { Sequelize } from 'sequelize';
import db from '../config/database.js';

const { DataTypes } = Sequelize;

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

export default inventarisModel;

(async () => {
  await db.sync();
})();
