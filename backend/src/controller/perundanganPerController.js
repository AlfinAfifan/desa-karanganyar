import perundanganPerModel from '../models/perundanganPerModel.js';
import path from 'path';
import fs from 'fs';
import { response } from 'express';

// CONTROLLER GET ALL SURAT

export const getPerundanganPer = async (req, res) => {
  try {
    const response = await perundanganPerModel.findAll();

    res.json(response);
  } catch (error) {
    res.json(error);
  }
};

// CONTROLLER GET SURAT BY ID
export const getPerundanganPerById = async (req, res) => {
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
export const createPerundanganPer = async (req, res) => {
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
export const updatePerundanganPer = async (req, res) => {
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
export const deletePerundanganPer = async (req, res) => {
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
