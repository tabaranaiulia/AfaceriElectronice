const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const bearerToken = req.headers["authorization"];
  if (!bearerToken) {
    return res
      .status(403)
      .json({ success: false, message: "No token provided" });
  }

  const token = bearerToken.split(" ")[1];

  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(400).json({ success: false, message: "Invalid token" });
    }

    console.log(decoded + " alex");
    req.userId = decoded.id;
    next();
  });
};

const isValidToken = (token) => {
  try {
    jwt.verify(token, process.env.TOKEN_SECRET);
    return true;
  } catch (error) {
    return false;
  }
};

module.exports = {
  verifyToken,
  isValidToken,
};
