import { Router } from 'express';
import { adminController } from '../controllers/admin.controller.ts';

export const adminRouter = Router();

adminRouter.get('/stats', (req, res) => adminController.getStats(req, res));
adminRouter.post('/reset', (req, res) => adminController.resetStats(req, res));
