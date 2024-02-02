const express = require('express');
const { getInventaris, getInventarisById, createInventaris, updateInventaris, deleteInventaris, deleteDataByYear } = require('../controller/inventarisController.js');
// ROUTER DELETE YEAR

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
router.delete('/inventarisyear/:year', deleteDataByYear);

module.exports = router;
