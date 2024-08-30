import "dotenv/config";

import express from "express";
import readingRoutes from "./routes/reading.routes";
import imageRoutes from "./routes/image.routes";

const app = express();
app.use(express.json());

// Rotas
app.use(readingRoutes);
app.use(imageRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
