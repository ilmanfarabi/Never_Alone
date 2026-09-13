import { Router, Request, Response } from 'express';
import { requireAdminAuth, requireRole } from '../middleware/auth';
import { recordAuditLog } from '../middleware/auditLogger';

export const bookingsRouter = Router();
bookingsRouter.use(requireAdminAuth);

// GET /api/admin/bookings
bookingsRouter.get('/', requireRole(['super_admin', 'trust_safety_agent', 'finance_agent', 'support_agent']), (req: Request, res: Response) => {
  return res.json({ message: 'List bookings with status filter and search' });
});

// POST /api/admin/bookings/:id/resolve-dispute
bookingsRouter.post('/:id/resolve-dispute', requireRole(['super_admin', 'trust_safety_agent', 'support_agent']), (req: Request, res: Response) => {
  const { resolution, refundAmount, reason, actionOnCompanion } = req.body;
  if (!reason) {
    return res.status(400).json({ error: 'Dispute resolution rationale is required' });
  }

  recordAuditLog(req, `resolve_dispute_${resolution}`, 'booking', req.params.id, reason, {
    refundAmount,
    actionOnCompanion
  });

  return res.json({ success: true, message: `Dispute resolved with action: ${resolution}` });
});
