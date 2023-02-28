const mongoose = require("mongoose");
const mongoURI = "mongodb://localhost:27017/";

const connectTomongoose = () => {
	mongoose.connect(mongoURI, () => {
		console.log("connected to mongose");
	});

};
module.exports = connectTomongoose;
