import { Router, Request, Response } from 'express';
import { requireAdminAuth, requireRole } from '../middleware/auth';
import { recordAuditLog } from '../middleware/auditLogger';

export const ticketsRouter = Router();
ticketsRouter.use(requireAdminAuth);

// GET /api/admin/tickets
ticketsRouter.get('/', requireRole(['super_admin', 'support_agent']), (req: Request, res: Response) => {
  return res.json({ message: 'List support tickets with status filter' });
});

// POST /api/admin/tickets/:id/replies
ticketsRouter.post('/:id/replies', requireRole(['super_admin', 'support_agent']), (req: Request, res: Response) => {
  const { content, isInternal } = req.body;
  recordAuditLog(
    req,
    isInternal ? 'add_ticket_internal_note' : 'send_ticket_reply',
    'support_ticket',
    req.params.id,
    content.substring(0, 50)
  );
  return res.json({ success: true, message: 'Message appended to ticket thread' });
});

// PATCH /api/admin/tickets/:id/status
ticketsRouter.patch('/:id/status', requireRole(['super_admin', 'support_agent']), (req: Request, res: Response) => {
  const { status } = req.body;
  return res.json({ success: true, message: `Ticket status set to ${status}` });
});
