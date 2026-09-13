import { Router, Request, Response } from 'express';
import { requireAdminAuth, requireRole } from '../middleware/auth';
import { recordAuditLog } from '../middleware/auditLogger';

export const moderationRouter = Router();
moderationRouter.use(requireAdminAuth);

// GET /api/admin/moderation/queue
moderationRouter.get('/queue', requireRole(['super_admin', 'trust_safety_agent']), (req: Request, res: Response) => {
  return res.json({ message: 'List pending photo and review items' });
});

// POST /api/admin/moderation/:id/action
moderationRouter.post('/:id/action', requireRole(['super_admin', 'trust_safety_agent']), (req: Request, res: Response) => {
  const { action, notes } = req.body;
  recordAuditLog(req, `moderate_${action}`, 'moderation_item', req.params.id, notes || 'Content moderation action');
  return res.json({ success: true, message: `Item ${action}` });
});
