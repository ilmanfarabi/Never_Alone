import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { requireAdminAuth } from '../middleware/auth';
import { recordAuditLog } from '../middleware/auditLogger';

export const authRouter = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'neveralone_admin_jwt_secret_dev_2026';

// Mock staff accounts for dev
const STAFF_ACCOUNTS = [
  { id: 'admin-1', name: 'Tanvir Rahman', email: 'admin@neveralone.bd', role: 'super_admin', pass: 'Admin123!' },
  { id: 'admin-2', name: 'Nusrat Jahan', email: 'safety@neveralone.bd', role: 'trust_safety_agent', pass: 'Safety123!' },
  { id: 'admin-3', name: 'Kamrul Hasan', email: 'finance@neveralone.bd', role: 'finance_agent', pass: 'Finance123!' },
  { id: 'admin-4', name: 'Farzana Akter', email: 'support@neveralone.bd', role: 'support_agent', pass: 'Support123!' },
];

// POST /api/admin/auth/login
authRouter.post('/login', (req: Request, res: Response) => {
  const { email, password, twoFactorCode } = req.body;

  const staff = STAFF_ACCOUNTS.find(s => s.email.toLowerCase() === (email || '').toLowerCase());
  if (!staff || password !== staff.pass) {
    return res.status(401).json({ error: 'Invalid email credentials or password' });
  }

  // Verify 2FA (In demo, accepting any 6-digit code or '123456')
  if (twoFactorCode && twoFactorCode.length !== 6) {
    return res.status(400).json({ error: 'Invalid 6-digit 2FA authenticator code' });
  }

  const token = jwt.sign(
    { id: staff.id, name: staff.name, email: staff.email, role: staff.role },
    JWT_SECRET,
    { expiresIn: '12h' }
  );

  recordAuditLog(
    { admin: staff, ip: req.ip, socket: req.socket } as any,
    'admin_login',
    'admin_user',
    staff.id,
    'Staff member authenticated with 2FA'
  );

  return res.json({
    token,
    admin: {
      id: staff.id,
      name: staff.name,
      email: staff.email,
      role: staff.role,
      status: 'active',
      twoFactorEnabled: true,
      lastLogin: new Date().toISOString()
    }
  });
});

// GET /api/admin/auth/me
authRouter.get('/me', requireAdminAuth, (req: Request, res: Response) => {
  return res.json({ admin: req.admin });
});
