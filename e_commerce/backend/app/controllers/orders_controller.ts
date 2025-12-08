import { OrderService } from '#services/order_service';
import { createOrderValidator, updateOrderValidator } from '#validators/order_validator';
import { inject } from '@adonisjs/core';
import type { HttpContext } from '@adonisjs/core/http';

@inject()
export default class OrdersController {
  constructor(private orderService: OrderService) {}

  async create({ response, request }: HttpContext) {
    const payload = await request.validateUsing(createOrderValidator);
    const result = await this.orderService.createOrder(payload);

    return response.created(result);
  }

  async show({ params, response }: HttpContext) {
    const result = await this.orderService.getOrder(params.id);

    if (!result.success) return response.notFound(result);

    return response.ok(result);
  }

  async list({ response }: HttpContext) {
    const result = await this.orderService.getOrderList();

    return response.ok(result);
  }

  async update({ request, response, params }: HttpContext) {
    const payload = await request.validateUsing(updateOrderValidator);

    const result = await this.orderService.updateOrder(payload, params.id);

    if (!result.success) return response.notFound(result);

    return response.ok(result);
  }

  async delete({ params, response }: HttpContext) {
    const result = await this.orderService.deleteOrder(params.id);

    if (!result.success) return response.notFound(result);

    return response.noContent();
  }
}
