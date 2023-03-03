const express = require("express");

const Notes = require("../models/Note");
const fetchUser = require("../Middleware/fetchUser");
const router = express.Router();

router.get("/fetchallnotes", fetchUser, async (req, res) => {
	const notes =await Notes.find({ user: req.user.id });
	res.json(notes);
});
module.exports = router;
