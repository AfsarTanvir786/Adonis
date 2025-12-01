import { inject } from '@adonisjs/core';
import CartItem from '#models/cart_item';
import CartItemRepository from '../repositories/cart_item_repository.js';

@inject()
export class CartItemService {
  constructor(private cartItemRepository: CartItemRepository) {}

  createCartItem(cartItem: Partial<CartItem>) {
    return this.cartItemRepository.createCartItem(cartItem);
  }

  getCartItem(id: string) {
    return this.cartItemRepository.getCartItem(id);
  }

  updateCartItem(product: Partial<CartItem>, id: string) {
    return this.cartItemRepository.updateCartItem(product, id);
  }

  getCartItemList() {
    return this.cartItemRepository.getCartItemList();
  }

  deleteCartItem(id: string) {
    return this.cartItemRepository.deleteCartItem(id);
  }
}
