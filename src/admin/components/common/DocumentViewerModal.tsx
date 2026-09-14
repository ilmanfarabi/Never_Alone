import React from 'react';
import { X, ShieldCheck, ExternalLink, Lock } from 'lucide-react';

interface DocumentViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  documentType: string;
  ownerName: string;
  documentUrl: string;
  verificationStatus?: string;
  metadata?: Record<string, string>;
}

export const DocumentViewerModal: React.FC<DocumentViewerModalProps> = ({
  isOpen,
  onClose,
  title,
  documentType,
  ownerName,
  documentUrl,
  verificationStatus,
  metadata
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-blue-50 text-[#1B3A4B]">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">{title}</h3>
              <p className="text-sm text-slate-500">
                Subject: <span className="font-semibold text-slate-700">{ownerName}</span> • Type: <span className="font-semibold text-slate-700">{documentType}</span>
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Security watermark badge */}
        <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-sm text-amber-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Confidential Internal Staff View. Encrypted Storage. Never share externally.</span>
          </div>
          {verificationStatus && (
            <span className="px-2 py-0.5 rounded-md bg-white font-bold text-sm text-amber-900 border border-amber-200">
              {verificationStatus.toUpperCase()}
            </span>
          )}
        </div>

        {/* Document Display Area */}
        <div className="relative rounded-xl border border-slate-200 bg-slate-950/5 p-4 flex items-center justify-center min-h-[280px]">
          <img 
            src={documentUrl} 
            alt={title}
            className="max-h-[360px] w-auto rounded-lg object-contain shadow-md border border-slate-200"
          />
        </div>

        {/* Optional Metadata Grid */}
        {metadata && Object.keys(metadata).length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-sm">
            {Object.entries(metadata).map(([key, val]) => (
              <div key={key}>
                <span className="text-sm uppercase font-bold text-slate-400">{key}</span>
                <p className="font-semibold text-slate-800">{val}</p>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
          <a
            href={documentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Open in New Tab</span>
          </a>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#1B3A4B] text-sm font-bold text-white hover:bg-[#142d3b]"
          >
            Close Viewer
          </button>
        </div>
      </div>
    </div>
  );
};
