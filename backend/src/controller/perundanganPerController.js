const perundanganPerModel = require('../models/perundanganPerModel.js');
const usersModel = require('../models/usersModel.js');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const { response } = require('express');

// CONTROLLER GET ALL SURAT

exports.getPerundanganPer = async (req, res) => {
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
    const response = await perundanganPerModel.findAll();

    res.json(response);
  } catch (error) {
    res.json(error);
  }
};

// CONTROLLER GET SURAT BY ID
exports.getPerundanganPerById = async (req, res) => {
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
    const response = await perundanganPerModel.findOne({
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
exports.createPerundanganPer = async (req, res) => {
  // CEK TOKEN
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(401);
  const user = await usersModel.findAll({
    where: {
      refresh_token: refreshToken,
    },
  });
  if (!user[0]) return res.sendStatus(403);

  // request body
  const noPeraturan = req.body.noPeraturan;
  const tglPenetapan = req.body.tglPenetapan;
  const tentang = req.body.tentang;
  const tglPengundangan = req.body.tglPengundangan;
  const tambahanLembaran = req.body.tambahanLembaran;

  try {
    // Save data to database without file processing
    await perundanganPerModel.create({
      noPeraturan: noPeraturan,
      tglPenetapan: tglPenetapan,
      tentang: tentang,
      tglPengundangan: tglPengundangan,
      tambahanLembaran: tambahanLembaran,
    });
    res.status(201).json({ message: 'creating perundangan peraturan success' });
  } catch (error) {
    res.status(500).json({
      message: 'creating perundangan peraturan failed',
      error: error,
    });
  }
};

// CONTROLLER UPDATdataK SURAT
exports.updatePerundanganPer = async (req, res) => {
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
  const dataPerundanganPer = await perundanganPerModel.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!dataPerundanganPer)
    return res.status(404).json({
      message: 'No Data Found',
    });

  // request new update
  const noPeraturan = req.body.noPeraturan;
  const tglPenetapan = req.body.tglPenetapan;
  const tentang = req.body.tentang;
  const tglPengundangan = req.body.tglPengundangan;
  const tambahanLembaran = req.body.tambahanLembaran;

  // save update to database
  try {
    await perundanganPerModel.update(
      {
        noPeraturan: noPeraturan,
        tglPenetapan: tglPenetapan,
        tentang: tentang,
        tglPengundangan: tglPengundangan,
        tambahanLembaran: tambahanLembaran,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json({ message: 'Perundangan peraturan Updated Successfully' });
  } catch (error) {
    res.json({
      message: 'Perundangan peraturan update gagal',
      error: error,
    });
  }
};

// CONTROLLER DELETE SURAT
exports.deletePerundanganPer = async (req, res) => {
  // CEK TOKEN
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(401);
  const user = await usersModel.findAll({
    where: {
      refresh_token: refreshToken,
    },
  });
  if (!user[0]) return res.sendStatus(403);

  const dataPerundanganPer = await perundanganPerModel.findOne({
    where: {
      id: req.params.id,
    },
  });

  // cek if there is no data
  if (!dataPerundanganPer) return res.status(404).json({ message: 'No Data Found' });

  // if there is data
  try {
    await perundanganPerModel.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ message: 'Perundangan peraturan Deleted Success' });
  } catch (error) {
    res.json({
      message: 'Perundangan peraturan delete gagal',
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
    if (!match) return res.status(400).json({ message: 'Pasword Salah' });

    // Ambil tahun
    const year = req.params.year;
    const startDate = new Date(`${year}-01-01T00:00:00`);
    const endDate = new Date(`${year}-12-31T23:59:59`);

    // Ambil semua data yang ingin dihapus berdasarkan tahun
    const dataToDelete = await perundanganPerModel.findAll({
      where: {
        tglPenetapan: {
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
      // Hapus data di database
      await perundanganPerModel.destroy({
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
