import React from 'react';
import { X, ShieldAlert } from 'lucide-react';

interface LegalModalProps {
  type: 'terms' | 'privacy' | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
      <div className="flex max-h-[85vh] w-full max-w-2xl flex-col rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 p-4 sm:p-5 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              {type === 'terms' ? 'Terms of Service' : 'Privacy Policy'}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 text-sm leading-relaxed text-slate-600 space-y-4 dark:text-slate-300">
          {type === 'terms' ? (
            <>
              <div className="rounded-xl border border-amber-200 bg-amber-50 p-3.5 text-xs text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-200">
                <div className="flex items-start gap-2">
                  <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                  <div>
                    <span className="font-semibold">Responsible Use Notice:</span>
                    <p className="mt-0.5">
                      Only download content when you have the right or permission to do so. Respect copyright, platform terms, and applicable laws.
                    </p>
                  </div>
                </div>
              </div>

              <h4 className="text-sm font-bold text-slate-900 dark:text-white">1. Acceptance of Terms</h4>
              <p>
                By accessing or using QuickTok, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you must not use our service.
              </p>

              <h4 className="text-sm font-bold text-slate-900 dark:text-white">2. Permitted Use & Copyright Compliance</h4>
              <p>
                QuickTok provides technical utilities to access publicly available digital media. You agree that you will only use this service to download content that you own, have created, or for which you have received express permission or authorization from the legitimate copyright holder.
              </p>
              <p>
                You must not use this tool to bypass DRM, circumvent access control mechanisms, or violate the terms and conditions of third-party platforms.
              </p>

              <h4 className="text-sm font-bold text-slate-900 dark:text-white">3. Disclaimer of Warranties</h4>
              <p>
                The service is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis without warranties of any kind, whether express or implied. QuickTok does not guarantee continuous, uninterrupted, or error-free operation.
              </p>

              <h4 className="text-sm font-bold text-slate-900 dark:text-white">4. Limitation of Liability</h4>
              <p>
                In no event shall QuickTok or its operators be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use this service.
              </p>
            </>
          ) : (
            <>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">1. Information We Do Not Collect</h4>
              <p>
                QuickTok is built on strict data minimization principles. We do not require account registration, passwords, or personal identity verification to use the downloader.
              </p>

              <h4 className="text-sm font-bold text-slate-900 dark:text-white">2. Video Files & Media Retention</h4>
              <p>
                We do not permanently store or archive processed media files on our servers. Video and audio chunks are passed as direct ephemeral HTTP streams to your client browser and are immediately freed from server memory upon completion or abort.
              </p>

              <h4 className="text-sm font-bold text-slate-900 dark:text-white">3. Local Storage</h4>
              <p>
                If you use the Download History feature, your history records (video title, author, URL, timestamp) are stored strictly within your browser&apos;s localStorage. This information is never transmitted to or synchronized with our backend servers.
              </p>

              <h4 className="text-sm font-bold text-slate-900 dark:text-white">4. Server Logs & Rate Limiting</h4>
              <p>
                Our backend logs anonymous network connection metrics (IP hash, request timestamps, and response codes) strictly for security monitoring, DDoS mitigation, and rate limiting. Logs are automatically rotated.
              </p>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 bg-slate-50 px-5 py-3 text-right dark:border-slate-800 dark:bg-slate-950">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-slate-200 px-4 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-300 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
