import express from 'express';
import { RequestLog } from './middleware/request-log.middleware';
import { AuthMiddleware } from './middleware/auth.middleware';
import { HealthController } from './controllers/health.controller';
import { BlueSkyController } from './controllers/bluesky.controller';

const app = express();

// Middleware
app.use(RequestLog.log);

// Routes
app.get('/health', HealthController.check);

// Protected routes (example)
app.get('/protected', AuthMiddleware.authenticate, (_req, res) => {
  res.json({ message: 'You have access to protected route' });
});

app.get(
  '/trending',
  //   AuthMiddleware.authenticate,
  BlueSkyController.getTrendingPosts
);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
