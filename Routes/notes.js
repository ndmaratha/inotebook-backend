const express = require("express");
const { body, validationResult } = require("express-validator");

const Note = require("../models/Note");
const fetchUser = require("../Middleware/fetchUser");
const router = express.Router();

router.get("/fetchallnotes", fetchUser, async (req, res) => {
	const notes = await Note.find({ user: req.user.id });
	res.json(notes);
});

router.post(
	"/addnote",
	fetchUser,
	[
		body("title", "Title should be greater Than Two Character").isLength({
			min: 2,
		}),
		body("description", "Description should be greater than 5").isLength({
			min: 5,
		}),
	],
	async (req, res) => {
		try {
			const { title, description, tag } = req.body;
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json({ errors: errors.array() });
			}
			const note = new Note({
				title,
				description,
				tag,
				user: req.user.id,
			});
			const saveNote = await note.save();
			res.json(saveNote);
		} catch (error) {
			//if some strang happned
			console.log("something error", error);
			res.status(500).send("some Error occures");
		}
	}
);
module.exports = router;
