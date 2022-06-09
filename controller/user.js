const bcrypt = require('bcrypt');
const UserSchema = require('../models/user.model');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.signup = (req, res, next) => {
	bcrypt.hash(req.body.password, 10).then((hashPass) => {
		const user = new UserSchema({
			email: req.body.email,
			password: hashPass,
		});
		user
			.save()
			.then(() => {
				res.status(200).json({
					message: 'User successfully created',
				});
			})
			.catch((error) => {
				res.status(500).json({
					error: error,
				});
			});
	});
};

exports.login = (req, res, next) => {
	UserSchema.findOne({ email: req.body.email })
		.then((user) => {
			if (!user) {
				return res.status(401).json({
					error: new Error('User not found!'),
				});
			}
			bcrypt
				.compare(req.body.password, user.password)
				.then((valid) => {
					if (!valid) {
						return res.status(401).json({
							error: new Error('Incorrect password'),
						});
					}
					const token = jwt.sign(
						{ userId: user._id },
						process.env.JWT_ENCRYPTION_KEY,
						{
							expiresIn: '24h',
						}
					);
					res.status(200).json({
						userId: user._id,
						token: token,
					});
				})
				.catch((error) => {
					res.status(500).json({
						error: error,
					});
				});
		})
		.catch((error) => {
			res.status(500).json({
				error: error,
			});
		});
};
