import { inject } from '@adonisjs/core';
import OrderRepository from '../repositories/order_repository.js';
import Order from '#models/order';

@inject()
export class OrderService {
  constructor(private orderRepository: OrderRepository) {}

  createOrder(order: Partial<Order>) {
    return this.orderRepository.createOrder(order);
  }

  getOrder(id: string) {
    return this.orderRepository.getOrder(id);
  }

  updateOrder(order: Partial<Order>, id: string) {
    return this.orderRepository.updateOrder(order, id);
  }

  getOrderList() {
    return this.orderRepository.getOrderList();
  }

  deleteOrder(id: string) {
    return this.orderRepository.deleteOrder(id);
  }
}
