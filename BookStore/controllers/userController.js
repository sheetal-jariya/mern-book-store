const User = require("../models/userModel");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const nodemailer = require('nodemailer');

let otpStore = {};
const securePassword = async (password) => {
  try {
    const passwordHash = await bcryptjs.hash(password, 10);
    return passwordHash;
  } catch (error) {
    console.log("Hashing error", error);
  }
};

const create_token = (id) => {
  try {
    return jwt.sign({ _id: id ,role: User.role}, config.secret_jwt, { expiresIn: "1d" });
  } catch (error) {
    throw new Error("Token creation failed");
  }
};

// Register user
const registerUser = async (req, res) => {
  const role = req.body.role || 'user';
  console.log(role,"------role")
  const { name, email, password, confirmPassword, mobile, address } = req.body;

  try {
    const userData = await User.findOne({ email });
    if (userData) return res.status(200).send({ success: false, message: "User already exists" });
    if (password !== confirmPassword)
      return res.status(400).send({ success: false, message: "Passwords do not match" });

    const hashedPassword = await securePassword(password);

    const newUser = new User({ name, email, password: hashedPassword, mobile, address,role });
    const savedUser = await newUser.save();

    res.status(200).send({ success: true, data: savedUser });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};

// Login user
const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userData = await User.findOne({ email });
    if (!userData) return res.status(200).send({ success: false, msg: "Login details incorrect" });

    const isMatch = await bcryptjs.compare(password, userData.password);
    if (!isMatch) return res.status(200).send({ success: false, msg: "Login details incorrect" });

    const token = create_token(userData._id);

    const userResult = {
      _id: userData._id,
      name: userData.name,
      email: userData.email,
      mobile: userData.mobile,
      address: userData.address,
      token: token,
       role: userData.role,
    };

    res.status(200).send({ success: true, message: "Login successfully", data: userResult });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};

// Get profile (user is attached by middleware)
const getUserProfile = async (req, res) => {
  try {
    const user = req.user;
    res.status(200).send({ success: true, data: user });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};
const updateUserProfile = async (req, res) => {
  try {
    const { name, mobile, address } = req.body;
    const userId = req.user._id;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, mobile, address },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, message: "Profile updated successfully", data: updatedUser });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const forgotPasswordController = async (req, res) => {
  const { email } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ success: false, message: "Email not found" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore[email] = otp;

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      }
    });

    await transporter.sendMail({
      from: "sheetaljariya2214@gmail.com",
      to: email,
      subject: "Your OTP for Password Reset",
      text: `Your OTP is ${otp}`,
    });

    console.log("OTP sent to:", email, "| OTP:", otp);
    res.json({ success: true, message: "OTP sent to your email" });

  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const resetPasswordController=async(req,res)=>{
  try {
    const{email,newPassword,otp}=req.body;
    if (!email || !otp|| !newPassword) {
      return res.status(400).json({success:false,message:"All fileds are required!"});
    }
    const userData=await User.findOne({email});
    if (!userData) {
      return res.status(404).json({success:false,message:"User not found!"})
    }
    if (otpStore[email] !== otp) {
      return res.status(400).json({success:false,message:"Invalid OTP"});
    }
    const hashedPassword = await bcryptjs.hash(newPassword,10);
    userData.password=hashedPassword;
    await userData.save();
    delete otpStore[email];
    res.status(200).json({success:true,message:"Password reset successfully"})
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
}
module.exports = {
  registerUser,
  userLogin,
  getUserProfile,
  updateUserProfile,
  forgotPasswordController,
  resetPasswordController
};
