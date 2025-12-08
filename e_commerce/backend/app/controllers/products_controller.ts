import { ProductService } from '#services/product_service';
import {
  createProductValidator,
  updateProductValidator,
} from '#validators/product_validator';
import { inject } from '@adonisjs/core';
import type { HttpContext } from '@adonisjs/core/http';

@inject()
export default class ProductsController {
  constructor(private productService: ProductService) {}

  async create({ response, request }: HttpContext) {
    const payload = await request.validateUsing(createProductValidator);
    const result = await this.productService.createProduct(payload);

    return response.created(result);
  }

  async show({ params, response }: HttpContext) {
    const result = await this.productService.getProduct(params.id);

    if (!result.success) return response.notFound(result);

    return response.ok(result);
  }

  async list({ response }: HttpContext) {
    const result = await this.productService.getProductList();

    return response.ok(result);
  }

  async update({ request, response, params }: HttpContext) {
    const payload = await request.validateUsing(updateProductValidator);

    const result = await this.productService.updateProduct(payload, params.id);

    if (!result.success) return response.notFound(result);

    return response.ok(result);
  }

  async delete({ params, response }: HttpContext) {
    const result = await this.productService.deleteProduct(params.id);

    if (!result.success) return response.notFound(result);

    return response.noContent();
  }
}
