const { Users } = require("../db");

async function isAuthenticated(req, res, next) {
  try {
    const { userId } = req.cookies;
    if (userId) {
      const user = await Users.findByPk(userId);
      if (user) {
        next();
      } else {
        res.status(400).json({ data: "User not found" });
      }
    } else {
      res.status(400).json({ data: "User not logged in" });
    }
  } catch (e) {
    next(e);
  }
}

module.exports = {
  isAuthenticated,
};
