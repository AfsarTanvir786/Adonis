import { inject } from '@adonisjs/core';
import Product from '#models/product';
import ProductRepository from '../repositories/product_repository.js';

@inject()
export class ProductService {
  constructor(private productRepository: ProductRepository) {}

  createProduct(product: Partial<Product>) {
    return this.productRepository.createProduct(product);
  }

  getProduct(id: string) {
    return this.productRepository.getProduct(id);
  }

  updateProduct(product: Partial<Product>, id: string) {
    return this.productRepository.updateProduct(product, id);
  }

  getProductList() {
    return this.productRepository.getProductList();
  }

  deleteProduct(id: string) {
    return this.productRepository.deleteProduct(id);
  }
}
