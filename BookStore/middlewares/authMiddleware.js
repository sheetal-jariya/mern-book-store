const jwt = require("jsonwebtoken");
const config =require("../config/config")
const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: Token missing" });
  }

  try {
    const decoded = jwt.verify(token,config.secret_jwt);
    req.user = decoded; // attach user data to request
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: Token invalid" });
  }
};

module.exports = authenticateUser;
