import React, { useState } from 'react';
import { AlertTriangle, X } from 'lucide-react';

export interface ConfirmActionModalProps {
  isOpen: boolean;
  onClose?: () => void;
  onCancel?: () => void;
  onConfirm: (reason: string) => void;
  title: string;
  description?: string;
  confirmButtonText?: string;
  confirmLabel?: string;
  isDestructive?: boolean;
  variant?: 'danger' | 'warning' | 'default';
  requireReason?: boolean;
  reasonPlaceholder?: string;
  children?: React.ReactNode;
}

export const ConfirmActionModal: React.FC<ConfirmActionModalProps> = ({
  isOpen,
  onClose,
  onCancel,
  onConfirm,
  title,
  description,
  confirmButtonText,
  confirmLabel,
  isDestructive,
  variant = 'danger',
  requireReason = true,
  reasonPlaceholder = 'Please enter an internal reason / admin note (mandatory for audit logging)...',
  children
}) => {
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleClose = () => {
    if (onClose) onClose();
    if (onCancel) onCancel();
  };

  const handleConfirm = () => {
    if (requireReason && !reason.trim()) {
      setError('A reason or administrative note is required.');
      return;
    }
    onConfirm(reason.trim());
    setReason('');
    setError('');
    handleClose();
  };

  const isDanger = isDestructive !== undefined ? isDestructive : variant === 'danger';
  const label = confirmButtonText || confirmLabel || 'Confirm Action';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl ${isDanger ? 'bg-rose-100 text-rose-600' : 'bg-blue-100 text-[#1B3A4B]'}`}>
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">{title}</h3>
              {description && <p className="text-sm text-slate-500 mt-0.5">{description}</p>}
            </div>
          </div>
          <button 
            onClick={handleClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Optional Custom Injected Children (e.g. amount inputs) */}
        {children}

        {/* Mandatory Reason Field for Audit Log */}
        {requireReason && (
          <div className="space-y-1.5">
            <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">
              Mandatory Admin Rationale / Reason <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={3}
              value={reason}
              onChange={(e) => {
                setReason(e.target.value);
                if (error) setError('');
              }}
              placeholder={reasonPlaceholder}
              className={`w-full px-3 py-2 text-sm rounded-xl border ${
                error ? 'border-rose-500 bg-rose-50/50' : 'border-slate-300 bg-slate-50/50'
              } focus:outline-none focus:ring-2 focus:ring-[#FF6F61] transition`}
            />
            {error && <p className="text-sm text-rose-600 font-semibold">{error}</p>}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={handleClose}
            className="px-4 py-2 text-sm font-semibold rounded-xl text-slate-600 hover:bg-slate-100 transition"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className={`px-4 py-2 text-sm font-bold text-white rounded-xl shadow-sm transition ${
              isDanger 
                ? 'bg-rose-600 hover:bg-rose-700' 
                : 'bg-[#1B3A4B] hover:bg-[#132a36]'
            }`}
          >
            {label}
          </button>
        </div>
      </div>
    </div>
  );
};
