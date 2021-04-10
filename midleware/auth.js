const jwt = require("jsonwebtoken");
const auth = (req, res, next) => {
	try {
		const token = req.headers("x-auth-token");
		if (!token) {
			return res.status(401).json({ msg: "no authenticated token" });
		}
		const verify = jwt.verify(token, "secret");
		if (!verify) {
			return res.status(401).json({ msg: "token verification failed" });
		}
		req.user = verify.id;
		next();
	} catch (err) {
		res.status(500).json({ err: err.massage });
	}
};

module.exports = auth;
