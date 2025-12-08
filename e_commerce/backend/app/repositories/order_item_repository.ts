import OrderItem from '#models/order_item';

export default class OrderItemRepository {
  async createOrderItem(data: Partial<OrderItem>) {
    const orderItem = await OrderItem.create(data);

    return {
      success: true,
      message: 'Order item created successfully.',
      data: orderItem,
    };
  }

  async getOrderItem(id: string) {
    const orderItem = await OrderItem.query()
      .where('id', id)
      .preload('order')
      .preload('product')
      .first();

    if (!orderItem) {
      return {
        success: false,
        message: 'Order item not found.',
      };
    }

    return {
      success: true,
      message: 'Order item retrieved.',
      data: orderItem,
    };
  }

  async updateOrderItem(data: Partial<OrderItem>, id: string) {
    const orderItem = await OrderItem.find(id);

    if (!orderItem) {
      return {
        success: false,
        message: 'Order item not found.',
      };
    }

    orderItem.merge({
      quantity: data.quantity ?? orderItem.quantity,
      unitPrice: data.unitPrice ?? orderItem.unitPrice,
      productId: data.productId ?? orderItem.productId,
      orderId: data.orderId ?? orderItem.orderId,
      subTotal: data.subTotal ?? orderItem.subTotal,
    });

    await orderItem.save();

    return {
      success: true,
      message: 'Order item updated successfully.',
      data: orderItem,
    };
  }

  async getOrderItemList() {
    const list = await OrderItem.all();

    return {
      success: true,
      data: list,
    };
  }

  async deleteOrderItem(id: string) {
    const orderItem = await OrderItem.find(id);

    if (!orderItem) {
      return {
        success: false,
        message: 'Order item not found.',
      };
    }

    await orderItem.delete();

    return {
      success: true,
      message: 'Order item deleted successfully.',
    };
  }
}
