import { Router } from "express";
import { confirmReading, createReading, getAllReadings } from "../controllers/reading.controller";

const router = Router();

router
    .route('/upload')
    .post(createReading)

router
    .route('/confirm')
    .patch(confirmReading)

router
    .route('/:customer_code/list')
    .get(getAllReadings)

export default router;