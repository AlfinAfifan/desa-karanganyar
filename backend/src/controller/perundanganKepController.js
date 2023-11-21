import perundanganKepModel from '../models/perundanganKepModel.js';
import path from 'path';
import fs from 'fs';
import { response } from 'express';

// CONTROLLER GET ALL SURAT

export const getPerundanganKep = async (req, res) => {
  try {
    const response = await perundanganKepModel.findAll();

    res.json(response);
  } catch (error) {
    res.json(error);
  }
};

// CONTROLLER GET SURAT BY ID
export const getPerundanganKepById = async (req, res) => {
  try {
    const response = await perundanganKepModel.findOne({
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
export const createPerundanganKep = async (req, res) => {
  // request body
  const noPeraturan = req.body.noPeraturan;
  const tglPenetapan = req.body.tglPenetapan;
  const tentang = req.body.tentang;
  const tglPengundangan = req.body.tglPengundangan;
  const tambahanLembaran = req.body.tambahanLembaran;

  try {
    // Save data to database without file processing
    await perundanganKepModel.create({
      noPeraturan: noPeraturan,
      tglPenetapan: tglPenetapan,
      tentang: tentang,
      tglPengundangan: tglPengundangan,
      tambahanLembaran: tambahanLembaran,
    });
    res.status(201).json({ message: 'creating perundangan keputusan success' });
  } catch (error) {
    res.status(500).json({
      message: 'creating perundangan keputusan failed',
      error: error,
    });
  }
};

// CONTROLLER UPDATdataK SURAT
export const updatePerundanganKep = async (req, res) => {
  // cek if there is data by id
  const dataPerundanganKep = await perundanganKepModel.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!dataPerundanganKep)
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
    await perundanganKepModel.update(
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
    res.status(200).json({ message: 'Perundangan Keputusan Updated Successfully' });
  } catch (error) {
    res.json({
      message: 'Perundangan Keputusan update gagal',
      error: error,
    });
  }
};

// CONTROLLER DELETE SURAT
export const deletePerundanganKep = async (req, res) => {
  const dataPerundanganKep = await perundanganKepModel.findOne({
    where: {
      id: req.params.id,
    },
  });

  // cek if there is no data
  if (!dataPerundanganKep) return res.status(404).json({ message: 'No Data Found' });

  // if there is data
  try {
    await perundanganKepModel.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ message: 'Perundangan Keputusan Deleted Success' });
  } catch (error) {
    res.json({
      message: 'Perundangan Keputusan delete gagal',
      Error: error,
    });
  }
};
