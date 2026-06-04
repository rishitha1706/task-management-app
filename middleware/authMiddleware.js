const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {

  try {

    const authHeader = req.header("Authorization");

    if (!authHeader) {
      return res.status(401).json({
        message: "No token, authorization denied"
      });
    }

    // REMOVE "Bearer "
    const token = authHeader.split(" ")[1];

    const verified = jwt.verify(token, "secretkey");

    req.user = verified;

    next();

  } catch (error) {

    res.status(401).json({
      message: "Token is not valid"
    });
  }
};

module.exports = authMiddleware;