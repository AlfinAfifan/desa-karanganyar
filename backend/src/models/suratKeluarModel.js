import { Sequelize } from 'sequelize';
import db from '../config/database.js';

const { DataTypes } = Sequelize;

const suratKeluarModel = db.define(
  'suratkeluar',
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

export default suratKeluarModel;

(async () => {
  await db.sync();
})();
