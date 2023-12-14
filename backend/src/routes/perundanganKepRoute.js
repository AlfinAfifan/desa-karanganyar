import express from 'express';
import { createPerundanganKep, deleteDataByYear, deletePerundanganKep, getPerundanganKep, getPerundanganKepById, updatePerundanganKep } from '../controller/perundanganKepController.js';

const router = express.Router();

// ROUTE GET ALL SURAT
router.get('/perundangankep', getPerundanganKep);
// ROUTE GET SURAT BY ID
router.get('/perundangankep/:id', getPerundanganKepById);
// ROUTE CREATE SURAT
router.post('/perundangankep', createPerundanganKep);
// ROUTE EDIT SURAT
router.patch('/perundangankep/:id', updatePerundanganKep);
// ROUTE DELETE SURAT
router.delete('/perundangankep/:id', deletePerundanganKep);
// ROUTER DELETE YEAR
router.delete('/perundangankepyear/:year', deleteDataByYear);

export default router;
