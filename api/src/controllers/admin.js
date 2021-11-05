const {
  Users,
  Service,
  Qualification,
  City,
  Province,
  Category,
  Group,
  conn,
} = require("../db");
const { Op } = require("sequelize");

const dicc = {
  category: {
    attributes: ["categoryId", [conn.col("category.name"), "categoryName"]],
    where: { name: "" },
  },
};

async function admin(req, res, next) {
  try {
    let servicesCount = await Service.findAll({
      attributes: [
        [conn.fn("TO_CHAR", conn.col("createdAt"), "Mon-YY"), "month"],
        [conn.fn("TO_CHAR", conn.col("createdAt"), "YYYY-MM"), "year"],
        // [conn.fn("FORMAT", conn.col("createdAt"), "MM"), "numMes"],

        [conn.fn("COUNT", conn.col("service.id")), "n_services"],
      ],
      group: ["month", "year"],
      raw: false,
      subQuery: false,
      order: [
        [conn.literal("year"), "ASC"],
        // [conn.literal("month"), "ASC"],
      ],
    });

    // let categoryCount = await Service.findAll({
    //   attributes: [
    //     "categoryId",
    //     [conn.col("category.name"), "categoryName"],
    //     [conn.fn("TO_CHAR", conn.col("service.createdAt"), "Mon"), "month"],
    //     [conn.fn("TO_CHAR", conn.col("service.createdAt"), "YYYY"), "year"],
    //     [conn.fn("COUNT", conn.col("service.id")), "n_services"],
    //   ],
    //   group: ["month", "year", "category.id", "service.categoryId"],
    //   include: {
    //     model: Category,
    //     where: { name: ["Computing", "Other", "Electrical"] },
    //     incude: {
    //       model: Group,
    //     },
    //   },
    // });
    res.status(200).send(servicesCount);
  } catch (e) {
    next(e);
  }
}

module.exports = {
  admin,
};
