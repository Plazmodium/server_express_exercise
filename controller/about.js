const AboutModel = require('../models/about.model');

exports.getAbout = (req, res, next) => {
	AboutModel.find()
		.then((response) => {
			res.status(200).json(response);
		})
		.catch((error) => {
			res.status(400).json({ error: error });
		});
};

exports.postAbout = (req, res, next) => {
	const about = new AboutModel({
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eu felis lectus. Duis pellentesque finibus congue. Donec eu libero rhoncus, ultricies quam a, volutpat eros. In at metus purus. Suspendisse eleifend magna vel pharetra efficitur. Pellentesque consectetur orci ac augue ultrices, a egestas erat dictum. Nunc porta efficitur ante ut auctor. In ante ligula, aliquet eget dignissim pretium, porta scelerisque tellus. Fusce aliquam blandit felis, id ultrices purus molestie vel. Curabitur venenatis turpis at tincidunt tincidunt. Integer nec congue eros. In vitae leo efficitur, volutpat felis nec, pellentesque arcu. Proin vulputate justo vestibulum turpis tristique, in congue felis ullamcorper. Vivamus maximus augue fermentum facilisis pulvinar.',
	});
	about
		.save()
		.then(() => {
			res.status(201).json({ message: 'Data added successfully!' });
		})
		.catch((error) => {
			res.status(400).json({ message: error });
		});
};

exports.putAbout = (req, res, next) => {
	const about = new AboutModel({
		_id: req.params.id,
		description: req.body.description,
	});
	AboutModel.updateOne({ _id: req.params.id }, about)
		.then(() => {
			res.status(201).json({
				message: 'About description updated successfully!',
			});
		})
		.catch((error) => {
			res.status(400).json({
				message: error,
			});
		});
};

exports.deleteAbout = (req, res, next) => {
	AboutModel.deleteOne({ _id: req.params.id })
		.then(() => {
			res.status(200).json({
				message: 'About description deleted successfully!',
			});
		})
		.catch((error) => {
			res.status(400).json({
				error: error,
			});
		});
};
