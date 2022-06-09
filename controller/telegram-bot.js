var moment = require('moment');
require('dotenv').config();

//https://api.telegram.org/bot<token>/getUpdates
//https://api.telegram.org/bot<token>/sendMessage?chat_id=<group chat id >&text=<our text>

const { sendMessageFor } = require('simple-telegram-message');
const sendMessage = sendMessageFor(
	`${process.env.TELEGRAM_BOT_TOKEN}`,
	`${process.env.TELEGRAM_BOT_CHANNEL_ID}`
);

exports.telegramBotPing = (req, res, next) => {
	const today = moment().format('MMMM Do YYYY, h:mm:ss a');
	const long = req.body.long;
	const lat = req.body.lat;
	const url = `https://www.latlong.net/c/?lat=${lat}&long=${long}`;

	sendMessage(`There was a ping on your website \n ${today} \n ${url}`).catch(
		(error) => {}
	);

	res.sendStatus(201);
};
