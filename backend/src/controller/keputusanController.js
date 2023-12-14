import keputusanModel from '../models/keputusanModel.js';
import path from 'path';
import fs from 'fs';
import { response } from 'express';
import usersModel from '../models/usersModel.js';
import { Op } from 'sequelize';
import bcrypt from 'bcrypt';

// CONTROLLER GET ALL SURAT

export const getKeputusan = async (req, res) => {
  try {
    const response = await keputusanModel.findAll();

    res.json(response);
  } catch (error) {
    res.json(error);
  }
};

// CONTROLLER GET SURAT BY ID
export const getKeputusanById = async (req, res) => {
  try {
    const response = await keputusanModel.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.json(response);
  } catch (error) {
    response;
  }
};

// CONTROLLER CREATE SURAT
export const createKeputusan = (req, res) => {
  // check if request file nothing
  if (req.files === null) return res.status(400).json({ message: 'no file uploaded' });

  // request body
  const tanggalKep = req.body.tanggalKep;
  const nomorKep = req.body.nomorKep;
  const tentang = req.body.tentang;
  const uraianSingkat = req.body.uraianSingkat;
  const tanggalLapor = req.body.tanggalLapor;
  const nomorLapor = req.body.nomorLapor;
  const keterangan = req.body.keterangan;
  const fileSurat = req.files.dokKeputusan;

  // filename and url
  const ext = path.extname(fileSurat.name);
  const timestamp = new Date().getTime();
  const fileName = fileSurat.md5 + timestamp + ext.toLowerCase();
  const url = `${req.protocol}://${process.env.DOMAIN}/Keputusan/${fileName}`;

  // allowed type extension image
  const allowedType = ['.pdf'];

  // validate images extensions
  if (!allowedType.includes(ext.toLocaleLowerCase())) return res.status(422).json({ message: 'invalid file' });

  // if all requirements are fulfilled save image to public folder
  fileSurat.mv(`./public/Keputusan/${fileName}`, async (err) => {
    // check if there is an error
    if (err) return res.status(500).json({ message: err.message });
    try {
      // if there are no errors save data to database
      await keputusanModel.create({
        tanggalKep: tanggalKep,
        nomorKep: nomorKep,
        tentang: tentang,
        uraianSingkat: uraianSingkat,
        tanggalLapor: tanggalLapor,
        nomorLapor: nomorLapor,
        keterangan: keterangan,
        fileSurat: fileName,
        url: url,
      });
      res.status(201).json({ message: 'creating keputusan success' });
    } catch (error) {
      res.json({
        message: 'creating keputusan failed',
        error: error,
      });
    }
  });
};

// CONTROLLER UPDATE SURAT
export const updateKeputusan = async (req, res) => {
  // cek if there is data by id
  const keputusan = await keputusanModel.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!keputusan)
    return res.status(404).json({
      message: 'No Data Found',
    });

  let fileName = '';
  let urlChecked = ``;

  // cek if request file is nothing
  if (req.files === null) {
    // take file filename from the database
    fileName = keputusanModel.fileSurat;
    urlChecked = keputusanModel.url;
  } else {
    // if update file
    const fileSurat = req.files.dokKeputusan;
    const ext = path.extname(fileSurat.name);
    const timestamp = new Date().getTime();
    fileName = fileSurat.md5 + timestamp + ext.toLowerCase();

    // allowed type extension image
    const allowedType = ['.pdf'];
    // validate extensions file
    if (!allowedType.includes(ext.toLocaleLowerCase())) return res.status(422).json({ message: 'invalid file' });

    // delete old file
    const filepath = `./public/Keputusan/${keputusan.fileSurat}`;
    fs.unlinkSync(filepath);

    // save new file
    fileSurat.mv(`./public/Keputusan/${fileName}`, (err) => {
      if (err) return res.status(500).json({ message: err.message });
    });

    urlChecked = `${req.protocol}://${process.env.DOMAIN}/Keputusan/${fileName}`;
  }

  // request new update
  const tanggalKep = req.body.tanggalKep;
  const nomorKep = req.body.nomorKep;
  const tentang = req.body.tentang;
  const uraianSingkat = req.body.uraianSingkat;
  const tanggalLapor = req.body.tanggalLapor;
  const nomorLapor = req.body.nomorLapor;
  const keterangan = req.body.keterangan;
  const url = urlChecked;

  // save update to database
  try {
    await keputusanModel.update(
      {
        tanggalKep: tanggalKep,
        nomorKep: nomorKep,
        tentang: tentang,
        uraianSingkat: uraianSingkat,
        tanggalLapor: tanggalLapor,
        nomorLapor: nomorLapor,
        keterangan: keterangan,
        fileSurat: fileName,
        url: url,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json({ message: 'keputusan Updated Successfully' });
  } catch (error) {
    res.json({
      message: 'keputusan update gagal',
      error: error,
    });
  }
};

// CONTROLLER DELETE SURAT
export const deleteKeputusan = async (req, res) => {
  const keputusan = await keputusanModel.findOne({
    where: {
      id: req.params.id,
    },
  });

  // cek if there is no data
  if (!keputusan) return res.status(404).json({ message: 'No Data Found' });

  // if there is data
  try {
    const filepath = `./public/Keputusan/${keputusan.fileSurat}`;
    // delete file in the filepath
    fs.unlinkSync(filepath);
    // delete file in databases by id
    await keputusanModel.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ message: 'Keputusan Deleted Success' });
  } catch (error) {
    res.json({
      message: 'Keputusan delete gagal',
      Error: error,
    });
  }
};

export const deleteDataByYear = async (req, res) => {
  try {
    // Cocokan password
    const user = await usersModel.findAll();
    const match = await bcrypt.compare(req.query.password, user[0].password);
    if (!match) return res.status(400).json({ message: 'wrong password' });

    // Ambil tahun
    const year = req.params.year;
    const startDate = new Date(`${year}-01-01T00:00:00`);
    const endDate = new Date(`${year}-12-31T23:59:59`);

    // Ambil semua data yang ingin dihapus berdasarkan tahun
    const dataToDelete = await keputusanModel.findAll({
      where: {
        tanggalKep: {
          [Op.between]: [startDate, endDate],
        },
      },
    });

    // Check if any data is found before attempting deletion
    if (dataToDelete.length === 0) {
      return res.status(404).json({ message: 'No data found for the specified year' });
    }

    // Loop untuk menghapus file dan data di database
    for (const data of dataToDelete) {
      const filepath = `./public/Keputusan/${data.fileSurat}`;

      // Hapus file statis
      fs.promises.unlink(filepath);

      // Hapus data di database
      await keputusanModel.destroy({
        where: {
          id: data.id,
        },
      });
    }

    res.status(200).json({ message: 'Data Deleted Success' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      message: 'Data delete gagal',
      error: error.message,
    });
  }
};
