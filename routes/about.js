const express = require('express');
const router = express.Router();
const aboutController = require('../controller/about');
const auth = require('../middleware/auth');

//#region MONGO DB
router.get('/', auth, aboutController.getAbout);
router.post('/', auth, aboutController.postAbout);
router.put('/:id', auth, aboutController.putAbout);
router.delete('/:id', auth, aboutController.deleteAbout);
//#endregion

module.exports = router;
