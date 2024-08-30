import { Request, Response } from "express";
import { ImageService } from "../services/image.service";

const imageService = new ImageService();

export const getImage = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: "INVALID_DATA", error_description: "Id da imagem não informado" });
        }

        const image = await imageService.getImage({ id });

        const hasConflict = await imageService.checkConflict(image.id);
        if (!hasConflict) {
            return res.status(409).json({ error: "DOUBLE_REPORT", error_description: "Leitura do mês já realizada" });
        }

        const bufferToBase64 = image.base64.toString("base64").split("base64")[1];
        const img = Buffer.from(bufferToBase64, "base64");

        res.writeHead(200, {
            "Content-Type": "image/jpeg",
            "Content-Length": img.length,
        });
        res.end(img);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar a imagem" });
    }
};
