import { Image } from "../entities/image.entity";
import { GetImageDTO } from "../dtos/image.dto";
import { ImageRepository } from "../repositories/image.repository";
import { ReadingRepository } from "../repositories/reading.repository";


export class ImageService {
    private imageRepository = new ImageRepository();
    private readingRepository = new ReadingRepository();
    async getImage(imageData: GetImageDTO): Promise<Image | null> {
        const image = await this.imageRepository.findById(imageData.id);

        if (!image) throw new Error("Imagem não encontrada");
        return image;
    }

    async checkConflict(imageId: string): Promise<boolean> {
        const readings = await this.readingRepository.findReadingsByImageId(imageId);
        if (readings.length === 0) return false;
        return await this.readingRepository.findConflict(readings[0].customer_code, readings[0].measure_type);
    }
}
