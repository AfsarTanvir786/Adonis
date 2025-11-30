import type { HttpContext } from '@adonisjs/core/http'

export default class ProductsController {
  
  async getProductList({}: HttpContext) {}

  async getProduct({}: HttpContext) {}
  
  async createProduct({}: HttpContext) {}
  
  async updateProduct({}: HttpContext) {}
  
  async deleteProduct({}: HttpContext) {}
  
}