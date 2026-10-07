import React from 'react';
import { Shield, Cpu, Lock, CheckCircle } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <div className="rounded-3xl border border-slate-200 bg-slate-50/70 p-6 sm:p-10 lg:p-12 dark:border-slate-800 dark:bg-slate-900/60">
        <div className="max-w-3xl">
          <span className="text-xs font-semibold tracking-wider text-rose-500 uppercase dark:text-rose-400">
            About The Platform
          </span>
          <h2 className="mt-2 text-xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
            Built for Modern Web Standards
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300">
            QuickTok was developed to address common frustrations with traditional video download tools: excessive ads, deceptive download links, malware risks, and sluggish conversion servers.
          </p>
          <p className="mt-2 text-base leading-relaxed text-slate-600 dark:text-slate-300">
            Our platform utilizes a direct-streaming pipeline built on Node.js and TypeScript. We never store copies of your processed videos, and we enforce strict origin checks and SSRF boundaries to ensure safe, reliable media delivery.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex items-start gap-3">
              <CheckCircle className="mt-1 h-5 w-5 shrink-0 text-rose-500" />
              <div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Zero Permanent Storage</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Media is piped directly through memory streams and immediately flushed.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Shield className="mt-1 h-5 w-5 shrink-0 text-rose-500" />
              <div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Strict Legal Compliance</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Respects platform DRM, private content protections, and copyright restrictions.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Cpu className="mt-1 h-5 w-5 shrink-0 text-rose-500" />
              <div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">High-Throughput Node Core</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Engineered with HTTP keep-alive and backpressure-aware stream management.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Lock className="mt-1 h-5 w-5 shrink-0 text-rose-500" />
              <div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Local-Only History</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Your download log is saved in browser localStorage only, accessible only to you.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
