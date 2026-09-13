import { Router, Request, Response } from 'express';
import { requireAdminAuth, requireRole } from '../middleware/auth';
import { recordAuditLog } from '../middleware/auditLogger';

export const usersRouter = Router();
usersRouter.use(requireAdminAuth);

// GET /api/admin/users
usersRouter.get('/', requireRole(['super_admin', 'trust_safety_agent', 'support_agent']), (req: Request, res: Response) => {
  // Query parameters: status, search, limit, offset
  return res.json({ message: 'List users with pagination and search' });
});

// GET /api/admin/users/:id
usersRouter.get('/:id', requireRole(['super_admin', 'trust_safety_agent', 'support_agent']), (req: Request, res: Response) => {
  return res.json({ message: `Fetch user profile, ID document, and booking history for ${req.params.id}` });
});

// PATCH /api/admin/users/:id/status
usersRouter.patch('/:id/status', requireRole(['super_admin', 'trust_safety_agent']), (req: Request, res: Response) => {
  const { status, reason, durationDays } = req.body;
  if (!reason) {
    return res.status(400).json({ error: 'Audit reason is mandatory for status change' });
  }

  recordAuditLog(req, `user_${status}`, 'user', req.params.id, reason, { durationDays });
  return res.json({ success: true, message: `User status changed to ${status}`, userId: req.params.id });
});

// POST /api/admin/users/:id/notes
usersRouter.post('/:id/notes', requireRole(['super_admin', 'trust_safety_agent', 'support_agent']), (req: Request, res: Response) => {
  const { note } = req.body;
  recordAuditLog(req, 'add_internal_note', 'user', req.params.id, note);
  return res.json({ success: true, message: 'Internal staff note saved' });
});
