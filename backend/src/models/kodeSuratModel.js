import { Sequelize } from 'sequelize';
import db from '../config/database.js';

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

export default kodeSuratModel;

(async () => {
  await db.sync();
})();
