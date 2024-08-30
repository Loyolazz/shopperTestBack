import { Request, Response } from "express";
import { ReadingService } from "../services/reading.service";
import { ConfirmReadingDTO, CreateReadingDTORequest } from "../dtos/reading.dto";

const readingService = new ReadingService();

export const createReading = async (req: Request, res: Response): Promise<any> => {
    try {
        const dto: CreateReadingDTORequest = req.body;

        if (!dto.image || !dto.customer_code || !dto.measure_datetime || !dto.measure_type) {
            return res.status(400).json({
                error_code: "INVALID_DATA",
                error_description: "Os dados fornecidos no corpo da requisição são inválidos",
            });
        }

        const reading = await readingService.createReading(dto);

        res.status(200).json({
            image_url: `${process.env.BASE_URL}/image/${reading.image_id}`,
            measure_value: reading.measure_value,
            measure_uuid: reading.id,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Erro cadastrar leitura" });
    }
};

export const confirmReading = async (req: Request, res: Response): Promise<any> => {
    try {
        const dto: ConfirmReadingDTO = req.body;

        if (!dto.measure_uuid || !dto.confirmed_value) {
            return res.status(400).json({
                error_code: "INVALID_DATA",
                error_description: "Os dados fornecidos no corpo da requisição são inválidos",
            });
        }

        await readingService.confirmReading(dto);

        res.status(200).send({ success: true });
    } catch (error) {
        console.log(error);
        if (error == "404")
            res.status(404).json({
                error_code: "MEASURE_NOT_FOUND",
                error_description: "Leitura desse mês não foi encontrada",
            });

        if (error == "409")
            res.status(409).json({
                error_code: "CONFIRMATION_DUPLICATE",
                error_description: "Leitura do mês já realizada",
            });

        res.status(500).json({ error });
    }
};

export const getAllReadings = async (req: Request, res: Response): Promise<any> => {
    try {
        const { customer_code } = req.params;
        const { measure_type } = req.query as any;

        const readings = await readingService.getAllReadings({ customer_code, measure_type });

        res.status(200).json({
            customer_code,
            measures: readings.map((reading) => {
                return {
                    customer_code: reading.customer_code,
                    measure_value: reading.measure_value,
                    measure_datetime: reading.measure_datetime,
                    measure_type: reading.measure_type,
                    has_confirmed: false,
                    image_url: `${process.env.BASE_URL}/image/${reading.image_id}`,
                };
            }),
        });
    } catch (error) {
        res.status(500).json({ error });
    }
};
