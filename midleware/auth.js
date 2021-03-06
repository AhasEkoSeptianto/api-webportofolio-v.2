const jwt = require("jsonwebtoken");
const auth = (req, res, next) => {
	try {
		const token = req.body.token ;
		if (!token) {
			return res.status(401).json({ msg: "no authenticated token" });
		}
		const verify = jwt.verify(token, process.env.JWTTOKEN);
		if (!verify) {
			return res.status(401).json({ msg: "token verification failed" });
		}
		console.log('from midleware = ', verify);
		next();
	} catch (err) {
		res.status(500).json({ err: err.massage });
	}
};

module.exports = auth;
