import { Reading } from "../entities/reading.entity";
import { ConfirmReadingDTO, CreateReadingDTO, GetAllReadingsDTO } from "../dtos/reading.dto";
import { Repository } from "./Repository";

export class ReadingRepository extends Repository {
    async create(readingData: CreateReadingDTO): Promise<Reading> {
        const reading = await this.db.reading.create({
            data: { ...readingData, measure_type: readingData.measure_type.toLocaleUpperCase() },
        });

        return reading;
    }

    async update(readingData: ConfirmReadingDTO): Promise<void> {
        const reading = await this.db.reading.findUnique({
            where: {
                id: readingData.measure_uuid,
            },
        });

        if (!reading) throw new Error("404");
        if (reading.has_confirmed) throw new Error("409");

        await this.db.reading.update({
            data: {
                measure_value: readingData.confirmed_value,
                has_confirmed: true,
            },
            where: {
                id: readingData.measure_uuid,
            },
        });
    }

    async findReadingsByImageId(imageId: string): Promise<Reading[]> {
        return this.db.reading.findMany({
            where: {
                image_id: imageId,
            },
        });
    }

    async findConflict(customerId: string, measureType: string): Promise<boolean> {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();
        const conflictingReadings = await this.db.reading.findMany({
            where: {
                customer_code: customerId,
                measure_type: measureType,
                measure_datetime: {
                    gte: new Date(currentYear, currentMonth, 1),
                    lt: new Date(currentYear, currentMonth + 1, 1),
                },
            },
        });
        return conflictingReadings.length > 0;
    }

    async findAll(data: GetAllReadingsDTO): Promise<Array<Reading>> {
        return await this.db.reading.findMany({
            where: {
                customer_code: data.customer_code,
                measure_type: data.measure_type?.toLocaleUpperCase()
            }
        })
    }
}
