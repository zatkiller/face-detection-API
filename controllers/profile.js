const handleProfile = (req, res, db) => {
	const { id } = req.params;
	let found = false;
	db.select("*")
		.from("users")
		.where({
			id: id,
		})
		.then((user) => {
			if (user.length) {
				res.json(user[0]); //get 1st obj instead of entire array
			} else {
				res.status(400).json("Not found");
			}
		})
		.catch(res.status(400).json("Error Getting user"));
};

module.exports = {
	handleProfile: handleProfile,
};
