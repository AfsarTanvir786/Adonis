import { CartService } from '#services/cart_service';
import { createCartValidator } from '#validators/cart_validator';
import { inject } from '@adonisjs/core';
import type { HttpContext } from '@adonisjs/core/http';

@inject()
export default class CartsController {
  constructor(private cartService: CartService) {}

  async create({ response, request }: HttpContext) {
    const payload = await request.validateUsing(createCartValidator);
    const result = await this.cartService.createCart(payload);

    return response.created(result);
  }

  async show({ params, response }: HttpContext) {
    const result = await this.cartService.getCart(params.id);

    if (!result.success) return response.notFound(result);

    return response.ok(result);
  }

  async list({ response }: HttpContext) {
    const result = await this.cartService.getCartList();

    return response.ok(result);
  }

  async delete({ params, response }: HttpContext) {
    const result = await this.cartService.deleteCart(params.id);

    if (!result.success) return response.notFound(result);

    return response.noContent();
  }
}
