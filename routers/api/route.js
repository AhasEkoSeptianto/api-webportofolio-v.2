const router = require("express").Router();
const jwt = require("jsonwebtoken");
const isAuth = require('./../../midleware/auth')

// models
const News = require("./../../models/mongodb/news");
const User = require("./../../models/mongodb/users");
const CallUs = require("./../../models/mongodb/call_us");

// login
router.post("/login", async (req, res) => {
	let user = await User.find({
		username: req.body.username,
		password: req.body.password,
	}); // check ke mongodb

	console.log(user[0].username);

	if (!user) {
		return res.status(500).json({msg:'user unknow'});
	};

	const token = jwt.sign(
		{ id: user.id, username: user.username },
		process.env.JWTTOKEN
	);

	res.status(200).json({ login: true, msg:'success', token: token, username: user[0].username });
});

// add berita
router.post("/broadcast/addImage" , (req, res) => {
	if (!req.files) {
		return res.status(500).send({ msg: "file is not found" });
	}

	const myFile = req.files.file;
	myFile.mv(`${__dirname}/public/${myFile.name}`, function (err) {
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
		judul: data.judul,
		isiText: data.isiText,
		imgUrl: data.imgUrl,
	});

	news.save();


	res.send({ msg: "succes" });
});

router.get("/broadcast/allData", (req, res) => {
	let news = News.find().then((result) => res.send(result));
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
