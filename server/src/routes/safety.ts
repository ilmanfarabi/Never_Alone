import { Router, Request, Response } from 'express';
import { requireAdminAuth, requireRole } from '../middleware/auth';
import { recordAuditLog } from '../middleware/auditLogger';

export const safetyRouter = Router();
safetyRouter.use(requireAdminAuth);

// GET /api/admin/safety/sos/active
safetyRouter.get('/sos/active', requireRole(['super_admin', 'trust_safety_agent']), (req: Request, res: Response) => {
  return res.json({ message: 'List active emergency SOS alerts' });
});

// POST /api/admin/safety/sos/:id/resolve
safetyRouter.post('/sos/:id/resolve', requireRole(['super_admin', 'trust_safety_agent']), (req: Request, res: Response) => {
  const { notes } = req.body;
  recordAuditLog(req, 'resolve_sos', 'sos_alert', req.params.id, notes || 'Emergency distress resolved');
  return res.json({ success: true, message: 'SOS alert marked as resolved' });
});

// GET /api/admin/safety/reports
safetyRouter.get('/reports', requireRole(['super_admin', 'trust_safety_agent']), (req: Request, res: Response) => {
  return res.json({ message: 'List customer/companion safety incident reports' });
});

// PATCH /api/admin/safety/reports/:id
safetyRouter.patch('/reports/:id', requireRole(['super_admin', 'trust_safety_agent']), (req: Request, res: Response) => {
  const { status, actionTaken } = req.body;
  recordAuditLog(req, `update_report_${status}`, 'safety_report', req.params.id, actionTaken);
  return res.json({ success: true, message: 'Report status updated' });
});
