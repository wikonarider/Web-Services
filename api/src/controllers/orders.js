const { Orders, Service } = require('../db');
const { validServiceId, validServicesId } = require('../utils/validOrders');

async function getOrder(req, res, next) {
  try {
    const userId = req.user;
    const order = await Orders.findOne({
      where: {
        userId: userId,
        status: 'carrito',
      },
    });
    if (order) {
      const services = await Service.findAll({
        attributes: ['title', 'price', 'id', 'img'],
        where: {
          id: order.services,
        },
      });
      res.json(services);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (e) {
    next(e);
  }
}

async function createOrder(req, res, next) {
  try {
    const userId = req.user;
    const { servicesId } = req.body;

    if (servicesId) {
      if (await validServicesId(userId, servicesId)) {
        const [order, created] = await Orders.findOrCreate({
          where: {
            userId: userId,
            status: 'carrito',
          },
        });
        let message = '';
        order.services = servicesId;
        await order.save();
        if (created) {
          message = 'Successfully created order';
        } else {
          message = 'Successfully modified order';
        }
        res.json({ message });
      } else {
        res.status(400).json({
          message: 'Enter a valids services or that is not the owner',
        });
      }
    } else {
      res.status(403).json({ message: 'ServicesId is required' });
    }
  } catch (e) {
    next(e);
  }
}

async function addServiceToOrder(req, res, next) {
  try {
    const userId = req.user;
    const { serviceId } = req.body;

    if (serviceId) {
      if (await validServiceId(userId, serviceId)) {
        const order = await Orders.findOne({
          where: {
            userId: userId,
            status: 'carrito',
          },
        });

        if (order) {
          const index = order.services.indexOf(serviceId);
          if (index === -1) {
            order.services = [...order.services, serviceId];
            await order.save();
            res.json({ message: 'Successfully added', serviceId });
          } else {
            res
              .status(403)
              .json({ message: 'It was not added, it already exists' });
          }
        } else {
          res.status(404).json({ message: 'Order not found' });
        }
      } else {
        res
          .status(400)
          .json({ message: 'Enter a valid service or that is not the owner' });
      }
    } else {
      res.status(400).json({ message: 'ServiceId is required' });
    }
  } catch (e) {
    next(e);
  }
}

async function removeServiceFromOrder(req, res, next) {
  try {
    const userId = req.user;
    const { serviceId } = req.body;

    if (serviceId) {
      const order = await Orders.findOne({
        where: {
          status: 'carrito',
          userId: userId,
        },
      });

      if (order) {
        const arr = order.services.filter((id) => id !== serviceId);
        if (arr.length === order.services.length) {
          res
            .status(400)
            .json({ message: 'Service not removed, did not exist' });
        } else {
          order.services = arr;
          await order.save();
          res.json({ message: 'Successfully removed', serviceId });
        }
      } else {
        res.status(404).json({ message: 'Order not found' });
      }
    } else {
      res.status(400).json({ message: 'ServiceId is required' });
    }
  } catch (e) {
    next(e);
  }
}

module.exports = {
  getOrder,
  createOrder,
  addServiceToOrder,
  removeServiceFromOrder,
};
