import cloudinary from '#config/cloudinary';
import fs from 'fs';

export class CloudinaryService {
  static async uploadImage(
    filePath: string,
    originalName: string,
    folder = 'uploads'
  ) {
    const publicId = originalName; // keep filename

    const result = await cloudinary.uploader.upload(filePath, {
      folder,
      public_id: publicId,
      overwrite: false, // DO NOT overwrite existing files
      resource_type: 'image',
    });

    fs.unlinkSync(filePath);

    return result;
  }
}
