import { CartItemService } from '#services/cart_item_service';
import {
  createCartItemValidator,
  updateCartItemValidator,
} from '#validators/cart_item_validator';
import { inject } from '@adonisjs/core';
import type { HttpContext } from '@adonisjs/core/http';

@inject()
export default class CartItemsController {
  constructor(private cartItemService: CartItemService) {}

  async create({ response, request }: HttpContext) {
    const payload = await request.validateUsing(createCartItemValidator);
    const result = await this.cartItemService.createCartItem(payload);

    return response.created(result);
  }

  async show({ params, response }: HttpContext) {
    const result = await this.cartItemService.getCartItem(params.id);

    if (!result.success) return response.notFound(result);

    return response.ok(result);
  }

  async list({ response }: HttpContext) {
    const result = await this.cartItemService.getCartItemList();

    return response.ok(result);
  }

  async update({ request, response, params }: HttpContext) {
    const payload = await request.validateUsing(updateCartItemValidator);

    const result = await this.cartItemService.updateCartItem(payload, params.id);

    if (!result.success) return response.notFound(result);

    return response.ok(result);
  }

  async delete({ params, response }: HttpContext) {
    const result = await this.cartItemService.deleteCartItem(params.id);

    if (!result.success) return response.notFound(result);

    return response.noContent();
  }
}
