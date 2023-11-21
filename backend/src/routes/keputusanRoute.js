import express from 'express';
import { getKeputusan, getKeputusanById, createKeputusan, updateKeputusan, deleteKeputusan } from '../controller/keputusanController.js';

const router = express.Router();

// ROUTE GET ALL SURAT
router.get('/keputusan', getKeputusan);
// ROUTE GET SURAT BY ID
router.get('/keputusan/:id', getKeputusanById);
// ROUTE CREATE SURAT
router.post('/keputusan', createKeputusan);
// ROUTE EDIT SURAT
router.patch('/keputusan/:id', updateKeputusan);
// ROUTE DELETE SURAT
router.delete('/keputusan/:id', deleteKeputusan);

export default router;
