const express = require('express');
const app = express();
require('dotenv').config();

const aboutRoutes = require('./routes/about');
const telegramBotRoutes = require('./routes/telegram-bot');
const userRoutes = require('./routes/user');

const mongoose = require('mongoose');
const mongoURI = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@pixartcluster0.2keux.mongodb.net/${process.env.MONGODB_CLUSTER_NAME}?retryWrites=true&w=majority`;

mongoose
	.connect(mongoURI, {
		useUnifiedTopology: true,
		useNewUrlParser: true,
		useCreateIndex: true,
	})
	.then(() => {
		console.log('Successfully connected to MongoDB Atlas!');
	})
	.catch((error) => {
		console.log('Unable to connect to MongoDB Atlas!');
		console.error(error);
	});

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
	);
	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET, POST, PUT, DELETE, PATCH, OPTIONS'
	);
	next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/about', aboutRoutes);
app.use('/api/telegram', telegramBotRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;
