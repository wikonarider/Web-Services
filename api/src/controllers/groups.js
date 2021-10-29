const { Category, Group } = require("../db.js");

async function getGroups(req, res, next) {
 const {category, subcategory} = req.query
  try {
    const groupsInDb = await Group.findAll({
      include: {
        model: Category,
        attributes: ["name", "id"],
      },
    });

  if (category){
  var filteredCategory = groupsInDb.filter(group => group.name == category )
  res.send(filteredCategory)
  }
  else if (subcategory){
      const subcatInDb = await Category.findAll({
        where : {
          name : subcategory
        }
      })

      res.send(subcatInDb)
  }else{
    
    res.status(200).send(groupsInDb);

  }


  } catch (e) {
    next(e);
  }
}

module.exports = {
  getGroups,
};
