const jwt = require("jsonwebtoken");
const config =require("../config/config");
const User = require("../models/userModel");
const authenticateUser = async(req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: Token missing" });
  }

  try {
    const decoded = jwt.verify(token,config.secret_jwt);
    const user=await User.findById(decoded._id).select("-password");
    if (!user) {
      return res.status(400).json({message:"User not found!"})
    }
    req.user = user; 
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: Token invalid" });
  }
};

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: `Access denied: ${req.user.role} not allowed` });
    }
    next();
  };
};

module.exports = {authenticateUser,authorizeRoles};
