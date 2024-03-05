const inventarisModel = require('../models/inventarisModel.js');
const path = require('path');
const fs = require('fs');
const { response } = require('express');
const usersModel = require('../models/usersModel.js');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');

// CONTROLLER GET ALL SURAT

exports.getInventaris = async (req, res) => {
  try {
    const response = await inventarisModel.findAll();

    res.json(response);
  } catch (error) {
    res.json(error);
  }
};

// CONTROLLER GET SURAT BY ID
exports.getInventarisById = async (req, res) => {
  // CEK TOKEN
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(401);
  const user = await usersModel.findAll({
    where: {
      refresh_token: refreshToken,
    },
  });
  if (!user[0]) return res.sendStatus(403);

  try {
    const response = await inventarisModel.findOne({
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
exports.createInventaris = async (req, res) => {
  // CEK TOKEN
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(401);
  const user = await usersModel.findAll({
    where: {
      refresh_token: refreshToken,
    },
  });

  if (!user[0]) return res.sendStatus(403);
  try {
    // Extract request body
    const { tanggal, namaProyek, volume, biaya, lokasi, keterangan } = req.body;

    // Extract each file
    const fotoSebelum = req.files?.fotoSebelum;
    const fotoProses = req.files?.fotoProses;
    const fotoSesudah = req.files?.fotoSesudah;

    // Process each file and get URLs
    const fotoSebelumData = fotoSebelum ? await processFile(req, fotoSebelum) : null;
    const fotoProsesData = fotoProses ? await processFile(req, fotoProses) : null;
    const fotoSesudahData = fotoSesudah ? await processFile(req, fotoSesudah) : null;

    // Save data to the database
    const inventaris = await inventarisModel.create({
      tanggal,
      namaProyek,
      volume,
      biaya,
      lokasi,
      keterangan,
      fotoSebelum: fotoSebelumData?.fileName,
      urlSebelum: fotoSebelumData?.url,
      fotoProses: fotoProsesData?.fileName,
      urlProses: fotoProsesData?.url,
      fotoSesudah: fotoSesudahData?.fileName,
      urlSesudah: fotoSesudahData?.url,
    });

    res.status(201).json({ message: 'Creating inventaris success', inventaris });
  } catch (error) {
    res.status(500).json({ message: 'Creating inventaris failed', error: error.message });
  }
};

// Function to process and save a file
const processFile = (req, file) => {
  return new Promise((resolve, reject) => {
    // Check if file is present
    if (!file) {
      reject('File not found');
      return;
    }

    // Extract file details
    const ext = path.extname(file.name);
    const timestamp = new Date().getTime();
    const fileName = file.md5 + timestamp + ext;
    const url = `${process.env.DOMAIN}/Inventaris/${fileName}`;

    // Allowed file extensions
    const allowedType = ['.jpg', '.jpeg', '.png'];

    // Validate file extension
    if (!allowedType.includes(ext.toLowerCase())) {
      reject('Invalid file type');
      return;
    }

    // Move file to the public folder
    file.mv(`./public/Inventaris/${fileName}`, (err) => {
      if (err) {
        reject(err.message);
        return;
      }

      resolve({ fileName, url });
    });
  });
};

// CONTROLLER UPDATE SURAT

exports.updateInventaris = async (req, res) => {
  // CEK TOKEN
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(401);
  const user = await usersModel.findAll({
    where: {
      refresh_token: refreshToken,
    },
  });
  if (!user[0]) return res.sendStatus(403);

  try {
    // cek if there is data by id
    const inventaris = await inventarisModel.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!inventaris) {
      return res.status(404).json({
        message: 'No Data Found',
      });
    }

    // Process each file and get URLs
    let fotoSebelumData = {};
    let fotoProsesData = {};
    let fotoSesudahData = {};

    if (req.files) {
      fotoSebelumData = await processFileUpdate(req, req.files.fotoSebelum, inventaris.fotoSebelum);
      fotoProsesData = await processFileUpdate(req, req.files.fotoProses, inventaris.fotoProses);
      fotoSesudahData = await processFileUpdate(req, req.files.fotoSesudah, inventaris.fotoSesudah);
    }

    // request new update
    const { tanggal, namaProyek, volume, biaya, lokasi, keterangan } = req.body;

    // Save update to database
    await inventarisModel.update(
      {
        tanggal,
        namaProyek,
        volume,
        biaya,
        lokasi,
        keterangan,
        fotoSebelum: fotoSebelumData.fileName || inventaris.fotoSebelum,
        urlSebelum: fotoSebelumData.url || inventaris.urlSebelum,
        fotoProses: fotoProsesData.fileName || inventaris.fotoProses,
        urlProses: fotoProsesData.url || inventaris.urlProses,
        fotoSesudah: fotoSesudahData.fileName || inventaris.fotoSesudah,
        urlSesudah: fotoSesudahData.url || inventaris.urlSesudah,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    res.status(200).json({ message: 'Inventaris Updated Successfully' });
  } catch (error) {
    res.json({
      message: 'Inventaris update gagal',
      error: error,
    });
  }
};

// Function to process and save a file
const processFileUpdate = async (req, file, oldFileName) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Check if file is present
      if (!file) {
        const url = oldFileName ? `${process.env.DOMAIN}/Inventaris/${oldFileName}` : null;
        resolve({ fileName: oldFileName, url });
        return;
      }

      // Extract file details
      const ext = path.extname(file.name);
      const timestamp = new Date().getTime();
      const fileName = file.md5 + timestamp + ext;
      const url = `${process.env.DOMAIN}/Inventaris/${fileName}`;

      // Allowed file extensions
      const allowedType = ['.jpg', '.jpeg', '.png'];

      // Validate file extension
      if (!allowedType.includes(ext.toLowerCase())) {
        reject('Invalid file type');
        return;
      }

      // Delete old file
      if (oldFileName) {
        const filepath = `./public/Inventaris/${oldFileName}`;
        fs.unlinkSync(filepath);
      }

      // Move file to the public folder
      file.mv(`./public/Inventaris/${fileName}`, (err) => {
        if (err) {
          reject(err.message);
          return;
        }

        resolve({ fileName, url });
      });
    } catch (error) {
      reject(error.message);
    }
  });
};

// CONTROLLER DELETE SURAT
exports.deleteInventaris = async (req, res) => {
  // CEK TOKEN
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(401);
  const user = await usersModel.findAll({
    where: {
      refresh_token: refreshToken,
    },
  });
  if (!user[0]) return res.sendStatus(403);

  const inventaris = await inventarisModel.findOne({
    where: {
      id: req.params.id,
    },
  });

  // cek if there is no data
  if (!inventaris) return res.status(404).json({ message: 'No Data Found' });

  // if there is data
  try {
    const filepath1 = `./public/Inventaris/${inventaris.fotoSebelum}`;
    const filepath2 = `./public/Inventaris/${inventaris.fotoProses}`;
    const filepath3 = `./public/Inventaris/${inventaris.fotoSesudah}`;
    // delete file in the filepath
    if (inventaris.fotoSebelum) {
      fs.unlinkSync(filepath1);
    }
    if (inventaris.fotoProses) {
      fs.unlinkSync(filepath2);
    }
    if (inventaris.fotoSesudah) {
      fs.unlinkSync(filepath3);
    }
    
    // delete file in databases by id
    await inventarisModel.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ message: 'Inventaris Deleted Success' });
  } catch (error) {
    res.json({
      message: 'Inventaris delete gagal',
      Error: error,
    });
  }
};

exports.deleteDataByYear = async (req, res) => {
  // CEK TOKEN
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(401);
  const user = await usersModel.findAll({
    where: {
      refresh_token: refreshToken,
    },
  });
  if (!user[0]) return res.sendStatus(403);

  try {
    // Cocokan password
    const user = await usersModel.findAll();
    const match = await bcrypt.compare(req.query.password, user[0].password);
    if (!match) return res.status(400).json({ message: 'Password Salah' });

    // Ambil tahun
    const year = req.params.year;
    const startDate = new Date(`${year}-01-01T00:00:00`);
    const endDate = new Date(`${year}-12-31T23:59:59`);

    // Ambil semua data yang ingin dihapus berdasarkan tahun
    const dataToDelete = await inventarisModel.findAll({
      where: {
        tanggal: {
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
      const filepath1 = `./public/Inventaris/${data.fotoSebelum}`;
      const filepath2 = `./public/Inventaris/${data.fotoProses}`;
      const filepath3 = `./public/Inventaris/${data.fotoSesudah}`;

      // Hapus file statis
      fs.promises.unlink(filepath1);
      fs.promises.unlink(filepath2);
      fs.promises.unlink(filepath3);

      // Hapus data di database
      await inventarisModel.destroy({
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
