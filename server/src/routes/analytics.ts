import { Router, Request, Response } from 'express';
import { requireAdminAuth, requireRole } from '../middleware/auth';

export const analyticsRouter = Router();
analyticsRouter.use(requireAdminAuth);

// GET /api/admin/analytics/summary
analyticsRouter.get('/summary', requireRole(['super_admin', 'finance_agent']), (req: Request, res: Response) => {
  return res.json({
    grossRevenue: 8070000,
    platformFees: 1210500,
    totalBookings: 2890,
    activeCompanions: 350,
    averageRating: 4.88
  });
});

// GET /api/admin/analytics/trends
analyticsRouter.get('/trends', requireRole(['super_admin', 'finance_agent']), (req: Request, res: Response) => {
  return res.json({
    monthlyGmv: [
      { month: 'Jan', gmv: 420000 },
      { month: 'Feb', gmv: 580000 },
      { month: 'Mar', gmv: 720000 },
      { month: 'Apr', gmv: 680000 },
      { month: 'May', gmv: 890000 },
      { month: 'Jun', gmv: 1050000 },
      { month: 'Jul', gmv: 1240000 },
      { month: 'Aug', gmv: 1480000 },
      { month: 'Sep', gmv: 1690000 }
    ]
  });
});
