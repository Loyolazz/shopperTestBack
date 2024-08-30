import { CreateImageDTO } from "../dtos/image.dto";
import { Repository } from "./Repository";
import { Image } from "../entities/image.entity";

export class ImageRepository extends Repository {
    async create(imageData: CreateImageDTO): Promise<Image> {
        return await this.db.image.create({
            data: imageData as any,
        });
    }

    async findById(id: string): Promise<Image | null> {
        return await this.db.image.findUnique({
            where: {
                id: id,
            },
        });
    }
}
