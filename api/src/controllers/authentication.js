require("dotenv").config();
const { Users } = require("../db");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

async function generateToken(req, res, next) {
  const { username, password } = req.body;
  if (username && password) {
    // Busco el usuario
    const user = await Users.findOne({
      where: {
        username: username,
      },
    });
    if (user) {
      const check = await user.validPassword(password);
      if (check) {
        const accessToken = jwt.sign({ id: user.id }, SECRET_KEY);
        res.json({
          id: user.id,
          token: accessToken,
        });
      } else {
        res.status(400).json({ message: "Invalid password" });
      }
    } else {
      res.status(400).json({ message: "User does not exist" });
    }
  } else {
    res.status(400).json({ message: "Username and password is required" });
  }
}

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(401).json({ message: "Token is not valid" });
      }
      req.user = user.id;
      next();
    });
  } else {
    res.status(401).json({ message: "You are not authenticated" });
  }
}

module.exports = {
  generateToken,
  verifyToken,
};
