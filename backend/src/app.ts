import express from 'express';
import itemRoutes from './routes/itemRoutes';
import morgan from 'morgan';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

app.use(express.json());

// Logging middleware
app.use(morgan('combined'));

// Routes
app.use('/api/items', itemRoutes);

// Global error handler (should be after routes)
app.use(errorHandler);



export default app;