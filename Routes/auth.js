const express = require("express");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const router = express.Router();

router.post(
	"/",
	[
		body("name", "enter valid name").isLength({ min: 2 }),
		body("email", "enter valid email").isEmail(),
		body("password", "password should be greater than 5").isLength({ min: 5 }),
	],
	(req, res) => {
		console.log(req.body);
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		User.create({
			name: req.body.name,
			email: req.body.email,
			password: req.body.password,
		}).then((user) => res.json(user))
		.catch((err) => {console.log(err)
		res.json({error:"plz enter unique value"})});
	}
);
module.exports = router;
