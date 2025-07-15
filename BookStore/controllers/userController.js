const User = require("../models/userModel");
const config=require("../config/config")
const bcryptjs = require('bcryptjs');
const jwt = require("jsonwebtoken");

exports.uploadFile = (req, res) => {
	res.send("File uploaded successfully!");
};
const securePassword = async (password) => {
	try {
		const passwordHash = await bcryptjs.hash(password, 10);
		return passwordHash;
	} catch (error) {
		console.log("error", error);
	}
}
const registerUser = async (req, res) => {
	const { name, email, password, mobile, address } = req.body;
	try {
		const userData = await User.findOne({ email: email });
		if (userData) {
			return res.status(200).send({ success: false, message: "User already exists" });
		}
		// Hash the password
		const spassword = await securePassword(password);
		const user = new User({
			name,
			email,
			password: spassword,
			mobile,
			address,
		});
		const savedUser = await user.save();
		res.status(200).send({ success: true, data: savedUser });
	} catch (error) {
		res.status(400).send({ success: false, message: error.message });
	}
}

const create_token = async (id) => {
	try {
		const token = await jwt.sign({ _id: id }, config.secret_jwt);
		return token
	} catch (error) {
		res.status(400).send(error.message, "error in create token");
	}
}
const userLogin = async (req, res) => {
	const email = req.body.email;
	const password = req.body.password;
	const userData = await User.findOne({ email: email });

	try {
if (userData) {
	const passwordMatch = await bcryptjs.compare(password, userData.password);
	if (passwordMatch) {
		const tokenData = await create_token(userData.id);
			const userResult = {
				 _id: userData._id,
				name: userData.name,
				email: userData.email,
				password: userData.password,
				mobile: userData.mobile,
				token: tokenData,
				address: userData.address
			}

			const response = {
				success: true,
				message: "login successfully",
				data: userResult
			}

			res.status(200).send(response,"cmsggggg")
		}
		else {
			res.status(200).send({ success: false, msg: "login details are incorrect" })
		}

	}
	 else {
      res
        .status(200)
        .send({ success: false, msg: "login details are incorrect.." });
    }
	} catch (error) {
 res.status(400).send(error.message,"error in login ....");
	}
}

module.exports = {
	registerUser,
	userLogin
}