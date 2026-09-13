import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';

export interface AuditLogEntry {
  id: string;
  adminId: string;
  adminName: string;
  adminRole: string;
  action: string;
  targetType: string;
  targetId: string;
  reason: string;
  ipAddress: string;
  metadata?: any;
  createdAt: string;
}

// In-memory/DB audit store abstraction
export const auditLogsDb: AuditLogEntry[] = [];

export const recordAuditLog = (
  req: Request,
  action: string,
  targetType: string,
  targetId: string,
  reason: string,
  metadata?: any
) => {
  const log: AuditLogEntry = {
    id: `log-${uuidv4().substring(0, 8)}`,
    adminId: req.admin?.id || 'system',
    adminName: req.admin?.name || 'System Admin',
    adminRole: req.admin?.role || 'super_admin',
    action,
    targetType,
    targetId,
    reason: reason || 'Administrative action performed',
    ipAddress: req.ip || req.socket.remoteAddress || '127.0.0.1',
    metadata,
    createdAt: new Date().toISOString()
  };

  auditLogsDb.unshift(log);
  console.log(`[AUDIT] ${log.adminName} (${log.adminRole}) -> ${action} on ${targetType}:${targetId} | Reason: ${reason}`);
  return log;
};
