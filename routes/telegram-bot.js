const express = require('express');
const router = express.Router();
const telegramBotController = require('../controller/telegram-bot');
const auth = require('../middleware/auth');

//#region TELEGRAM
router.post('/sendMessage', auth, telegramBotController.telegramBotPing);
//#endregion

module.exports = router;
