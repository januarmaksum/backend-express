const jwt = require("jsonwebtoken");
const { MESSAGES } = require("../utils/constants");

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ message: MESSAGES.ERROR_UNAUTHORIZED });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ message: MESSAGES.TOKEN_EXPIRED });
      }
      return res.status(401).json({ message: MESSAGES.TOKEN_INVALID });
    }

    req.userId = decoded.id;
    next();
  });
};

module.exports = verifyToken;