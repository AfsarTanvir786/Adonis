import type { HttpContext } from '@adonisjs/core/http';
import { inject } from '@adonisjs/core';
import { CategoryService } from '#services/category_service';
import {
  createCategoryValidator,
  updateCategoryValidator,
} from '#validators/category_validator';

@inject()
export default class CategoriesController {
  constructor(private categoryService: CategoryService) {}

  async index({ params, response }: HttpContext) {
    const result = await this.categoryService.getCategory(params.id);

    if (!result.success) return response.notFound(result);

    return response.ok(result);
  }

  async create({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createCategoryValidator);
    const result = await this.categoryService.createCategory(payload);

    return response.created(result);
  }

  async update({ request, response, params }: HttpContext) {
    const payload = await request.validateUsing(updateCategoryValidator);

    const result = await this.categoryService.updateCategory(
      payload,
      params.id,
    );

    if (!result.success) return response.notFound(result);

    return response.ok(result);
  }

  async getCategoryList({ response }: HttpContext) {
    const result = await this.categoryService.getCategoryList();
    return response.ok(result);
  }
}
