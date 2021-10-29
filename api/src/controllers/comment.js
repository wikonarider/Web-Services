const { Qualification } = require('../db.js');

async function getComment(req, res, next) {
    const {id} = req.query
    if(id){
        const comments= await Qualification.findByPk(id)({attributes: ['comment']})    
        return res.send(comments)}
    const comments= await Qualification.findAll({attributes: ['comment']})
     console.log(comments)
    res.send(comments)

    
    
}

module.exports = {
    getComment,
  };