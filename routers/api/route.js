const router = require("express").Router();
const isAuth = require('./../../midleware/auth')

// models
const News = require("./../../models/mongodb/news");
const User = require("./../../models/mongodb/users");
const CallUs = require("./../../models/mongodb/call_us");

// controller
const authController = require('./../../controller/api/auth');

// login
router.post("/login", authController.login );

// add berita
router.post("/broadcast/addImage" , (req, res) => {

	if (!req.files) {
		return res.status(500).send({ msg: "file is not found" });
	}

	const myFile = req.files.file;
	myFile.mv(`${__dirname}/../../public/${myFile.name}`, function (err) {
		if (err) {
			console.log(err);
			return res.status(500).send({ msg: "Error occured" });
		}

		return res.send({
			status: true,
			name: myFile.name,
			path: `/${myFile.name}`,
		});
	});
});

// add news
router.post("/broadcast/addNews", isAuth , (req, res) => {
	const data = {
		judul: req.body.judul,
		isiText: req.body.isiText,
		imgUrl: req.body.imgUrl,
	};
	const news = new News({
		title: data.judul,
		content: data.isiText,
		imageUrl: data.imgUrl,
	});
	news.save();
	res.send({ msg: "succes" });
});

router.get("/broadcast/allData", (req, res) => {
	let news = News.find({}, (err,newsDB)=> {
		res.status(200).send(newsDB);
	})
});

// call-us from website
router.post("/call-us", (req, res) => {
	const newGuest = new User({
		name: req.body.name,
		email: req.body.email,
		msg: req.body.msg,
	});
	newGuest.save();

	res.status(200).json({ status: "success" });
});

module.exports = router;
