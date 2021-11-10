require("dotenv").config();
const { Users } = require("../db");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.CLIENT_ID);

async function generateToken(req, res, next) {
  try {
    const { username, password } = req.body;
    const { token } = req.query;
    if (token) {
      next();
      return;
    }
    if (username && password) {
      // Busco el usuario
      const user = await Users.findOne({
        where: {
          username: username,
        },
      });
      if (user) {
        if (user.ban) {
          res.status(401).json({ message: "Banned user" });
        } else {
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
        }
      } else {
        res.status(400).json({ message: "User does not exist" });
      }
    } else {
      res.status(400).json({ message: "Username and password is required" });
    }
  } catch (e) {
    next(e);
  }
}

async function googleAuthentication(req, res, next) {
  try {
    const { token } = req.query;

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience:
        "316128007785-fif02sojlsoinu9s5eugus3qaagiclid.apps.googleusercontent.com",
    });

    const { email } = ticket.getPayload();

    const user = await Users.findOne({
      where: {
        email: email,
      },
    });

    if (user) {
      const accessToken = jwt.sign({ id: user.id }, SECRET_KEY);
      res.json({
        id: user.id,
        token: accessToken,
      });
    } else {
      res.status(400).json({ message: "Unregistered user" });
    }
  } catch (e) {
    next(e);
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
  googleAuthentication,
};
