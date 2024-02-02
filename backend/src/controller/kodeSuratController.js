import kodeSuratModel from '../models/kodeSuratModel.js';
import path from 'path';
import fs from 'fs';
import { response } from 'express';
import usersModel from '../models/usersModel.js';

// CONTROLLER GET ALL SURAT

export const getKodeSurat = async (req, res) => {
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
    const response = await kodeSuratModel.findAll();

    res.json(response);
  } catch (error) {
    res.json(error);
  }
};

// CONTROLLER GET SURAT BY ID
export const getKodeSuratById = async (req, res) => {
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
    const response = await kodeSuratModel.findOne({
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
export const createKodeSurat = async (req, res) => {
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
  const kodeSurat = req.body.kodeSurat;
  const keterangan = req.body.keterangan;

  try {
    // Save data to database without file processing
    await kodeSuratModel.create({
      kodeSurat: kodeSurat,
      keterangan: keterangan,
    });
    res.status(201).json({ message: 'creating kode surat success' });
  } catch (error) {
    res.status(500).json({
      message: 'creating kode surat failed',
      error: error,
    });
  }
};

// CONTROLLER UPDATdataK SURAT
export const updateKodeSurat = async (req, res) => {
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
  const dataKodeSurat = await kodeSuratModel.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!dataKodeSurat)
    return res.status(404).json({
      message: 'No Data Found',
    });

  // request new update
  const kodeSurat = req.body.kodeSurat;
  const keterangan = req.body.keterangan;

  // save update to database
  try {
    await kodeSuratModel.update(
      {
        kodeSurat: kodeSurat,
        keterangan: keterangan,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json({ message: 'Kode surat Updated Successfully' });
  } catch (error) {
    res.json({
      message: 'Kode surat update gagal',
      error: error,
    });
  }
};

// CONTROLLER DELETE SURAT
export const deleteKodeSurat = async (req, res) => {
  // CEK TOKEN
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(401);
  const user = await usersModel.findAll({
    where: {
      refresh_token: refreshToken,
    },
  });
  if (!user[0]) return res.sendStatus(403);

  const dataKodeSurat = await kodeSuratModel.findOne({
    where: {
      id: req.params.id,
    },
  });

  // cek if there is no data
  if (!dataKodeSurat) return res.status(404).json({ message: 'No Data Found' });

  // if there is data
  try {
    await kodeSuratModel.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ message: 'Kode surat Deleted Success' });
  } catch (error) {
    res.json({
      message: 'Kode surat delete gagal',
      Error: error,
    });
  }
};
