import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { initMongoConnection } from './db/initMongoConnection.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import authRouter from './routers/auth.js';
import shopRouter from './routers/shop.js';
import statisticsRouter from './routers/statistics.js';

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  await initMongoConnection();

  const app = express();

  const allowedOrigins = (process.env.CLIENT_URL || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);
  app.use(cors({ origin: allowedOrigins }));
  
  app.use(express.json());

  app.get('/', (req, res) => {
    res.json({ message: 'E-Pharmacy API is running' });
  });

  app.use('/api/user', authRouter);
  app.use('/api/shop', shopRouter);
  app.use('/api/statistics', statisticsRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();