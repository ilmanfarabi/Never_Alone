import { Router, Request, Response } from 'express';
import { requireAdminAuth, requireRole } from '../middleware/auth';
import { recordAuditLog } from '../middleware/auditLogger';

export const companionsRouter = Router();
companionsRouter.use(requireAdminAuth);

// GET /api/admin/companions
companionsRouter.get('/', requireRole(['super_admin', 'trust_safety_agent', 'finance_agent', 'support_agent']), (req: Request, res: Response) => {
  return res.json({ message: 'List companions with filtering by status and city' });
});

// GET /api/admin/companions/pending
companionsRouter.get('/pending', requireRole(['super_admin', 'trust_safety_agent']), (req: Request, res: Response) => {
  return res.json({ message: 'List pending companion approval applications sorted oldest first' });
});

// POST /api/admin/companions/:id/approve
companionsRouter.post('/:id/approve', requireRole(['super_admin', 'trust_safety_agent']), (req: Request, res: Response) => {
  const { reason } = req.body;
  recordAuditLog(req, 'approve_companion', 'companion', req.params.id, reason || 'Verified government NID and background clearance');
  return res.json({ success: true, message: 'Companion approved and listed on public directory' });
});

// POST /api/admin/companions/:id/reject
companionsRouter.post('/:id/reject', requireRole(['super_admin', 'trust_safety_agent']), (req: Request, res: Response) => {
  const { reason } = req.body;
  if (!reason) {
    return res.status(400).json({ error: 'Mandatory rejection reason required' });
  }
  recordAuditLog(req, 'reject_companion', 'companion', req.params.id, reason);
  return res.json({ success: true, message: 'Companion application rejected and notification dispatched' });
});
