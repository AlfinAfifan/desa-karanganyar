const express = require('express');
const suratMasukController = require('../controller/suratMasukController.js');

const router = express.Router();

// ROUTE GET ALL SURAT
router.get('/suratmasuk', suratMasukController.getSuratMasuk);
// ROUTE GET SURAT BY ID
router.get('/suratmasuk/:id', suratMasukController.getSuratMasukById);
// ROUTE CREATE SURAT
router.post('/suratmasuk', suratMasukController.createSuratMasuk);
// ROUTE EDIT SURAT
router.patch('/suratmasuk/:id', suratMasukController.updateSuratMasuk);
// ROUTE DELETE SURAT
router.delete('/suratmasuk/:id', suratMasukController.deleteSuratMasuk);
// ROUTER DELETE YEAR
router.delete('/suratmasukyear/:year', suratMasukController.deleteDataByYear);

module.exports = router;
