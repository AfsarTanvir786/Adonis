import { inject } from '@adonisjs/core';
import OrderItemRepository from '../repositories/order_item_repository.js';
import OrderItem from '#models/order_item';

@inject()
export class OrderItemService {
  constructor(private orderItemRepository: OrderItemRepository) {}

  createOrderItem(orderItem: Partial<OrderItem>) {
    return this.orderItemRepository.createOrderItem(orderItem);
  }

  getOrderItem(id: string) {
    return this.orderItemRepository.getOrderItem(id);
  }

  updateOrderItem(orderItem: Partial<OrderItem>, id: string) {
    return this.orderItemRepository.updateOrderItem(orderItem, id);
  }

  getOrderItemList() {
    return this.orderItemRepository.getOrderItemList();
  }

  deleteOrderItem(id: string) {
    return this.orderItemRepository.deleteOrderItem(id);
  }
}
