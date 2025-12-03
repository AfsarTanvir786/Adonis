import Cart from '#models/cart';

export default class CartRepository {
  async createCart(data: Partial<Cart>) {
    const cart = await Cart.create(data);

    return {
      success: true,
      message: 'Cart created successfully.',
      data: cart,
    };
  }

  async getCart(id: string) {
    const cart = await Cart.find(id);

    if (!cart) {
      return {
        success: false,
        message: 'Cart not found.',
      };
    }

    return {
      success: true,
      message: 'Cart retrieved.',
      data: cart,
    };
  }

  async getCartList() {
    const list = await Cart.all();
    return {
      success: true,
      data: list,
    };
  }

  async deleteCart(id: string) {
    const cart = await Cart.find(id);

    if (!cart) {
      return {
        success: false,
        message: 'Cart not found.',
      };
    }

    await cart.delete();

    return {
      success: true,
      message: 'Cart deleted successfully.',
    };
  }
}
