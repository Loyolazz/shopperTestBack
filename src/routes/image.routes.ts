import { Router } from "express";
import { getImage } from "../controllers/image.controller";

const router = Router();

router
    .route('/image/:id')
    .get(getImage)

export default router;