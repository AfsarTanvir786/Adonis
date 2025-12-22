import Tag from '#models/tag';

export default class TagRepository {
  async createTag(data: Partial<Tag>) {
    const tag = await Tag.create(data);

    return {
      success: true,
      message: 'Tag created successfully',
      data: tag,
    };
  }

  async getTag(id: number) {
    const tag = await Tag.query().where('id', id).first();

    if (!tag) {
      return {
        success: false,
        message: 'Tag not found.',
      };
    }

    return {
      success: true,
      message: 'Tag retrieved.',
      data: tag,
    };
  }

  async updateTag(data: Partial<Tag>, id: number) {
    const tag = await Tag.find(id);

    if (!tag) {
      return {
        success: false,
        message: 'Tag not found.',
      };
    }

    tag.merge({
      name: data.name ?? tag.name,
    });

    await tag.save();

    return {
      success: true,
      message: 'Tag updated successfully.',
      data: tag,
    };
  }

  async getTagList() {
    const list = await Tag.query();

    return {
      success: true,
      data: list,
    };
  }

  async deleteTag(id: number) {
    const tag = await Tag.find(id);

    if (!tag) {
      return {
        success: false,
        message: 'Tag not found.',
      };
    }

    await tag.delete();

    return {
      success: true,
      message: 'Tag deleted successfully.',
    };
  }
}
