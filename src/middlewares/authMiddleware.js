const jwt = require("jsonwebtoken");
require("dotenv").config();

const secretKey = process.env.SECRET;

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  if (token && token.startsWith("Bearer ")) {
    const authToken = token.split(" ")[1];
    // Verify the token
    jwt.verify(authToken, secretKey, (err, decoded) => {
      if (err) {
        console.log("Invalid token!");
        return res
          .status(401)
          .send({ message: "Unauthorized, Please login first" });
      }

      req.user = decoded;
      console.log("Authorization successful!");
      next();
    });
  } else {
    console.log("Authorization token missing!");
    res.status(401).send({ message: "Unauthorized, Please login first" });
  }
};

module.exports = authMiddleware;
