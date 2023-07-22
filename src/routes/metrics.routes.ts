import { Router } from 'express';
import MetricsController from '../controllers/metrics.controllers';

const metricsRoutes = Router();
const metricsController = new MetricsController();

metricsRoutes.get('/verificationCode', metricsController.getVerificationCode);
metricsRoutes.get('/:id', metricsController.getMetrics);
metricsRoutes.get('/download/:id', metricsController.getCsvMetrics);

export default metricsRoutes;
