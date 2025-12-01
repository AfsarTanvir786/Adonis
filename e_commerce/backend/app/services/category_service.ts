import { inject } from '@adonisjs/core';
import CategoryRepository from '../repositories/category_repository.js';
import Category from '#models/category';

@inject()
export class CategoryService {
  constructor(private categoryRepository: CategoryRepository) {}

  createCategory(category: Partial<Category>) {
    return this.categoryRepository.createCategory(category);
  }

  getCategory(id: string) {
    return this.categoryRepository.getCategory(id);
  }

  updateCategory(category: Partial<Category>, id: string) {
    return this.categoryRepository.updateCategory(category, id);
  }

  getCategoryList() {
    return this.categoryRepository.getCategoryList();
  }
}
