import peraturanModel from '../models/peraturanModel.js';
import path from 'path';
import fs from 'fs';
import { response } from 'express';
import usersModel from '../models/usersModel.js';
import { Op } from 'sequelize';
import bcrypt from 'bcrypt';

// CONTROLLER GET ALL SURAT
export const getPeraturan = async (req, res) => {
  try {
    const response = await peraturanModel.findAll();

    res.json(response);
  } catch (error) {
    res.json(error);
  }
};

// CONTROLLER GET SURAT BY ID
export const getPeraturanById = async (req, res) => {
  try {
    const response = await peraturanModel.findOne({
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
export const createPeraturan = (req, res) => {
  // check if request file nothing
  if (req.files === null) return res.status(400).json({ message: 'no file uploaded' });

  // request body
  const tanggalPer = req.body.tanggalPer;
  const nomorPer = req.body.nomorPer;
  const tentang = req.body.tentang;
  const uraianSingkat = req.body.uraianSingkat;
  const tanggalAcc = req.body.tanggalAcc;
  const nomorAcc = req.body.nomorAcc;
  const keterangan = req.body.keterangan;
  const fileSurat = req.files.dokumen;

  // filename and url
  const ext = path.extname(fileSurat.name);
  const timestamp = new Date().getTime();
  const fileName = fileSurat.md5 + timestamp + ext.toLowerCase();
  const url = `${req.protocol}://${process.env.DOMAIN}/Peraturan/${fileName}`;

  // allowed type extension image
  const allowedType = ['.pdf'];

  // validate images extensions
  if (!allowedType.includes(ext.toLocaleLowerCase())) return res.status(422).json({ message: 'invalid file' });

  // if all requirements are fulfilled save image to public folder
  fileSurat.mv(`./public/Peraturan/${fileName}`, async (err) => {
    // check if there is an error
    if (err) return res.status(500).json({ message: err.message });
    try {
      // if there are no errors save data to database
      await peraturanModel.create({
        tanggalPer: tanggalPer,
        nomorPer: nomorPer,
        tentang: tentang,
        uraianSingkat: uraianSingkat,
        tanggalAcc: tanggalAcc,
        nomorAcc: nomorAcc,
        keterangan: keterangan,
        fileSurat: fileName,
        url: url,
      });
      res.status(201).json({ message: 'creating peraturan success' });
    } catch (error) {
      res.json({
        message: 'creating peraturan failed',
        error: error,
      });
    }
  });
};

// CONTROLLER UPDATE SURAT
export const updatePeraturan = async (req, res) => {
  // cek if there is data by id
  const peraturan = await peraturanModel.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!peraturan)
    return res.status(404).json({
      message: 'No Data Found',
    });

  let fileName = '';
  let urlChecked = ``;

  // cek if request file is nothing
  if (req.files === null) {
    // take file filename from the database
    fileName = peraturanModel.fileSurat;
    urlChecked = peraturanModel.url;
  } else {
    // if update file
    const fileSurat = req.files.dokumen;
    const ext = path.extname(fileSurat.name);
    const timestamp = new Date().getTime();
    fileName = fileSurat.md5 + timestamp + ext.toLowerCase();

    // allowed type extension image
    const allowedType = ['.pdf'];
    // validate extensions file
    if (!allowedType.includes(ext.toLocaleLowerCase())) return res.status(422).json({ message: 'invalid file' });

    // delete old file
    const filepath = `./public/Peraturan/${peraturan.fileSurat}`;
    fs.unlinkSync(filepath);

    // save new file
    fileSurat.mv(`./public/Peraturan/${fileName}`, (err) => {
      if (err) return res.status(500).json({ message: err.message });
    });

    urlChecked = `${req.protocol}://${process.env.DOMAIN}/Peraturan/${fileName}`;
  }

  // request new update
  const tanggalPer = req.body.tanggalPer;
  const nomorPer = req.body.nomorPer;
  const tentang = req.body.tentang;
  const uraianSingkat = req.body.uraianSingkat;
  const tanggalAcc = req.body.tanggalAcc;
  const nomorAcc = req.body.nomorAcc;
  const keterangan = req.body.keterangan;
  const url = urlChecked;

  // save update to database
  try {
    await peraturanModel.update(
      {
        tanggalPer: tanggalPer,
        nomorPer: nomorPer,
        tentang: tentang,
        uraianSingkat: uraianSingkat,
        tanggalAcc: tanggalAcc,
        nomorAcc: nomorAcc,
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
    res.status(200).json({ message: 'Peraturan Updated Successfully' });
  } catch (error) {
    res.json({
      message: 'Peraturan update gagal',
      error: error,
    });
  }
};

// CONTROLLER DELETE SURAT
export const deletePeraturan = async (req, res) => {
  const peraturan = await peraturanModel.findOne({
    where: {
      id: req.params.id,
    },
  });

  // cek if there is no data
  if (!peraturan) return res.status(404).json({ message: 'No Data Found' });

  // if there is data
  try {
    const filepath = `./public/Peraturan/${peraturan.fileSurat}`;
    // delete file in the filepath
    fs.unlinkSync(filepath);
    // delete file in databases by id
    await peraturanModel.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ message: 'Peraturan Deleted Success' });
  } catch (error) {
    res.json({
      message: 'Peraturan delete gagal',
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
    const dataToDelete = await peraturanModel.findAll({
      where: {
        tanggalPer: {
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
      const filepath = `./public/Peraturan/${data.fileSurat}`;

      // Hapus file statis
      fs.promises.unlink(filepath);

      // Hapus data di database
      await peraturanModel.destroy({
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
