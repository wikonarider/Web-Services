const { Category } = require('../db.js');

async function getCategories(req, res, next) {
  try {
    const categoriesInDb = await Category.findAll();
    res.status(200).send(categoriesInDb);
  } catch (e) {
    next(e);
  }
}

module.exports = {
  getCategories,
};
