import { ConfirmReadingDTO, CreateReadingDTORequest, GetAllReadingsDTO } from "../dtos/reading.dto";
import { ReadingRepository } from "../repositories/reading.repository";
import { ImageRepository } from "../repositories/image.repository";
import { Reading } from "../entities/reading.entity";

import { gemini } from "../integrations/gemini";

export class ReadingService {
    private readingRepository = new ReadingRepository();
    private imageRepository = new ImageRepository();

    async createReading(readingData: CreateReadingDTORequest): Promise<Reading> {
        const imageBase64 = readingData.image.split(",");
        const base64 = imageBase64[1];
        const mimeType = imageBase64[0].split(";")[0].replace("data:", "");

        const geminiResponse = await gemini.generateContent([
            {
                inlineData: {
                    data: base64,
                    mimeType: mimeType,
                },
            },
            {
                text: "Identifique e retorne os números da leitura deste medidor de consumo. Sua resposta deve conter apenas os números.",
            },
        ]);

        const savedImage = await this.imageRepository.create({
            base64: Buffer.from(readingData.image, "base64"),
        });

        const savedReading = this.readingRepository.create({
            customer_code: readingData.customer_code,
            image_id: savedImage.id,
            measure_value: Number(geminiResponse.response.text()),
            measure_datetime: readingData.measure_datetime,
            measure_type: readingData.measure_type,
            has_confirmed: false,
        });

        return savedReading;
    }

    async confirmReading(readingData: ConfirmReadingDTO): Promise<void> {
        await this.readingRepository.update(readingData);
    }

    async getAllReadings(data: GetAllReadingsDTO): Promise<Array<Reading>> {
        return await this.readingRepository.findAll(data);
    }
}
