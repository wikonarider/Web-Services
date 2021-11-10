const { Orders } = require('../db');
const { validServiceId } = require('../utils/validOrders');

async function addServiceToOrder(req, res, next) {
  try {
    const userId = req.user;
    const { serviceId } = req.body;

    if (serviceId) {
      if (await validServiceId(userId, serviceId)) {
        const [order, created] = await Orders.findOrCreate({
          where: {
            userId: userId,
            status: 'pending',
          },
        });
        let message = '';

        if (created) {
          order.services = [serviceId];
          message = 'Successfully added';
        } else {
          const index = order.services.indexOf(serviceId);
          if (index === -1) {
            order.services = [...order.services, serviceId];
            message = 'Successfully added';
          } else {
            message = 'It was not added, it already exists';
          }
        }
        await order.save();

        res.json({ message: message, services: order.services });
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
          status: 'pending',
          userId: userId,
        },
      });

      if (order) {
        const arr = order.services.filter((id) => id !== serviceId);
        let message = '';
        if (arr.length === order.services.length) {
          message = 'Service not removed, did not exist';
        } else {
          message = 'Successfully removed';
        }
        order.services = arr;
        await order.save();

        res.json({ message: message, serviceId: serviceId });
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
  addServiceToOrder,
  removeServiceFromOrder,
};
