const express = require("express");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const router = express.Router();

//create user using using post /api/auth/createUser
router.post(
	"/createUser",
	[
		//this is a express validotor sytax
		body("name", "enter valid name").isLength({ min: 2 }),
		body("email", "enter valid email").isEmail(),
		body("password", "password should be greater than 5").isLength({ min: 5 }),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		try {
			//check whether user exist or not
			let user = await User.findOne({ email: req.body.email });
			if (user) {
				res.status(400).json({ error: "sorry email already exist" });
			} //create a new user after checking
			user = await User.create({
				name: req.body.name,
				email: req.body.email,
				password: req.body.password,
			});
			res.json({ Done: "successfull" });
		} catch {
			//if some strang happned
			console.log("something error");
			res.status(500).send("some Error occures");
		}
		// .then((user) => res.json(user))
		// .catch((err) => {
		// 	console.log(err);
		// 	res.json({ error: "plz enter unique value" });
		// });
	}
);
module.exports = router;
