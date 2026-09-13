import React, { useState } from 'react';
import { useAdminAuth } from '../context/AdminAuthContext';
import type { ContentModerationItem } from '../types/adminTypes';
import { ConfirmActionModal } from '../components/common/ConfirmActionModal';
import { 
  Image as ImageIcon, 
  Star, 
  Check, 
  X, 
  AlertCircle, 
  CheckCircle2, 
  Trash2
} from 'lucide-react';

export const ContentModeration: React.FC = () => {
  const { contentModeration, moderateContentItem } = useAdminAuth();
  const [activeTab, setActiveTab] = useState<'photos' | 'reviews'>('photos');
  const [selectedItem, setSelectedItem] = useState<ContentModerationItem | null>(null);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);

  const pendingPhotos = contentModeration.filter((m: ContentModerationItem) => m.type === 'profile_photo' && m.status === 'pending');
  const pendingReviews = contentModeration.filter((m: ContentModerationItem) => m.type === 'review' && m.status === 'pending');

  const handleApprove = (item: ContentModerationItem) => {
    moderateContentItem(item.id, 'approved', 'Approved by content moderator');
  };

  const handleRejectConfirm = (reason: string) => {
    if (!selectedItem) return;
    moderateContentItem(selectedItem.id, 'rejected', reason);
    setSelectedItem(null);
    setRejectModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header & Tabs */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Content Moderation Queue</h1>
          <p className="text-sm text-slate-500">
            Review and approve user-uploaded profile photos and customer ratings to maintain platonic and professional standards.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
          <button
            onClick={() => setActiveTab('photos')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition flex items-center space-x-1.5 ${
              activeTab === 'photos'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ImageIcon className="w-4 h-4 text-purple-600" />
            <span>Profile Photos</span>
            {pendingPhotos.length > 0 && (
              <span className="bg-purple-600 text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                {pendingPhotos.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition flex items-center space-x-1.5 ${
              activeTab === 'reviews'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Star className="w-4 h-4 text-amber-500" />
            <span>Customer Reviews</span>
            {pendingReviews.length > 0 && (
              <span className="bg-amber-500 text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                {pendingReviews.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Guidelines Reminder Banner */}
      <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl border border-purple-100 flex items-start space-x-3 text-xs text-slate-700">
        <AlertCircle className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-slate-900">Platonic Standard Moderation Rules:</span>
          <p className="mt-0.5 text-slate-600">
            Reject photos containing revealing clothing, seductive poses, group photos without a clear face, or fake celebrity pictures.
            Reviews mentioning inappropriate romantic requests, offline payments, or offensive hate speech should be rejected.
          </p>
        </div>
      </div>

      {/* TAB 1: Profile Photos Queue */}
      {activeTab === 'photos' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6">
            <h2 className="text-base font-bold text-slate-900 mb-4">
              Pending Photo Submissions ({pendingPhotos.length})
            </h2>

            {pendingPhotos.length === 0 ? (
              <div className="py-12 text-center">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-2" />
                <h3 className="text-sm font-bold text-slate-900">Photo Moderation Queue is Clear!</h3>
                <p className="text-xs text-slate-500">No new companion or user profile photos are waiting for audit.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {pendingPhotos.map((item: ContentModerationItem) => (
                  <div key={item.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition flex flex-col">
                    <div className="relative aspect-square bg-slate-100">
                      <img
                        src={item.content}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-3 left-3 bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-xs uppercase">
                        {item.type.replace('_', ' ')}
                      </span>
                    </div>

                    <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <p className="font-bold text-slate-900 text-sm">{item.name}</p>
                        <p className="text-[11px] text-slate-400 font-mono">User ID: {item.companionOrUserId}</p>
                        <p className="text-[11px] text-slate-500 mt-1">
                          Submitted: {item.submittedAt}
                        </p>
                      </div>

                      <div className="flex items-center space-x-2 pt-2 border-t border-slate-100">
                        <button
                          onClick={() => handleApprove(item)}
                          className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition flex items-center justify-center space-x-1"
                        >
                          <Check className="w-4 h-4" />
                          <span>Approve</span>
                        </button>
                        <button
                          onClick={() => {
                            setSelectedItem(item);
                            setRejectModalOpen(true);
                          }}
                          className="flex-1 py-2 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs font-bold rounded-xl transition flex items-center justify-center space-x-1"
                        >
                          <X className="w-4 h-4" />
                          <span>Reject</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: Customer Reviews Queue */}
      {activeTab === 'reviews' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-6">
          <h2 className="text-base font-bold text-slate-900">
            Pending Customer Reviews ({pendingReviews.length})
          </h2>

          {pendingReviews.length === 0 ? (
            <div className="py-12 text-center">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-2" />
              <h3 className="text-sm font-bold text-slate-900">Review Queue is Clear!</h3>
              <p className="text-xs text-slate-500">All customer ratings and feedback have been moderated.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingReviews.map((item: ContentModerationItem) => (
                <div key={item.id} className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-slate-300 transition flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="space-y-2 max-w-2xl">
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center text-amber-500">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < (item.rating || 5) ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`}
                          />
                        ))}
                      </div>
                      <span className="text-xs font-bold text-slate-800">
                        {item.rating || 5}.0 Stars
                      </span>
                      <span className="text-xs text-slate-400 font-mono">#{item.id}</span>
                    </div>

                    <div className="text-xs text-slate-600">
                      <span className="font-bold text-slate-900">{item.authorName || item.name}</span>
                      <span> submitted feedback for companion </span>
                      <span className="font-mono text-indigo-600 font-semibold">{item.companionOrUserId}</span>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-800 italic">
                      "{item.content}"
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 shrink-0">
                    <button
                      onClick={() => handleApprove(item)}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition flex items-center space-x-1"
                    >
                      <Check className="w-4 h-4" />
                      <span>Approve & Publish</span>
                    </button>
                    <button
                      onClick={() => {
                        setSelectedItem(item);
                        setRejectModalOpen(true);
                      }}
                      className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs font-bold rounded-xl transition flex items-center space-x-1"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Reject & Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Reject Modal */}
      {rejectModalOpen && selectedItem && (
        <ConfirmActionModal
          isOpen={rejectModalOpen}
          title={`Reject ${selectedItem.type === 'profile_photo' ? 'Profile Photo' : 'Customer Review'}`}
          description="Provide a clear violation reason so the user receives a formal policy notice."
          confirmLabel="Confirm Rejection"
          variant="danger"
          requireReason={true}
          reasonPlaceholder="e.g. Non-platonic attire, offensive language, or poor image clarity..."
          onCancel={() => {
            setRejectModalOpen(false);
            setSelectedItem(null);
          }}
          onConfirm={handleRejectConfirm}
        />
      )}
    </div>
  );
};
