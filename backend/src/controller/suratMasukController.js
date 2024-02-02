const suratMasukModel = require('../models/suratMasukModel.js');
const usersModel = require('../models/usersModel.js');
const bcrypt = require('bcrypt');
const path = require('path');
const fs = require('fs');
const { response } = require('express');
const { Op } = require('sequelize');

// CONTROLLER GET ALL SURAT

exports.getSuratMasuk = async (req, res) => {
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
    const response = await suratMasukModel.findAll();

    res.json(response);
  } catch (error) {
    res.json(error);
  }
};

// CONTROLLER GET SURAT BY ID
exports.getSuratMasukById = async (req, res) => {
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
    const response = await suratMasukModel.findOne({
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
exports.createSuratMasuk = async (req, res) => {
  // CEK TOKEN
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(401);
  const user = await usersModel.findAll({
    where: {
      refresh_token: refreshToken,
    },
  });
  if (!user[0]) return res.sendStatus(403);

  // check if request file nothing
  if (req.files === null) return res.status(400).json({ message: 'no file uploaded' });

  // request body
  const tanggal = req.body.tanggal;
  const nomor_surat = req.body.nomor_surat;
  const perihal = req.body.perihal;
  const instansiDituju = req.body.instansiDituju;
  const penanggungJawab = req.body.penanggungJawab;
  const tanggal_surat = req.body.tanggal_surat;
  const keterangan = req.body.keterangan;
  const fileSurat = req.files.dokumen;

  // filename and url
  const ext = path.extname(fileSurat.name);
  const timestamp = new Date().getTime();
  const fileName = fileSurat.md5 + timestamp + ext.toLowerCase();
  const url = `${process.env.DOMAIN}/SuratMasuk/${fileName}`;

  // allowed type extension image
  const allowedType = ['.pdf'];

  // validate images extensions
  if (!allowedType.includes(ext.toLocaleLowerCase())) return res.status(422).json({ message: 'Invalid File Type' });

  // if all requirements are fulfilled save image to public folder
  fileSurat.mv(`./public/SuratMasuk/${fileName}`, async (err) => {
    // check if there is an error
    if (err) return res.status(500).json({ message: err.message });
    try {
      // if there are no errors save data to database
      await suratMasukModel.create({
        tanggal: tanggal,
        nomor_surat: nomor_surat,
        perihal: perihal,
        instansiDituju: instansiDituju,
        penanggungJawab: penanggungJawab,
        tanggal_surat: tanggal_surat,
        keterangan: keterangan,
        fileSurat: fileName,
        url: url,
      });
      res.status(201).json({ message: 'creating surat masuk success' });
    } catch (error) {
      res.json({
        message: 'creating surat masuk failed',
        error: error,
      });
    }
  });
};

// CONTROLLER UPDATE SURAT
exports.updateSuratMasuk = async (req, res) => {
  // CEK TOKEN
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(401);
  const user = await usersModel.findAll({
    where: {
      refresh_token: refreshToken,
    },
  });
  if (!user[0]) return res.sendStatus(403);

  // cek if there is data by id
  const suratMasuk = await suratMasukModel.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!suratMasuk)
    return res.status(404).json({
      message: 'No Data Found',
    });

  let fileName = '';
  let urlChecked = ``;

  // cek if request file is nothing
  if (req.files === null) {
    // take file filename from the database
    fileName = suratMasukModel.fileSurat;
    urlChecked = suratMasukModel.url;
  } else {
    // if update file
    const fileSurat = req.files.dokumen;
    const ext = path.extname(fileSurat.name);
    const timestamp = new Date().getTime();
    fileName = fileSurat.md5 + timestamp + ext.toLowerCase();

    // allowed type extension image
    const allowedType = ['.pdf'];
    // validate extensions file
    if (!allowedType.includes(ext.toLocaleLowerCase())) return res.status(422).json({ message: 'Invalid File Type' });

    // delete old file
    const filepath = `./public/SuratMasuk/${suratMasuk.fileSurat}`;
    fs.unlinkSync(filepath);

    // save new file
    fileSurat.mv(`./public/SuratMasuk/${fileName}`, (err) => {
      if (err) return res.status(500).json({ message: err.message });
    });

    urlChecked = `${process.env.DOMAIN}/SuratMasuk/${fileName}`;
  }

  // request new update
  const tanggal = req.body.tanggal;
  const nomor_surat = req.body.nomor_surat;
  const perihal = req.body.perihal;
  const instansiDituju = req.body.instansiDituju;
  const penanggungJawab = req.body.penanggungJawab;
  const tanggal_surat = req.body.tanggal_surat;
  const keterangan = req.body.keterangan;
  const url = urlChecked;

  // save update to database
  try {
    await suratMasukModel.update(
      {
        tanggal: tanggal,
        nomor_surat: nomor_surat,
        perihal: perihal,
        instansiDituju: instansiDituju,
        penanggungJawab: penanggungJawab,
        tanggal_surat: tanggal_surat,
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
    res.status(200).json({ message: 'Surat Masuk Updated Successfully' });
  } catch (error) {
    res.json({
      message: 'surat masuk update gagal',
      error: error,
    });
  }
};

// CONTROLLER DELETE SURAT
exports.deleteSuratMasuk = async (req, res) => {
  // CEK TOKEN
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(401);
  const user = await usersModel.findAll({
    where: {
      refresh_token: refreshToken,
    },
  });
  if (!user[0]) return res.sendStatus(403);

  const suratMasuk = await suratMasukModel.findOne({
    where: {
      id: req.params.id,
    },
  });

  // cek if there is no data
  if (!suratMasuk) return res.status(404).json({ message: 'No Data Found' });

  // if there is data
  try {
    const filepath = `./public/SuratMasuk/${suratMasuk.fileSurat}`;
    // delete file in the filepath
    fs.unlinkSync(filepath);
    // delete file in databases by id
    await suratMasukModel.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ message: 'Surat Masuk Deleted Success' });
  } catch (error) {
    res.json({
      message: 'Surat Masuk delete gagal',
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
    const dataToDelete = await suratMasukModel.findAll({
      where: {
        tanggal_surat: {
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
      const filepath = `./public/SuratMasuk/${data.fileSurat}`;

      // Hapus file statis
      fs.promises.unlink(filepath);

      // Hapus data di database
      await suratMasukModel.destroy({
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
