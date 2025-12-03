import Cart from '#models/cart';
import { inject } from '@adonisjs/core';
import CartRepository from '../repositories/cart_repository.js';

@inject()
export class CartService {
  constructor(private cartRepository: CartRepository) {}

  createCart(cart: Partial<Cart>) {
    return this.cartRepository.createCart(cart);
  }

  getCart(id: string) {
    return this.cartRepository.getCart(id);
  }

  getCartList() {
    return this.cartRepository.getCartList();
  }

  deleteCart(id: string) {
    return this.cartRepository.deleteCart(id);
  }
}
