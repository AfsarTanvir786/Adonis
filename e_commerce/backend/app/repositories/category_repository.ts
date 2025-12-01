import Category from '#models/category';

export default class CategoryRepository {
  async createCategory(data: Partial<Category>) {
    const category = await Category.create(data);

    return {
      success: true,
      message: 'Category created successfully.',
      data: category,
    };
  }

  async getCategory(id: string) {
    const category = await Category.find(id);

    if (!category) {
      return {
        success: false,
        message: 'Category not found.',
      };
    }

    return {
      success: true,
      message: 'Category retrieved.',
      data: category,
    };
  }

  async updateCategory(data: Partial<Category>, id: string) {
    const category = await Category.find(id);

    if (!category) {
      return {
        success: false,
        message: 'Category not found.',
      };
    }

    category.merge({
      name: data.name,
      description: data.description,
    });

    await category.save();

    return {
      success: true,
      message: 'Category updated successfully.',
      data: category,
    };
  }

  async getCategoryList() {
    const list = await Category.all();
    return {
      success: true,
      data: list,
    };
  }
}
