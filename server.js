const express = require("express");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const knex = require("knex");

const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

const db = knex({
	client: "pg",
	connection: {
		connectionString: process.env.DATABASE_URL,
		ssl: {
			rejectUnauthorized: false,
		},
	},
});

const app = express();
app.use(express.json());
app.use(cors());

//root route
app.get("/", (req, res) => {
	res.send(db.users);
});

app.post("/signin", (req, res) => signin.handleSignIn(req, res, db, bcrypt));

//Always send sensitive information in a http request
//In a post body, using bcrypt to generate a hash and compare
//for authentication
app.post("/register", (req, res) =>
	register.handleRegister(req, res, db, bcrypt)
); //dependencies injection
app.get("/profile/:id", (req, res) => profile.handleProfile(req, res, db));
app.put("/image", (req, res) => {
	image.handleImage(req, res, db);
});
app.post("/imageurl", (req, res) => {
	image.handleApiCall(req, res);
});

app.listen(process.env.PORT || 3001, () => {
	console.log(`app is running on port ${process.env.PORT}`);
});
