const connectTomongoose = require("./database");
console.log("server is started");
connectTomongoose();
const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
	res.send("Hello Nayan Desai is Don");
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
