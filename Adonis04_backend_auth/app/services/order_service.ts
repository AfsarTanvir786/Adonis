import Order from '#models/order'

export class OrderService {
  async getOrderList(): Promise<Order[]> {
    try {
      return await Order.all()
    } catch (error) {
      throw new Error('Failed to fetch user list, order_service.ts: ' + error.message)
    }
  }

  async getOrderById(id: number): Promise<Order> {
    const order = await Order.find(id)

    if (!order) {
      throw new Error(`Order with id ${id} not found`)
    }

    return order
  }

  async createOrder(data: { customerId: number }): Promise<Order> {
    try {
      const order = await Order.create(data)
      return order
    } catch (error) {
      throw new Error('Failed to create order, order_service.ts: ' + error.message)
    }
  }

  async deleteOrder(id: number): Promise<void> {
    const order = await Order.find(id)
    if (!order) {
      throw new Error(`Order with id ${id} not found`)
    }

    try {
      await order.delete()
    } catch (error) {
      throw new Error('Failed to delete order, order_service.ts: ' + error.message)
    }
  }

  async getOrderCount(): Promise<number> {
    try {
      return await Order.query()
        .count('* as total')
        .then((result) => result[0].$extras.total)
    } catch (error) {
      throw new Error('Failed to fetch order count, order_service.ts: ' + error.message)
    }
  }

  async getPaginatedOrders(page: number = 1, limit: number = 10) {
    try {
      return await Order.query().paginate(page, limit)
    } catch (error) {
      throw new Error('Failed to fetch orders, order_service.ts: ' + error.message)
    }
  }
}
     