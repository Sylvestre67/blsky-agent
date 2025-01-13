import express from 'express';
import { RequestLog } from './middleware/request-log.middleware';
import { HealthController } from './controllers/health.controller';

const app = express();

// Middleware
app.use(RequestLog.log);

// Routes
app.get('/health', HealthController.check);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
}); 