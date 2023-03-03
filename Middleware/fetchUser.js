const jwt = require("jsonwebtoken");
const jwtSec = "Jay Shree Ram";

const fetchUser = (req, res, next) => {
	const token = req.header("auth-token");

	if (!token) {
		return res
			.status(401)
			.send({ error: "Plz authenticate using valid token" });
	}
	try {
		const data = jwt.verify(token, jwtSec);
		req.user = data.user;
		next();
	} catch (error) {
		res.status(401).send({ error: "Plz authenticate using valid token" });
	}
};

module.exports = fetchUser;
