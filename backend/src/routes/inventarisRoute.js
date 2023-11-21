import express from 'express';
import { getInventaris, getInventarisById, createInventaris, updateInventaris, deleteInventaris } from '../controller/inventarisController.js';

const router = express.Router();

// ROUTE GET ALL Inventaris
router.get('/inventaris', getInventaris);
// ROUTE GET Inventaris BY ID
router.get('/inventaris/:id', getInventarisById);
// ROUTE CREATE Inventaris
router.post('/inventaris', createInventaris);
// ROUTE EDIT Inventaris
router.patch('/inventaris/:id', updateInventaris);
// ROUTE DELETE Inventaris
router.delete('/inventaris/:id', deleteInventaris);

export default router;
