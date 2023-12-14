import express from 'express';
import { getSuratMasuk, getSuratMasukById, createSuratMasuk, updateSuratMasuk, deleteSuratMasuk, deleteDataByYear } from '../controller/suratMasukController.js';

const router = express.Router();

// ROUTE GET ALL SURAT
router.get('/suratmasuk', getSuratMasuk);
// ROUTE GET SURAT BY ID
router.get('/suratmasuk/:id', getSuratMasukById);
// ROUTE CREATE SURAT
router.post('/suratmasuk', createSuratMasuk);
// ROUTE EDIT SURAT
router.patch('/suratmasuk/:id', updateSuratMasuk);
// ROUTE DELETE SURAT
router.delete('/suratmasuk/:id', deleteSuratMasuk);
// ROUTER DELETE YEAR
router.delete('/suratmasukyear/:year', deleteDataByYear);

export default router;
