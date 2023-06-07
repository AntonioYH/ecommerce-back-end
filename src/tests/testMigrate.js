const User = require("../models/User");
const sequelize = require("../utils/connection");
require("../models/User");
require("../models/Category");
require("../models");
require("../models/Product");

const main = async () => {
	try {
		await sequelize.sync({ force: true });

		await User.create({
			firstName: "userTest",
			lastName: "userTest",
			email: "user@test.com",
			password: "userTest",
			phone: "1234567890",
		});

		process.exit();
	} catch (error) {
		console.log(error);
	}
};

main();
