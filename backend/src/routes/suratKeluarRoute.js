const express = require('express');
const suratKeluarController = require('../controller/suratKeluarController.js');

const router = express.Router();

// ROUTE GET ALL SURAT
router.get('/suratKeluar', suratKeluarController.getSuratKeluar);
// ROUTE GET SURAT BY ID
router.get('/suratKeluar/:id', suratKeluarController.getSuratKeluarById);
// ROUTE CREATE SURAT
router.post('/suratKeluar', suratKeluarController.createSuratKeluar);
// ROUTE EDIT SURAT
router.patch('/suratKeluar/:id', suratKeluarController.updateSuratKeluar);
// ROUTE DELETE SURAT
router.delete('/suratKeluar/:id', suratKeluarController.deleteSuratKeluar);
// ROUTER DELETE YEAR
router.delete('/suratkeluaryear/:year', suratKeluarController.deleteDataByYear);

module.exports = router;
