import { OrderItemService } from '#services/order_item_service';
import { createOrderItemValidator, updateOrderItemValidator } from '#validators/order_item_validator';
import { inject } from '@adonisjs/core';
import type { HttpContext } from '@adonisjs/core/http';

@inject()
export default class OrderItemsController {
  constructor(private OrderItemService: OrderItemService) {}

  async create({ response, request }: HttpContext) {
    const payload = await request.validateUsing(createOrderItemValidator);
    const result = await this.OrderItemService.createOrderItem(payload);

    return response.created(result);
  }

  async show({ params, response }: HttpContext) {
    const result = await this.OrderItemService.getOrderItem(params.id);

    if (!result.success) return response.notFound(result);

    return response.ok(result);
  }

  async list({ response }: HttpContext) {
    const result = await this.OrderItemService.getOrderItemList();

    return response.ok(result);
  }

  async update({ request, response, params }: HttpContext) {
    const payload = await request.validateUsing(updateOrderItemValidator);

    const result = await this.OrderItemService.updateOrderItem(
      payload,
      params.id,
    );

    if (!result.success) return response.notFound(result);

    return response.ok(result);
  }

  async delete({ params, response }: HttpContext) {
    const result = await this.OrderItemService.deleteOrderItem(params.id);

    if (!result.success) return response.notFound(result);

    return response.noContent();
  }
}
