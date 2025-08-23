import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(
    cors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    })
);

app.use(express.json());

app.get('/health', (req, res) => {
    res.status(200).json({ message: 'server running successfully' });
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})