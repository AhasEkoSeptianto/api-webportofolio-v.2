const express = require("express");
const port = process.env.PORT || 3001;
const cors = require("cors");
var bodyParser = require("body-parser");
const app = express();
const jwt = require("jsonwebtoken");

// db
const Postdb = require("./db/pushdb.js");
const CheckLogin = require("./db/check_login.js");

app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);
app.use(cors());

app.use(express.json());
app.use(express.urlencoded());

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
