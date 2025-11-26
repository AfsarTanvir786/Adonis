import Order from '#models/order'
import { OrderService } from '#controllers/order/order_service'
import type { HttpContext } from '@adonisjs/core/http'

export default class OrdersController {
  private orderService: OrderService

  constructor() {
    this.orderService = new OrderService()
  }

  async index({ response }: HttpContext) {
    try {
      const orderList: Order[] = await this.orderService.getOrderList()
      return response.ok({
        success: true,
        data: orderList,
      });
    } catch (error) {
      return response.internalServerError({
        success: false,
        message: error.message,
      })
    }
  }

  async paginatedList({ request, response }: HttpContext) {
    try {
      const page = Number(request.input('page', 1))
      const limit = Number(request.input('limit', 10))

      const orderList = await this.orderService.getPaginatedOrders(page, limit)

      return response.ok({
        success: true,
        data: orderList,
      })
    } catch (error) {
      return response.internalServerError({
        success: false,
        message: error.message,
      })
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const order = await this.orderService.getOrderById(Number(params.id))
      return response.ok({
        success: true,
        data: order,
      })
    } catch (error) {
      return response.status(error.status | 500).json({
        success: false,
        message: error.message,
      })
    }
  }

  async store({ request, response}: HttpContext) {
    try {
        const data = request.only(['customerId'])
        const order = await this.orderService.createOrder(data)

        return response.created({
        success: true,
        message: 'Order created successfully',
        data: order,
      })
    } catch (error) {
      return response.status(error.status || 500).json({
        success: false,
        message: error.message,
      })
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      await this.orderService.deleteOrder(params.id)

      return response.ok({
        success: true,
        message: 'Order deleted successfully',
      })
    } catch (error) {
      return response.status(error.status || 500).json({
        success: false,
        message: error.message,
      })
    }
  }
}
