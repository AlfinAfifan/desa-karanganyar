import express from 'express';
import { getPeraturan, getPeraturanById, createPeraturan, updatePeraturan, deletePeraturan, deleteDataByYear } from '../controller/peraturanController.js';

const router = express.Router();

// ROUTE GET ALL SURAT
router.get('/peraturan', getPeraturan);
// ROUTE GET SURAT BY ID
router.get('/peraturan/:id', getPeraturanById);
// ROUTE CREATE SURAT
router.post('/peraturan', createPeraturan);
// ROUTE EDIT SURAT
router.patch('/peraturan/:id', updatePeraturan);
// ROUTE DELETE SURAT
router.delete('/peraturan/:id', deletePeraturan);
// ROUTER DELETE YEAR
router.delete('/peraturanyear/:year', deleteDataByYear);

export default router;
