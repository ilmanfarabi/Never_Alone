import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';

import { authRouter } from './routes/auth';
import { usersRouter } from './routes/users';
import { companionsRouter } from './routes/companions';
import { bookingsRouter } from './routes/bookings';
import { paymentsRouter } from './routes/payments';
import { safetyRouter } from './routes/safety';
import { moderationRouter } from './routes/moderation';
import { ticketsRouter } from './routes/tickets';
import { analyticsRouter } from './routes/analytics';
import { settingsRouter } from './routes/settings';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Serve uploaded documents statically
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Mount API Routes
app.use('/api/admin/auth', authRouter);
app.use('/api/admin/users', usersRouter);
app.use('/api/admin/companions', companionsRouter);
app.use('/api/admin/bookings', bookingsRouter);
app.use('/api/admin/payments', paymentsRouter);
app.use('/api/admin/safety', safetyRouter);
app.use('/api/admin/moderation', moderationRouter);
app.use('/api/admin/tickets', ticketsRouter);
app.use('/api/admin/analytics', analyticsRouter);
app.use('/api/admin/settings', settingsRouter);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'NeverAlone Staff Admin API', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`[SERVER] NeverAlone Admin REST API running on port ${PORT}`);
});

export default app;
