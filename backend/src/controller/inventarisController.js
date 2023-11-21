import inventarisModel from '../models/inventarisModel.js';
import path from 'path';
import fs from 'fs';
import { response } from 'express';

// CONTROLLER GET ALL SURAT

export const getInventaris = async (req, res) => {
  try {
    const response = await inventarisModel.findAll();

    res.json(response);
  } catch (error) {
    res.json(error);
  }
};

// CONTROLLER GET SURAT BY ID
export const getInventarisById = async (req, res) => {
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
export const createInventaris = (req, res) => {
  // check if request file nothing
  if (req.files === null) return res.status(400).json({ message: 'no file uploaded' });

  // request body
  const namaProyek = req.body.namaProyek;
  const volume = req.body.volume;
  const biaya = req.body.biaya;
  const lokasi = req.body.lokasi;
  const keterangan = req.body.keterangan;
  const fotoSebelum = req.files.fotoSebelum;

  // filename and url
  const ext = path.extname(fotoSebelum.name);
  const timestamp = new Date().getTime();
  const fileName = fotoSebelum.md5 + timestamp + ext;
  const url = `${req.protocol}://${process.env.DOMAIN}/Inventaris/${fileName}`;

  // allowed type extension image
  const allowedType = ['.jpg', '.jpeg', '.png'];

  // validate images extensions
  if (!allowedType.includes(ext.toLocaleLowerCase())) return res.status(422).json({ message: 'invalid file' });

  // if all requirements are fulfilled save image to public folder
  fotoSebelum.mv(`./public/Inventaris/${fileName}`, async (err) => {
    // check if there is an error
    if (err) return res.status(500).json({ message: err.message });
    try {
      // if there are no errors save data to database
      await inventarisModel.create({
        namaProyek: namaProyek,
        volume: volume,
        biaya: biaya,
        lokasi: lokasi,
        keterangan: keterangan,
        fotoSebelum: fileName,
        urlSebelum: url,
      });
      res.status(201).json({ message: 'creating inventaris success' });
    } catch (error) {
      res.json({
        message: 'creating inventaris failed',
        error: error,
      });
    }
  });
};

// CONTROLLER UPDATE SURAT
export const updateInventaris = async (req, res) => {
  // cek if there is data by id
  const inventaris = await inventarisModel.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!inventaris)
    return res.status(404).json({
      message: 'No Data Found',
    });

  let fileName = '';

  // cek if request file is nothing
  if (req.files === null) {
    // take file filename from the database
    fileName = inventarisModel.fileSurat;
  } else {
    // if update file
    const fileSurat = req.files.fileSurat;
    const ext = path.extname(fileSurat.name);
    const timestamp = new Date().getTime();
    fileName = fileSurat.md5 + timestamp + ext;
    // allowed type extension image
    const allowedType = ['.docx', '.pdf'];
    // validate extensions file
    if (!allowedType.includes(ext.toLocaleLowerCase())) return res.status(422).json({ message: 'invalid file' });

    // delete old file
    const filepath = `./public/Inventaris/${inventaris.fileSurat}`;
    fs.unlinkSync(filepath);

    // save new file
    fileSurat.mv(`./public/Inventaris/${fileName}`, (err) => {
      if (err) return res.status(500).json({ message: err.message });
    });
  }

  // request new update
  const tanggal = req.body.tanggal;
  const nomor_surat = req.body.nomor_surat;
  const perihal = req.body.perihal;
  const instansiDituju = req.body.instansiDituju;
  const penanggungJawab = req.body.penanggungJawab;
  const tanggal_surat = req.body.tanggal_surat;
  const keterangan = req.body.keterangan;
  const url = `${req.protocol}://${process.env.DOMAIN}/Inventaris/${fileName}`;

  // save update to database
  try {
    await inventarisModel.update(
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
    res.status(200).json({ message: 'SuratKeluar Updated Successfully' });
  } catch (error) {
    res.json({
      message: 'SuratKeluar update gagal',
      error: error,
    });
  }
};

// CONTROLLER DELETE SURAT
export const deleteInventaris = async (req, res) => {
  const suratKeluar = await inventarisModel.findOne({
    where: {
      id: req.params.id,
    },
  });

  // cek if there is no data
  if (!suratKeluar) return res.status(404).json({ message: 'No Data Found' });

  // if there is data
  try {
    const filepath = `./public/SuratKeluar/${suratKeluar.fileSurat}`;
    // delete file in the filepath
    fs.unlinkSync(filepath);
    // delete file in databases by id
    await inventarisModel.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ message: 'SuratKeluar Deleted Success' });
  } catch (error) {
    res.json({
      message: 'SuratKeluar delete gagal',
      Error: error,
    });
  }
};
