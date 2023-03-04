const express = require("express");
const { body, validationResult } = require("express-validator");

const Note = require("../models/Note");
const fetchUser = require("../Middleware/fetchUser");
const { findByIdAndUpdate } = require("../models/Note");
const router = express.Router();


//first Route1 fetch all notes login required
router.get("/fetchallnotes", fetchUser, async (req, res) => {
	const notes = await Note.find({ user: req.user.id });
	res.json(notes);
});

// Route2  add notes login required
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

// Route3  update notes login required

router.put("/updatenote/:id", fetchUser, async (req, res) => {
	try {
		const { title, description, tag } = req.body;
		const newNote = {};
		if (title) {
			newNote.title = title;
		}
		if (description) {
			newNote.description = description;
		}
		if (tag) {
			newNote.tag = tag;
		}
		let note =await Note.findById(req.params.id);
		if (!note) {
			return res.status(404).send("not Found");
		}
		if (note.user.toString() != req.user.id) {
			return res.status(401).send("not allwed");
		}
		note = await Note.findByIdAndUpdate(
			req.params.id,
			{ $set: newNote },
			{ new: true }
		);
		
		res.json(note);
	} catch (error) {
		//if some strang happned
		console.log("something error", error);
		res.status(500).send("some Error occures");
	}
});
// Route4  delete notes login required

router.delete("/deletenote/:id", fetchUser, async (req, res) => {
	try {
		
		
		let note =await Note.findById(req.params.id);
		if (!note) {
			return res.status(404).send("not Found");
		}
		if (note.user.toString() != req.user.id) {
			return res.status(401).send("not allwed");
		}
		
		note=await Note.findByIdAndDelete(req.params.id)
		res.json({"successfully" :"deleted",note:note});
	} catch (error) {
		//if some strang happned
		console.log("something error", error);
		res.status(500).send("some Error occures");
	}
});
module.exports = router;
