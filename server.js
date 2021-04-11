const express = require("express");
const fileUpload = require("express-fileupload");
const port = process.env.PORT || 3001;
const cors = require("cors");
var bodyParser = require("body-parser");
const app = express();
const jwt = require("jsonwebtoken");

// db
const Postdb = require("./db/pushdb.js");
const CheckLogin = require("./db/check_login.js");
const News = require("./db/berita.js");

app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);
app.use(cors());

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static("public"));
app.use(fileUpload());

app.post("/call-us", (req, res) => {
	data = {
		name: req.body.name,
		email: req.body.email,
		msg: req.body.msg,
	};
	Postdb(data);
	res.send(
		"welcome " + req.body.name + " " + req.body.email + " " + req.body.msg
	);
});

// login
app.post("/login", async (req, res) => {
	data = {
		username: req.body.username,
		password: req.body.password,
	};
	let check = await CheckLogin(data); // check ke mongodb
	const token = jwt.sign(
		{ id: check.id, username: check.username },
		"secret"
	);

	res.send({ login: check.result, token: token, username: check.username });
});

app.listen(port, () => {
	console.log("app running at 3001");
});

// add berita
app.post("/broadcast/addImage", (req, res) => {
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
app.post("/broadcast/addNews", (req, res) => {
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

app.get("/broadcast/allData", (req, res) => {
	let news = News.find().then((result) => res.send(result));
});
