import express from 'express';
import dotenv from 'dotenv';
import { scrapeProducts } from './controllers/scraperController.js';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.post('/api/scrape', scrapeProducts);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));