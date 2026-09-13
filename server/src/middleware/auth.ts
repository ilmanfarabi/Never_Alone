import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export type AdminRole = 'super_admin' | 'trust_safety_agent' | 'finance_agent' | 'support_agent';

export interface AdminJwtPayload {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
}

declare global {
  namespace Express {
    interface Request {
      admin?: AdminJwtPayload;
    }
  }
}

const JWT_SECRET = process.env.JWT_SECRET || 'neveralone_admin_jwt_secret_dev_2026';

export const requireAdminAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Missing admin bearer token' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AdminJwtPayload;
    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Unauthorized: Invalid or expired token' });
  }
};

export const requireRole = (allowedRoles: AdminRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.admin) {
      return res.status(401).json({ error: 'Unauthorized: Authentication required' });
    }

    if (req.admin.role === 'super_admin' || allowedRoles.includes(req.admin.role)) {
      return next();
    }

    return res.status(403).json({
      error: `Forbidden: Role '${req.admin.role}' does not have permission for this resource.`
    });
  };
};
