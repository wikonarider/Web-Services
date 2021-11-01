const { Service, Users, Qualification, Category, Group, Province } = require("../db.js");
const { Op } = require("sequelize");

//------------------------------------------------------------------------------------------------------price

async function orderByPrice(objQuery, res, next) {
  const { order, province, group, category, startRange, endRange } = objQuery;
  let priceFilter



  if (order === "ASC" && !province && !group &&  !category &&  !startRange &&  !endRange) {
    console.log("llego bien")     
    priceFilter = await Service.findAll({
      attributes: ["id", "title", "img", "description", "price", "userId"],
      include: [
        {
          model: Category,
          attributes: ["name"],
          include: {
            model: Group,
            attributes: ["name"],
          },
        },
      ],
      limit:30,
      order: [["price", "ASC"]],
    });
  }   if (order === "DESC" && !province && !group &&  !category &&  !startRange &&  !endRange){
    priceFilter = await Service.findAll({
      attributes: ["id", "title", "img", "description", "price", "userId"],
      include: [
        {
          model: Category,
          attributes: ["name"],
          include: {
            model: Group,
            attributes: ["name"],
          },
        },
      ],
      limit:30,
      order: [["price", "DESC"]],
    });
  }



  if (order === "ASC" && !province && group &&  !category &&  !startRange &&  !endRange) {
    console.log("llegue")    
    priceFilter = await Service.findAll({
      attributes: ["id", "title", "img", "description", "price", "userId"],
      include: [
        {
          model: Category,
          attributes: ["name"],
          include: {
            model: Group,
            attributes: ["name"],
            where: {
              id: group,
            }
          },
        },
      ],     
      limit:30,
      order: [["price", "ASC"]],
    });
  } 
  if (order === "DESC" && !province && group &&  !category &&  !startRange &&  !endRange) {    
    priceFilter = await Service.findAll({
      attributes: ["id", "title", "img", "description", "price", "userId"],
      include: [
        {
          model: Category,
          attributes: ["name"],
          include: {
            model: Group,
            attributes: ["name"],
            where: {
              id: group,
            }
          },
        },
      ],    
      limit:30,
      order: [["price", "DESC"]],
    });
  }



  if (order === "ASC" && !province && group &&  category &&  !startRange &&  !endRange) {
    console.log("llegue")    
    priceFilter = await Service.findAll({
      attributes: ["id", "title", "img", "description", "price", "userId"],
      include: [
        {
          model: Category,
          attributes: ["name"],
          where: {
            id: category,
          },
          include: {
            model: Group,
            attributes: ["name"],
            where: {
              id: group,
            },
          },
        },
      ],     
      limit:30,
      order: [["price", "ASC"]],
    });
  } 
  if (order === "DESC" && !province && group &&  category &&  !startRange &&  !endRange) {    
    priceFilter = await Service.findAll({
      attributes: ["id", "title", "img", "description", "price", "userId"],
      include: [
        {
          model: Category,
          attributes: ["name"],
          where: {
            id: category,
          },
          include: {
            model: Group,
            attributes: ["name"],
            where: {
              id: group,
            }
          },
        },
      ],     
      limit:30,
      order: [["price", "DESC"]],
    });
  }



  if (order === "ASC" && !province && !group &&  !category &&  startRange &&  endRange) {     
    priceFilter = await Service.findAll({
      attributes: ["id", "title", "img", "description", "price", "userId"],
      where: {
        price: {
          [Op.between]: [startRange, endRange],
        },
      },
      include: [
        {
          model: Category,
          attributes: ["name"],
          include: {
            model: Group,
            attributes: ["name"],
          },
        },
      ],    
      limit:30,
      order: [["price", "ASC"]],
    });
  }   if (order === "DESC" && !province && !group &&  !category &&  startRange &&  endRange){
    priceFilter = await Service.findAll({
      attributes: ["id", "title", "img", "description", "price", "userId"],
      where: {
        price: {
          [Op.between]: [startRange, endRange],
        },
      },
      include: [
        {
          model: Category,
          attributes: ["name"],
          include: {
            model: Group,
            attributes: ["name"],
          },
        },
      ],     
      limit:30,
      order: [["price", "DESC"]],
    });
  }

if (order === "ASC" && !province && group &&  !category &&  startRange &&  endRange) {     
    priceFilter = await Service.findAll({
      attributes: ["id", "title", "img", "description", "price", "userId"],
      where: {
        price: {
          [Op.between]: [startRange, endRange],
        },
      },
      include: [
        {
          model: Category,
          attributes: ["name"],
          include: {
            model: Group,
            attributes: ["name"],
            where: {
              id: group,
            },
          },
        },
      ],     
      limit:30,
      order: [["price", "ASC"]],
    });
  }   if (order === "DESC" && !province && group &&  !category &&  startRange &&  endRange){
    priceFilter = await Service.findAll({
      attributes: ["id", "title", "img", "description", "price", "userId"],
      where: {
        price: {
          [Op.between]: [startRange, endRange],
        },
      },
      include: [
        {
          model: Category,
          attributes: ["name"],
          include: {
            model: Group,
            attributes: ["name"],
            where: {
              id: group,
            },
          },
        },
      ],     
      limit:30,
      order: [["price", "DESC"]],
    });

  }

    if (order === "ASC" && !province && group &&  category &&  startRange &&  endRange) {     
      priceFilter = await Service.findAll({
        attributes: ["id", "title", "img", "description", "price", "userId"],
        where: {
          price: {
            [Op.between]: [startRange, endRange],
          },
        },
        include: [
          {
            model: Category,
            attributes: ["name"],
            where: {
              id: category,
            },
            include: {
              model: Group,
              attributes: ["name"],
              where: {
                id: group,
              },
            },
          },
        ],     
        limit:30,
        order: [["price", "ASC"]],
      });
    }   if (order === "DESC" && !province && group &&  category &&  startRange &&  endRange){
      priceFilter = await Service.findAll({
        attributes: ["id", "title", "img", "description", "price", "userId"],
        where: {
          price: {
            [Op.between]: [startRange, endRange],
          },
        },
        include: [
          {
            model: Category,
            attributes: ["name"],
            where: {
              id: category,
            },
            include: {
              model: Group,
              attributes: ["name"],
              where: {
                id: group,
              },
            },
          },
        ],  
        limit:30,
        order: [["price", "DESC"]],
      });
  }


  if (order === "ASC" && province && !group &&  !category &&  !startRange &&  !endRange) {     
    priceFilter = await Service.findAll({
      attributes: ["id", "title", "img", "description", "price", "userId"],
      include: [{
         model: Province,
         where: {
          id: province,
        },
      },
        {
          model: Category,
          attributes: ["name"],
          include: {
            model: Group,
            attributes: ["name"],
          },
        },
      ],
      order: [["price", "ASC"]],
    });
  }
  if (order === "DESC" && province && !group &&  !category &&  !startRange &&  !endRange) {     
    priceFilter = await Service.findAll({
      attributes: ["id", "title", "img", "description", "price", "userId"],
      include: [{
        model: Province,
        where: {
         id: province,
       },
     },
        {
          model: Category,
          attributes: ["name"],
          include: {
            model: Group,
            attributes: ["name"],
          },
        },
      ], 
      limit:30,
      order: [["price", "DESC"]],
    });
  }
  

  if (order === "ASC" && province && group &&  !category &&  !startRange &&  !endRange) {     
    priceFilter = await Service.findAll({
      attributes: ["id", "title", "img", "description", "price", "userId"],
      include: [{
         model: Province,
         where: {
          id: province,
        },
      },
        {
          model: Category,
          attributes: ["name"],
          include: {
            model: Group,
            attributes: ["name"],
            where: {
              id: group,
            }
          },
        },
      ], 
      limit:30,
      order: [["price", "ASC"]],
    });
  }
  if (order === "DESC" && province && group &&  !category &&  !startRange &&  !endRange) {     
    priceFilter = await Service.findAll({
      attributes: ["id", "title", "img", "description", "price", "userId"],
      include: [{
        model: Province,
        where: {
         id: province,
       },
     },
        {
          model: Category,
          attributes: ["name"],
          include: {
            model: Group,
            attributes: ["name"],
            where: {
              id: group,
            }
          },
        },
      ], 
      limit:30,
      order: [["price", "DESC"]],
    });
  }


  if (order === "ASC" && province && group &&  category &&  !startRange &&  !endRange) {     
    priceFilter = await Service.findAll({
      attributes: ["id", "title", "img", "description", "price", "userId"],
      include: [{
         model: Province,
         where: {
          id: province,
        },
      },
        {
          model: Category,
          attributes: ["name"],
          where: {
            id: category,
          },
          include: {
            model: Group,
            attributes: ["name"],
            where: {
              id: group,
            }
          },
        },
      ], 
      limit:30,
      order: [["price", "ASC"]],
    });
  }
  if (order === "DESC" && province && group &&  category &&  !startRange &&  !endRange) {     
    priceFilter = await Service.findAll({
      attributes: ["id", "title", "img", "description", "price", "userId"],
      include: [{
        model: Province,
        where: {
         id: province,
       },
     },
        {
          model: Category,
          attributes: ["name"],
          where: {
            id: category,
          },
          include: {
            model: Group,
            attributes: ["name"],
            where: {
              id: group,
            }
          },
        },
      ], 
      limit:30,
      order: [["price", "DESC"]],
    });
  }


  if (order === "ASC" && province && group &&  category &&  startRange &&  endRange) {     
    priceFilter = await Service.findAll({
      attributes: ["id", "title", "img", "description", "price", "userId"],
      where: {
        price: {
          [Op.between]: [startRange, endRange],
        },
      },
      include: [{
         model: Province,
         where: {
          id: province,
        },
      },
        {
          model: Category,
          attributes: ["name"],
          where: {
            id: category,
          },
          include: {
            model: Group,
            attributes: ["name"],
            where: {
              id: group,
            }
          },
        },
      ], 
      limit:30,
      order: [["price", "ASC"]],
    });
  }
  if (order === "DESC" && province && group &&  category &&  startRange &&  endRange) {     
    priceFilter = await Service.findAll({
      attributes: ["id", "title", "img", "description", "price", "userId"],
      where: {
        price: {
          [Op.between]: [startRange, endRange],
        },
      },
      include: [{
        model: Province,
        where: {
         id: province,
       },
     },
        {
          model: Category,
          attributes: ["name"],
          where: {
            id: category,
          },
          include: {
            model: Group,
            attributes: ["name"],
            where: {
              id: group,
            }
          },
        },
      ], 
      limit:30,
      order: [["price", "DESC"]],
    });
  }



  if (order === "ASC" && province && group &&  !category &&  startRange &&  endRange) {     
    priceFilter = await Service.findAll({
      attributes: ["id", "title", "img", "description", "price", "userId"],
      where: {
        price: {
          [Op.between]: [startRange, endRange],
        },
      },
      include: [{
         model: Province,
         where: {
          id: province,
        },
      },
        {
          model: Category,
          attributes: ["name"],
          include: {
            model: Group,
            attributes: ["name"],
            where: {
              id: group,
            }
          },
        },
      ], 
      limit:30,
      order: [["price", "ASC"]],
    });
  }


  if (order === "DESC" && province && group &&  !category &&  startRange &&  endRange) {     
    priceFilter = await Service.findAll({
      attributes: ["id", "title", "img", "description", "price", "userId"],
      where: {
        price: {
          [Op.between]: [startRange, endRange],
        },
      },
      include: [{
        model: Province,
     },
        {
          model: Category,
          attributes: ["name"],
          where: {
            id: category,
          },
          include: {
            model: Group,
            attributes: ["name"],
            where: {
              id: group,
            }
          },
        },
      ], 
      limit:30,
      order: [["price", "DESC"]],
    });
  }
  


  return res.status(200).send(priceFilter);
}
//-------------------------------------------------------------------------------------------date create
async function orderByCreatedDate(objQuery, res, next) {
    const { order, province, group, category, startRange, endRange } = objQuery;
    let priceFilter
    if (order === "ASC" && !province && !group &&  !category &&  !startRange &&  !endRange) {     
      priceFilter = await Service.findAll({
        attributes: ["id", "title", "img", "description", "price", "userId"],
        include: [
          {
            model: Category,
            attributes: ["name"],
            include: {
              model: Group,
              attributes: ["name"],
            },
          },
        ],
        order: [["createdAt", "ASC"]],
      });
    }   if (order === "DESC" && !province && !group &&  !category &&  !startRange &&  !endRange){
      priceFilter = await Service.findAll({
        attributes: ["id", "title", "img", "description", "price", "userId"],
        include: [
          {
            model: Category,
            attributes: ["name"],
            include: {
              model: Group,
              attributes: ["name"],
            },
          },
        ], 
        limit:30,
        order: [["price", "DESC"]],
      });
    }
  
  
  
    if (order === "ASC" && !province && group &&  !category &&  !startRange &&  !endRange) {
      console.log("llegue")    
      priceFilter = await Service.findAll({
        attributes: ["id", "title", "img", "description", "price", "userId"],
        include: [
          {
            model: Category,
            attributes: ["name"],
            include: {
              model: Group,
              attributes: ["name"],
              where: {
                id: group,
              }
            },
          },
        ], 
        limit:30,
        order: [["createdAt", "ASC"]],
      });
    } 
    if (order === "DESC" && !province && group &&  !category &&  !startRange &&  !endRange) {    
      priceFilter = await Service.findAll({
        attributes: ["id", "title", "img", "description", "price", "userId"],
        include: [
          {
            model: Category,
            attributes: ["name"],
            include: {
              model: Group,
              attributes: ["name"],
              where: {
                id: group,
              }
            },
          },
        ], 
        limit:30,
        order: [["createdAt", "DESC"]],
      });
    }
  
  
  
    if (order === "ASC" && !province && group &&  category &&  !startRange &&  !endRange) {
      console.log("llegue")    
      priceFilter = await Service.findAll({
        attributes: ["id", "title", "img", "description", "price", "userId"],
        include: [
          {
            model: Category,
            attributes: ["name"],
            where: {
              id: category,
            },
            include: {
              model: Group,
              attributes: ["name"],
              where: {
                id: group,
              },
            },
          },
        ], 
        limit:30,
        order: [["createdAt", "ASC"]],
      });
    } 
    if (order === "DESC" && !province && group &&  category &&  !startRange &&  !endRange) {    
      priceFilter = await Service.findAll({
        attributes: ["id", "title", "img", "description", "price", "userId"],
        include: [
          {
            model: Category,
            attributes: ["name"],
            where: {
              id: category,
            },
            include: {
              model: Group,
              attributes: ["name"],
              where: {
                id: group,
              }
            },
          },
        ], 
        limit:30,
        order: [["createdAt", "DESC"]],
      });
    }
  
  
  
    if (order === "ASC" && !province && !group &&  !category &&  startRange &&  endRange) {
      console.log("llego aca tambien")     
      priceFilter = await Service.findAll({
        attributes: ["id", "title", "img", "description", "price", "userId"],
        where: {
          price: {
            [Op.between]: [startRange, endRange],
          },
        },
        include: [
          {
            model: Category,
            attributes: ["name"],
            include: {
              model: Group,
              attributes: ["name"],
            },
          },
        ], 
        limit:30,
        order: [["createdAt", "ASC"]],
      });
    }   if (order === "DESC" && !province && !group &&  !category &&  startRange &&  endRange){
      priceFilter = await Service.findAll({
        attributes: ["id", "title", "img", "description", "price", "userId"],
        where: {
          price: {
            [Op.between]: [startRange, endRange],
          },
        },
        include: [
          {
            model: Category,
            attributes: ["name"],
            include: {
              model: Group,
              attributes: ["name"],
            },
          },
        ],
        order: [["createdAt", "DESC"]],
      });
    }
  
  if (order === "ASC" && !province && group &&  !category &&  startRange &&  endRange) {     
      priceFilter = await Service.findAll({
        attributes: ["id", "title", "img", "description", "price", "userId"],
        where: {
          price: {
            [Op.between]: [startRange, endRange],
          },
        },
        include: [
          {
            model: Category,
            attributes: ["name"],
            include: {
              model: Group,
              attributes: ["name"],
              where: {
                id: group,
              },
            },
          },
        ], 
        limit:30,
        order: [["createdAt", "ASC"]],
      });
    }   if (order === "DESC" && !province && group &&  !category &&  startRange &&  endRange){
      priceFilter = await Service.findAll({
        attributes: ["id", "title", "img", "description", "price", "userId"],
        where: {
          price: {
            [Op.between]: [startRange, endRange],
          },
        },
        include: [
          {
            model: Category,
            attributes: ["name"],
            include: {
              model: Group,
              attributes: ["name"],
              where: {
                id: group,
              },
            },
          },
        ], 
        limit:30,
        order: [["createdAt", "DESC"]],
      });
  
  
    }
      if (order === "ASC" && !province && group &&  category &&  startRange &&  endRange) {     
        priceFilter = await Service.findAll({
          attributes: ["id", "title", "img", "description", "price", "userId"],
          where: {
            price: {
              [Op.between]: [startRange, endRange],
            },
          },
          include: [
            {
              model: Category,
              attributes: ["name"],
              where: {
                id: category,
              },
              include: {
                model: Group,
                attributes: ["name"],
                where: {
                  id: group,
                },
              },
            },
          ], 
          limit:30,
          order: [["createdAt", "ASC"]],
        });
      }   if (order === "DESC" && !province && group &&  category &&  startRange &&  endRange){
        priceFilter = await Service.findAll({
          attributes: ["id", "title", "img", "description", "price", "userId"],
          where: {
            price: {
              [Op.between]: [startRange, endRange],
            },
          },
          include: [
            {
              model: Category,
              attributes: ["name"],
              where: {
                id: category,
              },
              include: {
                model: Group,
                attributes: ["name"],
                where: {
                  id: group,
                },
              },
            },
          ], 
          limit:30,
          order: [["createdAt", "DESC"]],
        });
    }
    

  if (order === "ASC" && province && !group &&  !category &&  !startRange &&  !endRange) {     
    priceFilter = await Service.findAll({
      attributes: ["id", "title", "img", "description", "price", "userId"],
      include: [{
         model: Province,
         where: {
          id: province,
        },
      },
        {
          model: Category,
          attributes: ["name"],
          include: {
            model: Group,
            attributes: ["name"],
          },
        },
      ],
      order: [["createdAt", "ASC"]],
    });
  }
  if (order === "DESC" && province && !group &&  !category &&  !startRange &&  !endRange) {     
    priceFilter = await Service.findAll({
      attributes: ["id", "title", "img", "description", "price", "userId"],
      include: [{
        model: Province,
        where: {
         id: province,
       },
     },
        {
          model: Category,
          attributes: ["name"],
          include: {
            model: Group,
            attributes: ["name"],
          },
        },
      ], 
      limit:30,
      order: [["createdAt", "DESC"]],
    });
  }
  

  if (order === "ASC" && province && group &&  !category &&  !startRange &&  !endRange) {     
    priceFilter = await Service.findAll({
      attributes: ["id", "title", "img", "description", "price", "userId"],
      include: [{
         model: Province,
         where: {
          id: province,
        },
      },
        {
          model: Category,
          attributes: ["name"],
          include: {
            model: Group,
            attributes: ["name"],
            where: {
              id: group,
            }
          },
        },
      ], 
      limit:30,
      order: [["createdAt", "ASC"]],
    });
  }
  if (order === "DESC" && province && group &&  !category &&  !startRange &&  !endRange) {     
    priceFilter = await Service.findAll({
      attributes: ["id", "title", "img", "description", "price", "userId"],
      include: [{
        model: Province,
        where: {
         id: province,
       },
     },
        {
          model: Category,
          attributes: ["name"],
          include: {
            model: Group,
            attributes: ["name"],
            where: {
              id: group,
            }
          },
        },
      ], 
      limit:30,
      order: [["createdAt", "DESC"]],
    });
  }


  if (order === "ASC" && province && group &&  category &&  !startRange &&  !endRange) {     
    priceFilter = await Service.findAll({
      attributes: ["id", "title", "img", "description", "price", "userId"],
      include: [{
         model: Province,
         where: {
          id: province,
        },
      },
        {
          model: Category,
          attributes: ["name"],
          where: {
            id: category,
          },
          include: {
            model: Group,
            attributes: ["name"],
            where: {
              id: group,
            }
          },
        },
      ], 
      limit:30,
      order: [["createdAt", "ASC"]],
    });
  }
  if (order === "DESC" && province && group &&  category &&  !startRange &&  !endRange) {     
    priceFilter = await Service.findAll({
      attributes: ["id", "title", "img", "description", "price", "userId"],
      include: [{
        model: Province,
        where: {
         id: province,
       },
     },
        {
          model: Category,
          attributes: ["name"],
          where: {
            id: category,
          },
          include: {
            model: Group,
            attributes: ["name"],
            where: {
              id: group,
            }
          },
        },
      ], 
      limit:30,
      order: [["createdAt", "DESC"]],
    });
  }


  if (order === "ASC" && province && group &&  category &&  startRange &&  endRange) {     
    priceFilter = await Service.findAll({
      attributes: ["id", "title", "img", "description", "price", "userId"],
      where: {
        price: {
          [Op.between]: [startRange, endRange],
        },
      },
      include: [{
         model: Province,
         where: {
          id: province,
        },
      },
        {
          model: Category,
          attributes: ["name"],
          where: {
            id: category,
          },
          include: {
            model: Group,
            attributes: ["name"],
            where: {
              id: group,
            }
          },
        },
      ], 
      limit:30,
      order: [["createdAt", "ASC"]],
    });
  }
  if (order === "DESC" && province && group &&  category &&  startRange &&  endRange) {     
    priceFilter = await Service.findAll({
      attributes: ["id", "title", "img", "description", "price", "userId"],
      where: {
        price: {
          [Op.between]: [startRange, endRange],
        },
      },
      include: [{
        model: Province,
        where: {
         id: province,
       },
     },
        {
          model: Category,
          attributes: ["name"],
          where: {
            id: category,
          },
          include: {
            model: Group,
            attributes: ["name"],
            where: {
              id: group,
            }
          },
        },
      ], 
      limit:30,
      order: [["createdAt", "DESC"]],
    });
  }



  if (order === "ASC" && province && group &&  !category &&  startRange &&  endRange) {     
    priceFilter = await Service.findAll({
      attributes: ["id", "title", "img", "description", "price", "userId"],
      where: {
        price: {
          [Op.between]: [startRange, endRange],
        },
      },
      include: [{
         model: Province,
         where: {
          id: province,
        },
      },
        {
          model: Category,
          attributes: ["name"],
          include: {
            model: Group,
            attributes: ["name"],
            where: {
              id: group,
            }
          },
        },
      ], 
      limit:30,
      order: [["createdAt", "ASC"]],
    });
  }


  if (order === "DESC" && province && group &&  !category &&  startRange &&  endRange) {     
    priceFilter = await Service.findAll({
      attributes: ["id", "title", "img", "description", "price", "userId"],
      where: {
        price: {
          [Op.between]: [startRange, endRange],
        },
      },
      include: [{
        model: Province,
     },
        {
          model: Category,
          attributes: ["name"],
          where: {
            id: category,
          },
          include: {
            model: Group,
            attributes: ["name"],
            where: {
              id: group,
            }
          },
        },
      ], 
      limit:30,
      order: [["createdAt", "DESC"]],
    });
  }
  


  
  
    return res.status(200).send(priceFilter);
}
//-------------------------------------------------------------------------------------------------date update
async function orderByUpdateDate(objQuery, res, next) {
  const { order } = objQuery;
  let dateFilter
  if (order === "ASC") {
    dateFilter = await Service.findAll({
      include: [
        {
          model: Category,
          attributes: ["name"],
          include: {
            model: Group,
            attributes: ["name"],
          },
        },
      ],
      order: [["updatedAt", "ASC"]],
    });
  } else {
    dateFilter = await Service.findAll({
      include: [
        {
          model: Category,
          attributes: ["name"],
          include: {
            model: Group,
            attributes: ["name"],
          },
        },
      ], 
      limit:30,
      order: [["updatedAt", "DESC"]],
    });
  }
  res.status(200).send(dateFilter);
}
//--------------------------------------------------------------------------------------------------title
async function orderTitle( title, res, next) {
  var dbServices = await Service.findAll({
    //Traigo todo de la db
    include: [
      {
        model: Users,
        through: { attributes: [] },
      },
      Qualification,
      {
        model: Category,
        include: {
          model: Group,
        },
      },
    ],
  });

  var filteredServices = [];
  dbServices.map((service) => {
    if (service.title.toLowerCase().includes(title.toLowerCase()))
      filteredServices.push(service);
  });
  return res.send(filteredServices); //Si coincide mando el servicio con ese title
}
//-------------------------------------------------------------------------------------------orderByScore
async function orderByQualifications(objQuery, res, next) {  

  const { order, province, group, category, startRange, endRange } = objQuery;
  let priceFilter
  if (order === "ASC" && !province && !group &&  !category &&  !startRange &&  !endRange) {     
    priceFilter = Qualification.findAll({
      attributes : ["score"],
      include: [
        {
          model: Service,
          attributes: ["id", "title", "img", "description", "price", "userId"],
          include: [
        {
          model: Category,
          attributes: ["name"],
          include: {
            model: Group,
            attributes: ["name"],
          },  },
        ],
        },
      ], 
      limit:30,
      order: [["score", "ASC"]],
    });
  }   if (order === "DESC" && !province && !group &&  !category &&  !startRange &&  !endRange){
    priceFilter = Qualification.findAll({
      attributes : ["score"],
      include: [
        {
          model: Service,
          attributes: ["id", "title", "img", "description", "price", "userId"],
          include: [
        {
          model: Category,
          attributes: ["name"],
          include: {
            model: Group,
            attributes: ["name"],
          },  },
        ],
        },
      ], 
      limit:30,
      order: [["score", "DESC"]],
    });
  }



  if (order === "ASC" && !province && group &&  !category &&  !startRange &&  !endRange) {
    console.log("llegue")    
    priceFilter = Qualification.findAll({
      attributes : ["score"],
      include: [
        {
          model: Service,
          attributes: ["id", "title", "img", "description", "price", "userId"],
      include: [
        {
          model: Category,
          attributes: ["name"],
          include: {
            model: Group,
            attributes: ["name"],
            where: {
              id: group,
            }
          },
        },
      ],
      }
      ], 
      limit:30,
      order: [["score", "ASC"]],
    });
  } 
  if (order === "DESC" && !province && group &&  !category &&  !startRange &&  !endRange) {    
    priceFilter = await Service.findAll({
      attributes: ["id", "title", "img", "description", "price", "userId"],
      include: [
        {
          model: Category,
          attributes: ["name"],
          include: {
            model: Group,
            attributes: ["name"],
            where: {
              id: group,
            }
          },
        },
      ], 
      limit:30,
      order: [["score", "DESC"]],
    });
  }



  if (order === "ASC" && !province && group &&  category &&  !startRange &&  !endRange) {
    console.log("llegue")    
    priceFilter = await Qualification.findAll({
      attributes : ["score"],
      include: [
        {
          model: Service,
          attributes: ["id", "title", "img", "description", "price", "userId"],
      include: [
        {
          model: Category,
          attributes: ["name"],
          where: {
            id: category,
          },
          include: {
            model: Group,
            attributes: ["name"],
            where: {
              id: group,
            },
          },
        },
        ],
        },
      ], 
      limit:30,
      order: [["score", "ASC"]],
    });
  } 
  if (order === "DESC" && !province && group &&  category &&  !startRange &&  !endRange) {    
    priceFilter = await Qualification.findAll({
      attributes : ["score"],
      include: [
        {
          model: Service,
          attributes: ["id", "title", "img", "description", "price", "userId"],
      include: [
        {
          model: Category,
          attributes: ["name"],
          where: {
            id: category,
          },
          include: {
            model: Group,
            attributes: ["name"],
            where: {
              id: group,
            }
          },  },
        ],
        },
      ], 
      limit:30,
      order: [["score", "DESC"]],
    });
  }



  if (order === "ASC" && !province && !group &&  !category &&  startRange &&  endRange) {     
    priceFilter = await Qualification.findAll({
      attributes : ["score"],
      include: [
        {
          model: Service,
          attributes: ["id", "title", "img", "description", "price", "userId"],
          where: {
          price: {
            [Op.between]: [startRange, endRange],
          },
        },
      include: [
        {
          model: Category,
          attributes: ["name"],
          include: {
            model: Group,
            attributes: ["name"],
          },  },
        ],
        },
      ], 
      limit:30,
      order: [["score", "ASC"]],
    });
  }   if (order === "DESC" && !province && !group &&  !category &&  startRange &&  endRange){
    priceFilter = await Qualification.findAll({
      attributes : ["score"],
      include: [
        {
          model: Service,
          attributes: ["id", "title", "img", "description", "price", "userId"],
          where: {
          price: {
            [Op.between]: [startRange, endRange],
          },
        },
      include: [
        {
          model: Category,
          attributes: ["name"],
          include: {
            model: Group,
            attributes: ["name"],
          },  },
        ],
        },
      ], 
      limit:30,
      order: [["score", "DESC"]],
    });
  }

if (order === "ASC" && !province && group &&  !category &&  startRange &&  endRange) {     
    priceFilter = await Qualification.findAll({
      attributes : ["score"],
      include: [
        {
          model: Service,
          attributes: ["id", "title", "img", "description", "price", "userId"],
          where: {
          price: {
            [Op.between]: [startRange, endRange],
          },
        },
      include: [
        {
          model: Category,
          attributes: ["name"],
          include: {
            model: Group,
            attributes: ["name"],
            where: {
              id: group,
            },
          },  },
        ],
        },
      ], 
      limit:30,
      order: [["score", "ASC"]],
    });
  }   if (order === "DESC" && !province && group &&  !category &&  startRange &&  endRange){
    priceFilter = await Qualification.findAll({
      attributes : ["score"],
      include: [
        {
          model: Service,
          attributes: ["id", "title", "img", "description", "price", "userId"],
          where: {
          price: {
            [Op.between]: [startRange, endRange],
          },
        },
      include: [
        {
          model: Category,
          attributes: ["name"],
          include: {
            model: Group,
            attributes: ["name"],
            where: {
              id: group,
            },
          },  },
        ],
        },
      ], 
      limit:30,
      order: [["score", "DESC"]],
    });

  }

    if (order === "ASC" && !province && group &&  category &&  startRange &&  endRange) {     
      priceFilter = await Qualification.findAll({
        attributes : ["score"],
        include: [
          {
            model: Service,
            attributes: ["id", "title", "img", "description", "price", "userId"],
            where: {
            price: {
              [Op.between]: [startRange, endRange],
            },
          },
        include: [
          {
            model: Category,
            attributes: ["name"],
            where: {
              id: category,
            },
            include: {
              model: Group,
              attributes: ["name"],
              where: {
                id: group,
              },
            },  },
          ],
          },
        ], 
        limit:30,
        order: [["score", "ASC"]],
      });
    }   if (order === "DESC" && !province && group &&  category &&  startRange &&  endRange){
      priceFilter = await Qualification.findAll({
        attributes : ["score"],
        include: [
          {
            model: Service,
            attributes: ["id", "title", "img", "description", "price", "userId"],
            where: {
            price: {
              [Op.between]: [startRange, endRange],
            },
          },
        include: [
          {
            model: Category,
            attributes: ["name"],
            where: {
              id: category,
            },
            include: {
              model: Group,
              attributes: ["name"],
              where: {
                id: group,
              },
            },  },
          ],
          },
        ], 
        limit:30,
        order: [["score", "DESC"]],
      });
   }

   
   if (order === "ASC" && province && !group &&  !category &&  !startRange &&  !endRange) {     
    priceFilter = await Qualification.findAll({
      attributes : ["score"],
      include: [
        {
          model: Service,
          attributes: ["id", "title", "img", "description", "price", "userId"],
      include: [{
         model: Province,
         where: {
          id: province,
        },
      },
        {
          model: Category,
          attributes: ["name"],
          include: {
            model: Group,
            attributes: ["name"],
          },},
        ],
        },
      ],
      limit:30,
      order: [["score", "ASC"]],
    });
    
  }
  if (order === "DESC" && province && !group &&  !category &&  !startRange &&  !endRange) {     
    priceFilter = await Qualification.findAll({
      attributes : ["score"],
      include: [
        {
          model: Service,
          attributes: ["id", "title", "img", "description", "price", "userId"],
      include: [{
        model: Province,
        where: {
         id: province,
       },
     },
        {
          model: Category,
          attributes: ["name"],
          include: {
            model: Group,
            attributes: ["name"],
          },},
        ],
        },
      ], 
      limit:30,
      order: [["score", "DESC"]],
    });
  }
  

  if (order === "ASC" && province && group &&  !category &&  !startRange &&  !endRange) {     
    priceFilter = await Qualification.findAll({
      attributes : ["score"],
      include: [
        {
          model: Service,
          attributes: ["id", "title", "img", "description", "price", "userId"],
      include: [{
         model: Province,
         where: {
          id: province,
        },
      },
        {
          model: Category,
          attributes: ["name"],
          include: {
            model: Group,
            attributes: ["name"],
            where: {
              id: group,
            }
          },},
        ],
        },
      ], 
      limit:30,
      order: [["score", "ASC"]],
    });
  }
  if (order === "DESC" && province && group &&  !category &&  !startRange &&  !endRange) {     
    priceFilter = await Qualification.findAll({
      attributes : ["score"],
      include: [
        {
          model: Service,
          attributes: ["id", "title", "img", "description", "price", "userId"],
      include: [{
        model: Province,
        where: {
         id: province,
       },
     },
        {
          model: Category,
          attributes: ["name"],
          include: {
            model: Group,
            attributes: ["name"],
            where: {
              id: group,
            }
          },},
        ],
        },
      ], 
      limit:30,
      order: [["score", "DESC"]],
    });
  }


  if (order === "ASC" && province && group &&  category &&  !startRange &&  !endRange) {     
    priceFilter = await Qualification.findAll({
      attributes : ["score"],
      include: [
        {
          model: Service,
          attributes: ["id", "title", "img", "description", "price", "userId"],
      include: [{
         model: Province,
         where: {
          id: province,
        },
      },
        {
          model: Category,
          attributes: ["name"],
          where: {
            id: category,
          },
          include: {
            model: Group,
            attributes: ["name"],
            where: {
              id: group,
            }
          },},
        ],
        },
      ], 
      limit:30,
      order: [["score", "ASC"]],
    });
  }
  if (order === "DESC" && province && group &&  category &&  !startRange &&  !endRange) {     
    priceFilter = await Qualification.findAll({
      attributes : ["score"],
      include: [
        {
          model: Service,
          attributes: ["id", "title", "img", "description", "price", "userId"],
      include: [{
        model: Province,
        where: {
         id: province,
       },
     },
        {
          model: Category,
          attributes: ["name"],
          where: {
            id: category,
          },
          include: {
            model: Group,
            attributes: ["name"],
            where: {
              id: group,
            }
          },},
        ],
        },
      ], 
      limit:30,
      order: [["score", "DESC"]],
    });
  }


  if (order === "ASC" && province && group &&  category &&  startRange &&  endRange) {     
    priceFilter = await Qualification.findAll({
      attributes : ["score"],
      include: [
        {
          model: Service,
          attributes: ["id", "title", "img", "description", "price", "userId"],
      where: {
        price: {
          [Op.between]: [startRange, endRange],
        },
      },
      include: [{
         model: Province,
         where: {
          id: province,
        },
      },
        {
          model: Category,
          attributes: ["name"],
          where: {
            id: category,
          },
          include: {
            model: Group,
            attributes: ["name"],
            where: {
              id: group,
            }
          },},
        ],
        },
      ], 
      limit:30,
      order: [["score", "ASC"]],
    });
  }
  if (order === "DESC" && province && group &&  category &&  startRange &&  endRange) {     
    priceFilter = await Qualification.findAll({
      attributes : ["score"],
      include: [
        {
          model: Service,
          attributes: ["id", "title", "img", "description", "price", "userId"],
      where: {
        price: {
          [Op.between]: [startRange, endRange],
        },
      },
      include: [{
        model: Province,
        where: {
         id: province,
       },
     },
        {
          model: Category,
          attributes: ["name"],
          where: {
            id: category,
          },
          include: {
            model: Group,
            attributes: ["name"],
            where: {
              id: group,
            }
          },},
        ],
        },
      ], 
      limit:30,
      order: [["score", "DESC"]],
    });
  }



  if (order === "ASC" && province && group &&  !category &&  startRange &&  endRange) {     
    priceFilter = await Qualification.findAll({
      attributes : ["score"],
      include: [
        {
          model: Service,
          attributes: ["id", "title", "img", "description", "price", "userId"],
      where: {
        price: {
          [Op.between]: [startRange, endRange],
        },
      },
      include: [{
         model: Province,
         where: {
          id: province,
        },
      },
        {
          model: Category,
          attributes: ["name"],
          include: {
            model: Group,
            attributes: ["name"],
            where: {
              id: group,
            }
          },},
        ],
        },
      ], 
      limit:30,
      order: [["score", "ASC"]],
    });
  }


  if (order === "DESC" && province && group &&  !category &&  startRange &&  endRange) {     
    priceFilter = await Qualification.findAll({
      attributes : ["score"],
      include: [
        {
          model: Service,
          attributes: ["id", "title", "img", "description", "price", "userId"],
      where: {
        price: {
          [Op.between]: [startRange, endRange],
        },
      },
      include: [{
        model: Province,
     },
        {
          model: Category,
          attributes: ["name"],
          where: {
            id: category,
          },
          include: {
            model: Group,
            attributes: ["name"],
            where: {
              id: group,
            }
          },},
        ],
        },
      ], 
      limit:30,
      order: [["score", "DESC"]],
    });
  }
  



  res.status(200).send(priceFilter);}
//-------------------------------------------------------------------------------------------------------
function orderProvince(objQuery, res, next) {}
//-------------------------------------------------------------------------------------------------------
//function orderProvince(objQuery, res, next) {}
//-------------------------------------------------------------------------------------------------------
//function orderProvince(objQuery, res, next) {}
//-------------------------------------------------------------------------------------------------------
//function orderProvince(objQuery, res, next) {}
//-------------------------------------------------------------------------------------------------------

module.exports = {
  orderByQualifications,
  orderByCreatedDate,
  orderByUpdateDate,
  orderByPrice,
  orderTitle,
  orderProvince,
};
