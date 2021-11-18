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
  Orders,
  conn,
} = require("../db");
const { Op } = require("sequelize");
const { validateAdmin } = require("../utils/validUser");

async function admin(req, res, next) {
  try {
    let totalServices = await Service.findAll({
      attributes: [[conn.fn("COUNT", conn.col("id")), "totalServices"]],
    });
    totalServices = totalServices[0].dataValues.totalServices;

    let totalSales = await Orders.findAll({
      attributes: [
        "status",
        [conn.fn("SUM", conn.col("total")), "totalSales"],
        [conn.fn("COUNT", conn.col("status")), "n_status"],
      ],
      group: ["status"],
    });

    let monthlySales = await Orders.findAll({
      attributes: [
        "status",
        [conn.fn("TO_CHAR", conn.col("createdAt"), "Mon-YY"), "month"],
        [conn.fn("TO_CHAR", conn.col("createdAt"), "YYYY-MM"), "year"],
        // [conn.fn("FORMAT", conn.col("createdAt"), "MM"), "numMes"],

        [conn.fn("SUM", conn.col("total")), "totalSales"],
      ],
      group: ["month", "year", "status"],
      raw: false,
      subQuery: false,
      order: [
        [conn.literal("year"), "ASC"],
        // [conn.literal("month"), "ASC"],
      ],
    });

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

    let groupProvinceCount = await Category.findAll({
      attributes: [
        [conn.col("group.name"), "groupName"],
        [conn.fn("COUNT", conn.col("services.id")), "n_services"],
      ],
      group: ["groupId", "group.id", "services->province.id"],
      include: [
        {
          model: Service,
          attributes: [],
          include: {
            model: Province,
            attributes: ["name"],
          },
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

    let provinceServices = await Service.findAll({
      attributes: [
        "provinceId",
        [conn.fn("COUNT", conn.col("id")), "n_services"],
      ],

      group: ["provinceId"],
      order: [[conn.literal("n_services"), "DESC"]],
    });

    // { services: servicesCount, category: categoryCount }
    res.status(200).send({
      groupProvinceCount,
      provinceServices,
      monthlySales,
      totalSales,
      totalServices,
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

async function adminServices(req, res, next) {
  const { search } = req.query;
  let whereObj = {};
  if (search) {
    whereObj = {
      [Op.or]: {
        id: conn.where(
          conn.fn("TEXT", conn.col("service.id")),
          "LIKE",
          search + "%"
        ),
        title: conn.where(
          conn.fn("LOWER", conn.col("service.title")),
          "LIKE",
          search + "%"
        ),
        userId: conn.where(
          conn.fn("TEXT", conn.col("service.userId")),
          "LIKE",
          search
        ),
      },
    };
  }
  try {
    const services = await Service.findAll({
      attributes: [
        "id",
        "title",
        "img",
        "price",
        "userId",
        "avaliable",
        "description",
        [conn.fn("AVG", conn.col("qualifications.score")), "rating"],
        [conn.col("category.id"), "categoryID"],
        [conn.col("category.name"), "cat"],
        [conn.col("category.group.id"), "groupID"],
        [conn.col("category.group.name"), "grp"],
        [conn.col("province.id"), "provinceId"],
        [conn.col("province.name"), "prov"],
        [conn.col("city.id"), "cityId"],
        [conn.col("city.name"), "cty"],
        "createdAt",
      ],
      where: { ...whereObj },
      include: [
        {
          model: Category,
          attributes: ["name"],
          include: {
            model: Group,
            attributes: ["name"],
          },
        },
        {
          model: Qualification,
          attributes: [],
        },
        {
          model: Province,
          attributes: ["name"],
        },
        {
          model: City,
          attributes: ["name"],
        },
      ],
      raw: false,
      group: [
        "service.id",
        "category.id",
        "category->group.id",
        "province.id",
        "city.id",
      ],
      subQuery: false,
      // paginado
    });
    res.json(services);
  } catch (e) {
    next(e);
  }
}

module.exports = {
  admin,
  adminServices,
};
