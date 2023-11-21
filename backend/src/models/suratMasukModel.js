import { Sequelize } from 'sequelize';
import db from '../config/database.js';

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

export default suratMasukModel;

(async () => {
  await db.sync();
})();
