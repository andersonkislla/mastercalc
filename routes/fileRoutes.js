const express = require('express');
const multer = require('multer');
const router = express.Router();
const controller = require('../controllers/fileController');

const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('file'), controller.processFile);
router.post('/procedures', controller.addProcedure); // Nova rota

module.exports = router;
