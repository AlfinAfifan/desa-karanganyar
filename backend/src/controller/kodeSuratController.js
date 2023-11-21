import kodeSuratModel from '../models/kodeSuratModel.js';
import path from 'path';
import fs from 'fs';
import { response } from 'express';

// CONTROLLER GET ALL SURAT

export const getKodeSurat = async (req, res) => {
  try {
    const response = await kodeSuratModel.findAll();

    res.json(response);
  } catch (error) {
    res.json(error);
  }
};

// CONTROLLER GET SURAT BY ID
export const getKodeSuratById = async (req, res) => {
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
