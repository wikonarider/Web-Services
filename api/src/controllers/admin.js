const {
  Users,
  Service,
  Qualification,
  City,
  Province,
  Category,
  Group,
  Services_cities,
  Services_provinces,
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
    let newServices = await Service.findAll({
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

    let categoryNewServices = await Service.findAll({
      attributes: [
        "categoryId",
        "category.name",
        [conn.fn("TO_CHAR", conn.col("createdAt"), "Mon-YY"), "month"],
        [conn.fn("TO_CHAR", conn.col("createdAt"), "YYYY-MM"), "year"],
        [conn.fn("COUNT", conn.col("service.id")), "n_services"],
      ],
      group: ["categoryId", "category.id", "month", "year"],
      include: {
        model: Category,
        attributes: ["groupId"],
        where: {},
        incude: {
          model: Group,
        },
      },
      raw: true,
      subQuery: false,
      order: [
        ["categoryId", "ASC"],
        [conn.literal("year"), "ASC"],
      ],
    });

    let bannedUsers = await Users.findAll({
      attributes: ["ban", [conn.fn("COUNT", conn.col("id")), "n_users"]],
      group: ["ban"],
      where: { admin: false },
    });

    let newUsers = await Users.findAll({
      attributes: [
        [conn.fn("COUNT", conn.col("id")), "n_users"],
        [conn.fn("TO_CHAR", conn.col("createdAt"), "Mon-YY"), "month"],
        [conn.fn("TO_CHAR", conn.col("createdAt"), "YYYY-MM"), "year"],
      ],
      where: { admin: false },
      group: ["month", "year"],
      order: [[conn.literal("year"), "ASC"]],
    });

    let servicesPerUser = await Service.findAll({
      attributes: ["userId", [conn.fn("COUNT", conn.col("id")), "n_services"]],

      group: ["userId"],
      order: [[conn.literal("n_services"), "DESC"]],
    });

    const groupServices = async (groups) => {
      let groupResponse = {};
      for (let element of groups) {
        groupResponse[element.id] = await Category.findAll({
          attributes: [
            // "name",
            [
              conn.fn("TO_CHAR", conn.col("services.createdAt"), "Mon-YY"),
              "month",
            ],
            [
              conn.fn("TO_CHAR", conn.col("services.createdAt"), "YYYY-MM"),
              "year",
            ],
            [conn.fn("COUNT", conn.col("services.id")), "n_services"],
          ],
          group: ["month", "year", "group.id"],
          where: { groupId: element.id },
          include: [
            {
              model: Service,
              attributes: [],
            },
            {
              model: Group,
              attributes: ["id", "name"],
            },
          ],
          order: [[conn.literal("year"), "ASC"]],
          raw: true,
        });
      }
      return groupResponse;
    };

    let groups = await Group.findAll({
      attributes: ["id", "name"],
    });

    let groupServicesCount = await Category.findAll({
      attributes: [
        "groupId",
        [conn.col("group.name"), "groupName"],
        [conn.fn("COUNT", conn.col("services.id")), "n_services"],
      ],
      group: ["groupId", "group.id"],
      include: [
        {
          model: Service,
          attributes: [],
        },
        {
          model: Group,
          attributes: [],
        },
      ],
      order: [[conn.literal("n_services"), "DESC"]],

      raw: true,
    });

    let groupNewServices = await groupServices(groups);

    // { services: servicesCount, category: categoryCount }
    res.status(200).send({
      groupServicesCount,
      newUsers,
      groups,
      groupNewServices,
      servicesPerUser,
      bannedUsers,
      newServices,
      categoryNewServices,
    });
  } catch (e) {
    next(e);
  }
}

module.exports = {
  admin,
};
