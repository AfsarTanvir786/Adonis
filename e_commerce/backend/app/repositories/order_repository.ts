import Order from '#models/order';

export default class OrderRepository {
  async createOrder(data: Partial<Order>) {
    const order = await Order.create(data);

    return {
      success: true,
      message: 'Order created successfully.',
      data: order,
    };
  }

  async getOrder(id: string) {
    const order = await Order.query().where('id', id).preload('user').first();

    if (!order) {
      return {
        success: false,
        message: 'Order not found.',
      };
    }

    return {
      success: true,
      message: 'Order retrieved.',
      data: order,
    };
  }

  async updateOrder(data: Partial<Order>, id: string) {
    const order = await Order.find(id);

    if (!order) {
      return {
        success: false,
        message: 'Order not found.',
      };
    }

    order.merge({
      totalPrice: data.totalPrice ?? order.totalPrice,
      orderStatus: data.orderStatus ?? order.orderStatus,
      paymentStatus: data.paymentStatus ?? order.paymentStatus,
      orderItems: data.orderItems ?? order.orderItems,
    });

    await order.save();

    return {
      success: true,
      message: 'Order updated successfully.',
      data: order,
    };
  }

  async getOrderList() {
    const list = await Order.query().preload('user');

    return {
      success: true,
      data: list,
    };
  }

  async deleteOrder(id: string) {
    const order = await Order.find(id);

    if (!order) {
      return {
        success: false,
        message: 'Order not found.',
      };
    }

    await order.delete();

    return {
      success: true,
      message: 'Order deleted successfully.',
    };
  }
}
