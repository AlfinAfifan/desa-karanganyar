const express = require('express');
const { getKodeSurat, getKodeSuratById, createKodeSurat, updateKodeSurat, deleteKodeSurat } = require('../controller/kodeSuratController.js');

const router = express.Router();

// ROUTE GET ALL SURAT
router.get('/kodesurat', getKodeSurat);
// ROUTE GET SURAT BY ID
router.get('/kodesurat/:id', getKodeSuratById);
// ROUTE CREATE SURAT
router.post('/kodesurat', createKodeSurat);
// ROUTE EDIT SURAT
router.patch('/kodesurat/:id', updateKodeSurat);
// ROUTE DELETE SURAT
router.delete('/kodesurat/:id', deleteKodeSurat);

module.exports = router;
