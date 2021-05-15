const User = require("./../../models/mongodb/users");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
	let user = await User.find({
		username: req.body.username,
		password: req.body.password,
	}); // check ke mongodb

	if (!user || user.length < 1) {
		return res.status(200).json({msg:'user unknow' , login: false});
	};

	const token = jwt.sign(
		{ id: user.id, username: user.username },
		process.env.JWTTOKEN
	);

	res.status(200).json({ login: true, msg:'success', token: token, name: user[0].name });
}