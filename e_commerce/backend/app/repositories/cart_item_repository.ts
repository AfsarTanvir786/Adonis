import CartItem from '#models/cart_item';

export default class CartItemRepository {
  async createCartItem(data: Partial<CartItem>) {
    const existing = await CartItem.query()
      .where('cart_id', data.cartId!)
      .where('product_id', data.productId!)
      .first();

    if (existing) {
      existing.quantity += data.quantity || 1;
      await existing.save();
      return {
        success: true,
        message: 'Cart Item updated successfully.',
        data: existing,
      };
    }

    const cartItem = await CartItem.create(data);

    return {
      success: true,
      message: 'Cart Item created successfully.',
      data: cartItem,
    };
  }

  async getCartItem(id: string) {
    const cartItem = await CartItem.query()
      .where('id', id)
      .preload('cart')
      .preload('product')
      .first();

    if (!cartItem) {
      return {
        success: false,
        message: 'Cart Item not found.',
      };
    }

    return {
      success: true,
      message: 'Cart Item retrieved.',
      data: cartItem,
    };
  }

  async updateCartItem(data: Partial<CartItem>, id: string) {
    const cartItem = await CartItem.find(id);

    if (!cartItem) {
      return {
        success: false,
        message: 'Cart Item not found.',
      };
    }

    cartItem.merge({
      cartId: data.cartId ?? cartItem.cartId,
      productId: data.productId ?? cartItem.productId,
      quantity: data.quantity ?? cartItem.quantity,
    });

    await cartItem.save();

    return {
      success: true,
      message: 'Cart Item updated successfully.',
      data: cartItem,
    };
  }

  async getCartItemList() {
    const list = await CartItem.all();

    return {
      success: true,
      data: list,
    };
  }

  async deleteCartItem(id: string) {
    const cartItem = await CartItem.find(id);

    if (!cartItem) {
      return {
        success: false,
        message: 'Cart Item not found.',
      };
    }

    await cartItem.delete();

    return {
      success: true,
      message: 'Cart Item deleted successfully.',
    };
  }
}
