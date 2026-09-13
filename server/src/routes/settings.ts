import { Router, Request, Response } from 'express';
import { requireAdminAuth, requireRole } from '../middleware/auth';
import { recordAuditLog, auditLogsDb } from '../middleware/auditLogger';

export const settingsRouter = Router();
settingsRouter.use(requireAdminAuth);

// GET /api/admin/settings/audit-logs
settingsRouter.get('/audit-logs', requireRole(['super_admin', 'trust_safety_agent']), (req: Request, res: Response) => {
  return res.json({ logs: auditLogsDb });
});

// GET /api/admin/settings/platform
settingsRouter.get('/platform', (req: Request, res: Response) => {
  return res.json({
    commissionPercentage: 15.0,
    minimumBookingHours: 2,
    cancellationWindowHours: 6,
    emergencyHotline: '+880 9611-999-SOS',
    maintenanceMode: false,
    bannedKeywords: ['hotel room', 'sleep over', 'kiss', 'massage', 'escort', 'dating', 'direct payment', 'cash outside']
  });
});

// PATCH /api/admin/settings/platform
settingsRouter.patch('/platform', requireRole(['super_admin']), (req: Request, res: Response) => {
  const { reason, ...updates } = req.body;
  recordAuditLog(req, 'update_platform_settings', 'platform_settings', 'global', reason || 'Updated operating parameters', updates);
  return res.json({ success: true, message: 'Platform settings updated' });
});
