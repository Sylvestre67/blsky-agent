import express from 'express';
import { Middleware } from './middleware/requestLogger';
import { HealthController } from './controllers/health.controller';

const app = express();

// Middleware
app.use(Middleware.requesstLog);

// Routes
app.get('/health', HealthController.check);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
}); 