import { Router, Request, Response } from 'express';
import { requireAdminAuth, requireRole } from '../middleware/auth';
import { recordAuditLog } from '../middleware/auditLogger';

export const paymentsRouter = Router();
paymentsRouter.use(requireAdminAuth);

// GET /api/admin/payments/ledger
paymentsRouter.get('/ledger', requireRole(['super_admin', 'finance_agent']), (req: Request, res: Response) => {
  return res.json({ message: 'Transaction ledger listing all payments, escrow holds, and fees' });
});

// POST /api/admin/payments/:id/refund
paymentsRouter.post('/:id/refund', requireRole(['super_admin', 'finance_agent']), (req: Request, res: Response) => {
  const { refundAmount, reason } = req.body;
  if (!reason) {
    return res.status(400).json({ error: 'Mandatory reason required for refund issuance' });
  }

  recordAuditLog(req, 'issue_refund', 'payment_record', req.params.id, reason, { refundAmount });
  return res.json({ success: true, message: `Refund of ৳${refundAmount} processed successfully` });
});

// POST /api/admin/payments/payouts/batch
paymentsRouter.post('/payouts/batch', requireRole(['super_admin', 'finance_agent']), (req: Request, res: Response) => {
  const { companionIds, reason } = req.body;
  if (!companionIds || !companionIds.length || !reason) {
    return res.status(400).json({ error: 'Companion IDs and audit reason are required' });
  }

  recordAuditLog(req, 'batch_payout', 'companion_payouts', 'multiple', reason, { companionIds });
  return res.json({ success: true, message: `Batch payout authorized for ${companionIds.length} companions` });
});
