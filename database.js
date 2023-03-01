const mongoose = require("mongoose");
const mongoURI = "mongodb://127.0.0.1:27017/inotebook";

const connectTomongoose = () => {
	mongoose.connect(mongoURI, (err) => {
		if (err) {
			console.log(`caught err ${err}`);
		} else {
			console.log("connected to database");
		}
	});
};
module.exports = connectTomongoose;
