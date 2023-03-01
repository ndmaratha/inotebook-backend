const express = require("express");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const router = express.Router();
const jwtSec="Jay Shree Ram";
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
			}
			const salt = await bcrypt.genSalt(10);
			const secPass = await bcrypt.hash(req.body.password, salt);
			//create a new user after checking
			user = await User.create({
				name: req.body.name,
				email: req.body.email,
				password: secPass,
			});
			const data={
				user:{
					id:user.id,
				}
			}
			const authToken= jwt.sign(data, jwtSec);
			//res.json(user);
			res.json({authToken});
		} catch(error) {
			//if some strang happned
			console.log("something error",error);
			res.status(500).send("some Error occures");
		}
	}
);
module.exports = router;
