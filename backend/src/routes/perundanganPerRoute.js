import express from 'express';
import { createPerundanganPer, deleteDataByYear, deletePerundanganPer, getPerundanganPer, getPerundanganPerById, updatePerundanganPer } from '../controller/perundanganPerController.js';

const router = express.Router();

// ROUTE GET ALL SURAT
router.get('/perundanganper', getPerundanganPer);
// ROUTE GET SURAT BY ID
router.get('/perundanganper/:id', getPerundanganPerById);
// ROUTE CREATE SURAT
router.post('/perundanganper', createPerundanganPer);
// ROUTE EDIT SURAT
router.patch('/perundanganper/:id', updatePerundanganPer);
// ROUTE DELETE SURAT
router.delete('/perundanganper/:id', deletePerundanganPer);
// ROUTER DELETE YEAR
router.delete('/perundanganperyear/:year', deleteDataByYear);

export default router;
