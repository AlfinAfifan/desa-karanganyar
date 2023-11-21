import express from 'express';
import { getSuratKeluar, getSuratKeluarById, createSuratKeluar, updateSuratKeluar, deleteSuratKeluar } from '../controller/suratKeluarController.js';

const router = express.Router();

// ROUTE GET ALL SURAT
router.get('/suratKeluar', getSuratKeluar);
// ROUTE GET SURAT BY ID
router.get('/suratKeluar/:id', getSuratKeluarById);
// ROUTE CREATE SURAT
router.post('/suratKeluar', createSuratKeluar);
// ROUTE EDIT SURAT
router.patch('/suratKeluar/:id', updateSuratKeluar);
// ROUTE DELETE SURAT
router.delete('/suratKeluar/:id', deleteSuratKeluar);

export default router;
