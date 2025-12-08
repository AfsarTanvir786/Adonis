import Product from '#models/product';

export default class ProductRepository {
  async createProduct(data: Partial<Product>) {
    const product = await Product.create(data);

    return {
      success: true,
      message: 'Product created successfully.',
      data: product,
    };
  }

  async getProduct(id: string) {
    const product = await Product.query()
      .where('id', id)
      .preload('category')
      .first();

    if (!product) {
      return {
        success: false,
        message: 'Product not found.',
      };
    }

    return {
      success: true,
      message: 'Product retrieved.',
      data: product,
    };
  }

  async updateProduct(data: Partial<Product>, id: string) {
    const product = await Product.find(id);

    if (!product) {
      return {
        success: false,
        message: 'Product not found.',
      };
    }

    product.merge({
      title: data.title ?? product.title,
      description: data.description ?? product.description,
      price: data.price ?? product.price,
      stock: data.stock ?? product.stock,
      categoryId: data.categoryId ?? product.categoryId,
    });

    await product.save();

    return {
      success: true,
      message: 'Product updated successfully.',
      data: product,
    };
  }

  async getProductList() {
    const list = await Product.all();

    return {
      success: true,
      data: list,
    };
  }

  async deleteProduct(id: string) {
    const product = await Product.find(id);

    if (!product) {
      return {
        success: false,
        message: 'Product not found.',
      };
    }

    await product.delete();

    return {
      success: true,
      message: 'Product deleted successfully.',
    };
  }
}
